/**
 * @description 保存个人联系方式
 * @author cq
 * @Date 2020-12-31 16:23:18
 * @LastEditTime 2020-12-31 16:39:32
 * @LastEditors cq
 */

const cloud = require('wx-server-sdk');
const time = require("./utils/time");

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
});


exports.main = async (event, context) => {
  const { phone, userInfo } = event;
  const db = cloud.database();
  const wxContext = cloud.getWXContext();
  let data = null;
  let code = 1;
  try {
    await db.collection('contact_info')
      .add({
        data: {
          createTime: time(new Date()),
          phone,
          userInfo,
          user_id: wxContext.OPENID,
          isReal:true,  //手机号是否为真的判断
        }
      })
  } catch (error) {
    console.error(error)
    data = error;
    code = 0
  }

  return {
    code,
    data
  }
}