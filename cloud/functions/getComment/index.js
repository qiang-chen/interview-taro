/**
 * @description 获取评论列表
 * @author cq
 * @Date 2020-12-22 17:49:24
 * @LastEditTime 2020-12-30 17:54:29
 * @LastEditors cq
 */

const cloud = require('wx-server-sdk');
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
});


exports.main = async (event, context) => {
  const { questionId } = event;
  const db = cloud.database();
  let data = [];
  let code = 1;
  try {
    let result = await db.collection('comment')
      .aggregate()
      .match({
        questionId
      })
      .sort({      //聚合阶段不能和orderBy连用   需要用sort进行排序使用
        createTime: 1
      })
      .end();

    data = result.list;

  } catch (error) {
    console.error(error)
    code = 0;
  }
  return {
    code,
    data
  }
}