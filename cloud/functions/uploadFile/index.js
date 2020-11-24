/**
 * @description 
 * @author cq
 * @Date 2020-11-23 20:14:20
 * @LastEditTime 2020-11-23 20:26:07
 * @LastEditors cq
 */
// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
});


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = await cloud.getWXContext();
  let data = null;
  let code = 1;
  try {
    data = await cloud.uploadFile({
      fileContent: new Buffer(event.fileContent, 'base64'),
      cloudPath: "answer_img/" + new Date().getTime() + "" + wxContext.APPID
    })
  } catch (e) {
    data = e;
    code = 0
  }
  return {
    code,
    data
  }
}
