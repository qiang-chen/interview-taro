/**
 * @description 请求个人openid
 * @author cq
 * @Date 2020-12-31 18:27:24
 * @LastEditTime 2020-12-31 18:28:56
 * @LastEditors cq
 */

const cloud = require('wx-server-sdk');
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
});


exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let data = null;
  let code = 1;
  try {
    data = wxContext.OPENID
  } catch (error) {
    console.error(error)
    code = 0;
  }
  return {
    code,
    data
  }
}