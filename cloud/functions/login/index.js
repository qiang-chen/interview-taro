/**
 * @description 登陆相关操作
 * @author cq
 * @Date 2020-11-19 14:21:46
 * @LastEditTime 2021-01-05 16:33:03
 * @LastEditors cq
 */
// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”
// 永无bug！！！！！

const cloud = require('wx-server-sdk');

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
})

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
  const db = cloud.database();
  // 全局的工具类，在云函数中获取微信的调用上下文
  const wxContext =await cloud.getWXContext();
  console.log(event.userInfo)
  console.log(wxContext)
  let data = null;
  let code = 1;
  // 云数据库操作
  try {
    // 实际注册功能时，应先检测该用户是否已经注册
    // 每个人授权后openid是服务端唯一的凭证
    const result = await db.collection('users').where({
      openid: wxContext.OPENID
    }).get();
    console.log(result.data,22222)
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
    if (result.data.length) {
      // 此用户已经注册过了
      db.collection('users').where({
        openid: wxContext.OPENID
      }).update({
        data: {
          userInfo: event.userInfo,
        }
      })
      return {
        openid: wxContext.OPENID,
        code,
        data
      }
    } else {
      data = await db.collection('users').add({
        data: {
          created: time(new Date()),
          userInfo: event.userInfo,
          openid: wxContext.OPENID,
          integral:0
        }
      })
    }
  } catch (e) {
    console.error(e)
    code = 0
  }
  return {
    openid: wxContext.OPENID,
    code,
    data
  }
}

