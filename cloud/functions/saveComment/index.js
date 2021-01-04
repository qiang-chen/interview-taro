/**
 * @description 保存评论接口
 * @author cq
 * @Date 2020-12-22 17:14:50
 * @LastEditTime 2021-01-04 14:57:48
 * @LastEditors cq
 */


// const time = require("./utils/time");
const cloud = require('wx-server-sdk');
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
});


exports.main = async (event, context) => {
  
  function time(date) {
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    let h = date.getHours()
    h = h < 10 ? '0' + h : h
    let minute = date.getMinutes()
    minute = minute < 10 ? '0' + minute : minute
    let second = date.getSeconds()
    second = second < 10 ? '0' + second : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  }
  const { text, questionId, commentId, userInfo} = event;
  const db = cloud.database();
  // 全局的工具类，在云函数中获取微信的调用上下文
  const wxContext = cloud.getWXContext();
  console.log(wxContext)
  let data = null;
  let code = 1;
  console.log(time(new Date()),"时间")
  try {
    data = await db.collection('comment').add({
      data: {
        createTime: time(new Date()),
        text,
        userInfo,
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