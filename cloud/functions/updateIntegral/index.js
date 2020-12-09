/**
 * @description 更新积分
 * @author cq
 * @Date 2020-12-09 15:47:37
 * @LastEditTime 2020-12-09 15:59:25
 * @LastEditors cq
 */

// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”


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
  const wxContext = await cloud.getWXContext();
  const { integral } = event;
  console.log(integral)
  let data = null;
  let code = 1;
  // 云数据库操作
  try {
    // 查找当前人信息
    const result = await db.collection('users').where({
      openid: wxContext.OPENID
    }).get();

    db.collection('users').where({
      openid: wxContext.OPENID
    }).update({
      data: {
        integral: result.data[0].integral * 1 + integral
      }
    })
  } catch (e) {
    console.error(e)
    data=e;
    code = 0
  }
  return {
    code,
    data
  }
}

