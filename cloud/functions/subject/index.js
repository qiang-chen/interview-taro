/**
 * @description 题库列表的云服务
 * @author cq
 * @Date 2020-11-19 19:54:10
 * @LastEditTime 2020-11-20 18:10:25
 * @LastEditors cq
 */
const cloud = require('wx-server-sdk');
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
})
exports.main = async (event, context) => {
  const { keyword, page = 1, pageSize = 3 } = event;
  const db = cloud.database();
  let data = [];
  let code = 1;
  if (keyword) {
    // console.log(keyword)
    // const reg = RegExp(keyword, 'i');
    try {

      data = await db.collection('subject').where({
        title: db.RegExp({
          regexp: keyword,
          options: 'i',
        })
      }).skip((page - 1) * pageSize) // 跳过结果集中的前 10 条，从第 11 条开始返回
        .limit(pageSize)
        .orderBy('createTime', 'desc')
        .get();
      data = data.data
    } catch (error) {
      code = 0;
    }
    // console.log(data)
  } else {
    try {
      data = await db.collection('subject')
        .skip((page - 1) * pageSize) // 跳过结果集中的前 10 条，从第 11 条开始返回
        .limit(pageSize)
        .orderBy('createTime', 'desc')
        .get();
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