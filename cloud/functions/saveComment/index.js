/**
 * @description 保存评论接口
 * @author cq
 * @Date 2020-12-22 17:14:50
 * @LastEditTime 2020-12-22 17:35:18
 * @LastEditors cq
 */


const time = require("./utils/time");
const cloud = require('wx-server-sdk');
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
});


exports.main = async (event, context) => {
  const { text, questionId, commentId } = event;
  const db = cloud.database();
  // 全局的工具类，在云函数中获取微信的调用上下文
  const wxContext = cloud.getWXContext();
  console.log(wxContext)
  let data = null;
  let code = 1;
  
  try {
    data = await db.collection('comment').add({
      data: {
        createTime: time(new Date()),
        text,
        user_id: wxContext.OPENID,
        questionId,
        commentId
      }
    })
  } catch (error) {
    data = error;
    code = 0
  }

  return {
    code,
    data,
  }
}