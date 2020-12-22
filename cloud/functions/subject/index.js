/**
 * @description 题库列表的云服务
 * @author cq
 * @Date 2020-11-19 19:54:10
 * @LastEditTime 2020-12-22 17:57:43
 * @LastEditors cq
 */
const cloud = require('wx-server-sdk');
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "yulin-9g6l3xz5b5e76bdd"
});

// 根据传入的id获取每条题库对应的用户信息
function getUserInfo(id, db) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.collection('users').where({
        openid: id
      }).get();
      resolve(data.data[0])
    } catch (error) {
      reject([])
    }
  })
}

// 根据传入的id获取每条题库对应的点赞信息
function getThumbs(id, db) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.collection('thumbs').where({
        questionId: id
      }).get();
      resolve(data.data)
    } catch (error) {
      reject([])
    }

  })
}

exports.main = async (event, context) => {
  const { keyword, page = 1, pageSize = 10 } = event;
  const wxContext = await cloud.getWXContext();
  const db = cloud.database();
  const $ = db.command.aggregate;
  let data = [];
  let code = 1;
  if (keyword) {
    // console.log(keyword)
    // const reg = RegExp(keyword, 'i');
    try {
      data = await db.collection('subject')
        .aggregate()
        .match({
          title: db.RegExp({
            regexp: keyword,
            options: 'i',
          })
        })
        .lookup({
          from: "thumbs",
          localField: "_id",
          foreignField: "questionId",
          as: "thumbs"
        })
        .lookup({
          from: "users",
          localField: "user_id",
          foreignField: "openid",
          as: "userInfo"
        })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({      //聚合阶段不能和orderBy连用   需要用sort进行排序使用
          createTime: -1
        })
        .addFields({
          isDisable: $.in([wxContext.OPENID, '$thumbs.openid'])
        })
        .end()
        // .where({
        //   title: db.RegExp({
        //     regexp: keyword,
        //     options: 'i',
        //   })
        // })
        // .skip((page - 1) * pageSize) // 跳过结果集中的前 10 条，从第 11 条开始返回
        // .limit(pageSize)
        // .orderBy('createTime', 'desc')
        // .get()
      data = data.list;
      // 整个forEach形成的async作用域并不会让下方return进行变化  为什么data会改变呢  因为对象的底层被改变了
      // 多表查询上每条记录的用户信息和点赞信息
      // data.forEach(async (item) => {
      //   item.userInfo = await getUserInfo(item.user_id, db)
      //   item.thumbs = await getThumbs(item._id, db);
      //   item.isDisable = item.thumbs.some(item => item.openid == wxContext.OPENID);
      // })

      // for (let index = 0; index < data.length; index++) {
      //   const element = data[index];
      //   element.userInfo = await getUserInfo(element.user_id, db)
      //   element.thumbs = await getThumbs(element._id, db)
      //   element.isDisable = element.thumbs.some(item => item.openid == wxContext.OPENID);
      // }

    } catch (error) {
      console.error(error);
      code = 0;
    }
  } else {
    try {
      data = await db.collection('subject')
        .aggregate()
        .lookup({
          from: "users",
          localField: "user_id",
          foreignField: "openid",
          as: "userInfo"
        })
        .lookup({
          from: "thumbs",
          localField: "_id",
          foreignField: "questionId",
          as: "thumbs"
        })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({      //聚合阶段不能和orderBy连用   需要用sort进行排序使用
          createTime: -1
        })
        .addFields({
          isDisable: $.in([wxContext.OPENID, '$thumbs.openid'])
        })
        .end()
      data = data.list;
      // 多表查询上每条记录的用户信息
      // for (let index = 0; index < data.length; index++) {
      //   const element = data[index];
      //   element.userInfo = await getUserInfo(element.user_id, db)
      //   element.thumbs = await getThumbs(element._id, db)
      //   element.isDisable = element.thumbs.some(item => item.openid == wxContext.OPENID);
      // }
    } catch (error) {
      console.error(error)
      code = 0;
    }
    // 查询所有题目题目
  }
  return {
    code,
    data,
  }
}