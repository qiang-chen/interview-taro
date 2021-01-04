/**
 * @description 试题详情页面接口
 * @author cq
 * @Date 2020-12-22 15:15:22
 * @LastEditTime 2021-01-04 14:40:37
 * @LastEditors cq
 */



const cloud = require('wx-server-sdk');

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
})


exports.main = async (event, context) => {
  const db = cloud.database();
  const wxContext = await cloud.getWXContext();
  const $ = db.command.aggregate;
  // 全局的工具类，在云函数中获取微信的调用上下文
  const { id } = event;
  let data = null;
  let code = 1;
  // 云数据库操作
  try {
    let result = await db.collection('subject')
      .aggregate()
      .match({
        _id: id
      })
      .lookup({   
        from: "users",
        localField: "user_id",
        foreignField: "openid",
        as: "userInfo"
      })
      .lookup({
        from: "thumbs",
        localField: "_id",
        foreignField: "questionId",
        as: "thumbs"
      })
      .lookup({
        from: "comment",
        localField: "_id",
        foreignField: "questionId",
        as: "comment"
      })
      .addFields({
        isDisable: $.in([wxContext.OPENID, '$thumbs.openid'])
      })
      .end();
    data = result.list[0]
  } catch (e) {
    console.error(e)
    data = e;
    code = 0;
  }
  return {
    code,
    data
  }
}