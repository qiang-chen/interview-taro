/**
 * @description 删除评论
 * @author cq
 * @Date 2021-01-04 16:54:38
 * @LastEditTime 2021-01-04 16:55:23
 * @LastEditors cq
 */


const cloud = require('wx-server-sdk');
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
});


exports.main = async (event, context) => {
  const { id } = event;
  const db = cloud.database();
  let data = [];
  let code = 1;
  try {
    data = await db.collection('comment').doc(id).remove()
  } catch (error) {
    console.error(error)
    data = error
    code = 0;
  }
  return {
    code,
    data
  }
}