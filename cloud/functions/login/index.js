/**
 * @description 
 * @author cq
 * @Date 2020-11-19 14:21:46
 * @LastEditTime 2020-11-19 20:00:25
 * @LastEditors cq
 */
// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”
// 永无bug！！！！！

const cloud = require('wx-server-sdk')

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
  // console.log(event,11)
  // console.log(context,22)
  const db = cloud.database();
  // 查询题目
  const subjectCollection = await db.collection('subject').get()
  // console.log(subjectCollection.data,33)
  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
  const wxContext = cloud.getWXContext()

  return {
    code:1,
    data: subjectCollection.data
  }
}

