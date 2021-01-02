/**
 * @description 
 * @author cq
 * @Date 2020-12-30 14:42:02
 * @LastEditTime 2021-01-02 22:58:54
 * @LastEditors cq
 */

//  commentId 代表一级   不为空会等于上一条的_id
// 怎么 按照 h1 h2 h3的这种层级顺序渲染出来
const arr = [
  {
    commentId: "98bb04175fef248a00f405f81c80d217",
    createTime: "2021-01-01 13:33:55",
    questionId: "a8831daa5fec73020126af6b2940f269",
    text: "回复1-1的1-1-2",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "85ff8afa5fef24c401285c05361e3a60",
  },
  {
    commentId: "98bb04175fef248a00f405f81c80d217",
    createTime: "2021-01-01 13:33:35",
    questionId: "a8831daa5fec73020126af6b2940f269",
    text: "回复1-1的1-1-1",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "2424fa985fef24af0106b8f77f917199",
  },
  {
    commentId: "2f6ab8515fef247600ebabef520933ce",
    createTime: "2021-01-01 13:33:13",
    questionId: "a8831daa5fec73020126af6b2940f269",
    text: "回复第三条3-1",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "9f2a34705fef2499012c075e4669fe44",
  },
  {
    commentId: "2f6ab8515fef246400ebab0350bf130a",
    createTime: "2021-01-01 13:32:58",
    questionId: "a8831daa5fec73020126af6b2940f269",
    text: "回复第一条1-1",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "98bb04175fef248a00f405f81c80d217",
  },
  {
    commentId: "",
    createTime: "2021-01-01 13:32:38",
    questionId: "a8831daa5fec73020126af6b2940f269",
    text: "我是第三条",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "2f6ab8515fef247600ebabef520933ce",
  },
  {
    commentId: "",
    createTime: "2021-01-01 13:32:30",
    questionId: "a8831daa5fec73020126af6b2940f269",
    text: "我是第二条评论",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "98bb04175fef246e00f4046a439f441b",
  },
  {
    commentId: "",
    createTime: "2021-01-01 13:32:20",
    questionId: "a8831daa5fec73020126af6b2940f269",
    text: "我是第一条评论",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "2f6ab8515fef246400ebab0350bf130a",
  },
]

type newArrProps={
  item:any,
  children:any[]
}

function deep(array = [], commentId = "", newArr = [] as newArrProps[]) {
  let arr = array.filter((item:any) => item.commentId == commentId);
  for (let index = 0; index < arr.length; index++) {
    const element:any = arr[index];
    newArr.push({
      item: element,
      children: []
    }); //第一次把第一条评论放进来
    const downObj = array.find((item:any) => item.commentId == newArr[newArr.length - 1].item._id);
    if (downObj) {
      deep(array, element._id, newArr[index].children)
    } else {
      continue
    }
  }
  return newArr
}

export default deep

