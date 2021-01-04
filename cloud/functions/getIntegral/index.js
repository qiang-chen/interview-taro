/**
 * @description 获取积分
 * @author cq
 * @Date 2021-01-04 15:40:55
 * @LastEditTime 2021-01-04 15:43:17
 * @LastEditors cq
 */

const cloud = require('wx-server-sdk');
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
});


exports.main = async (event, context) => {
  const { openid } = event;
  const db = cloud.database();
  let data = [];
  let code = 1;
  try {
    let result = await db.collection('users')
      .aggregate()
      .match({
        openid
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