/**
 * @description 题库列表的云服务
 * @author cq
 * @Date 2020-11-19 19:54:10
 * @LastEditTime 2020-11-19 20:10:08
 * @LastEditors cq
 */
const cloud = require('wx-server-sdk');
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
})
exports.main = async (event, context) => {
  const { keyword } = event;
  const db = cloud.database();
  let data = [];
  let code = 1;
  if (keyword) {
    console.log(keyword)
  } else {
    try {
      data = await (db.collection('subject').get());
      data = data.data
    } catch (error) {
      code = 0;
    }
    // 查询所有题目题目
  }

  return {
    code,
    data,
  }
}