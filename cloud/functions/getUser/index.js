/**
 * @description 获取注册列表
 * @author cq
 * @Date 2021-01-05 15:03:05
 * @LastEditTime 2021-01-05 15:29:30
 * @LastEditors cq
 */


const cloud = require('wx-server-sdk');
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
});


exports.main = async (event, context) => {
  const db = cloud.database();
  const { page = 1, pageSize = 15 } = event;
  let data = [];
  let code = 1;
  try {
    let result = await db.collection('users')
      .aggregate()
      .sort({      //聚合阶段不能和orderBy连用   需要用sort进行排序使用
        createTime: 1
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .end();

    data = result.list;

  } catch (error) {
    console.error(error)
    code = 0;
  }
  return {
    code,
    data
  }
}