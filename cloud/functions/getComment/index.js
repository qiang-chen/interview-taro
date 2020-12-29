/**
 * @description 获取评论列表  暂时没用
 * @author cq
 * @Date 2020-12-22 17:49:24
 * @LastEditTime 2020-12-29 17:27:25
 * @LastEditors cq
 */

const cloud = require('wx-server-sdk');
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
});


exports.main = async (event, context) => {
  const { page = 1, pageSize = 100, questionId } = event;
  const wxContext = await cloud.getWXContext();
  const db = cloud.database();
  let data = [];
  let code = 1;
  try {
    let result = await db.collection('comment')
      .aggregate()
      .match({
        questionId
      })
      .lookup({
        from: "users",
        localField: "user_id",
        foreignField: "openid",
        as: "userInfo"
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({      //聚合阶段不能和orderBy连用   需要用sort进行排序使用
        createTime: -1
      })
      .end();

    data = result.list;
    // console.log(result.list.length)
    // let newData = []
    // for (let index = 0; index < result.list.length; index++) {
    //   const element = result.list[index];
    //   if (!element.commentId) {
    //     // 证明是第一级别的评论
    //     newData.push({
    //       content: element,
    //       children: []
    //     })
    //   }
    // }

    // console.log(result.list.length)

    // for (let index = 0; index < result.list.length; index++) {
    //   const element = result.list[index];
    //   if (!element.commentId) continue
    //   const flagIndex = newData.findIndex(item => item.content._id == element.commentId);
    //   if (flagIndex != -1) {
    //     newData[flagIndex].children.push(
    //       {
    //         content: element,
    //         children: []
    //       }
    //     )
    //   }
    // }

  } catch (error) {
    console.error(error)
    code = 0;
  }
  return {
    code,
    data
  }
}