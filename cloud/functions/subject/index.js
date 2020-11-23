/**
 * @description 题库列表的云服务
 * @author cq
 * @Date 2020-11-19 19:54:10
 * @LastEditTime 2020-11-23 20:16:33
 * @LastEditors cq
 */
const cloud = require('wx-server-sdk');
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
});

// 根据传入的id获取每条题库对应的用户信息
async function getUserInfo(id, db){
  let data = await db.collection('users').where({
    openid: id
  }).get();
  return data.data[0]
}

exports.main = async (event, context) => {
  const { keyword, page = 1, pageSize = 10 } = event;
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
      data = data.data;
      // 多表查询上每条记录的用户信息
      data.forEach(async (item)=>{
        item.userInfo = await getUserInfo(item.user_id, db)
      })

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
      data = data.data;
      // 多表查询上每条记录的用户信息
      data.forEach(async (item) => {
        item.userInfo = await getUserInfo(item.user_id, db)
      })
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