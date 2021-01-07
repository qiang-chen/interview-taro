/**
 * @description 获取公告
 * @author cq
 * @Date 2021-01-07 20:19:43
 * @LastEditTime 2021-01-07 20:20:25
 * @LastEditors cq
 */


const cloud = require('wx-server-sdk');
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
});


exports.main = async (event, context) => {
  const db = cloud.database();
  let data = [];
  let code = 1;
  try {
    let result = await db.collection('text')
      .aggregate()
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