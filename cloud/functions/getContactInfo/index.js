/**
 * @description 获取评论列表
 * @author cq
 * @Date 2020-12-22 17:49:24
 * @LastEditTime 2021-01-08 19:30:23
 * @LastEditors cq
 */

const cloud = require('wx-server-sdk');
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
});


exports.main = async (event, context) => {
  const { userId } = event;
  const db = cloud.database();
  let data = {};
  let code = 1;
  try {
    let result = await db.collection('contact_info')
      .aggregate()
      .match({
        user_id: userId
      })
      .end();

    data = result.list[0]||{};

  } catch (error) {
    console.error(error)
    code = 0;
  }
  return {
    code,
    data
  }
}