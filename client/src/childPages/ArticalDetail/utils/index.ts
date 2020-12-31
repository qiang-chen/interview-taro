/**
 * @description 
 * @author cq
 * @Date 2020-12-30 14:42:02
 * @LastEditTime 2020-12-31 15:17:32
 * @LastEditors oyqx
 */

//  commentId 代表一级   不为空会等于上一条的_id
// 怎么 按照 h1 h2 h3的这种层级顺序渲染出来
const arr = [
  {
    commentId: "85ff8afa5fe1brrsf680067ed337c56a133",
    createTime: "2020-12-22 09:42:00",
    questionId: "b1a52c595fbcc9ec005f6c8941bb6c43",
    text: "2-1-1",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "85ff8afaddac5fe1brrsf680067ed337c56a133",
  },
  {
    commentId: "",
    createTime: "2020-12-22 09:31:43",
    questionId: "b1a52c595fbcc9ec005f6c8941bb6c43",
    text: "第一条评论内容",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "2f6ab8515fe1bcff0052329b58feffb0",
  },
  {
    commentId: "a8831daa5fe1bf170078aead0b32957c",
    createTime: "2020-12-22 09:40:39",
    questionId: "b1a52c595fbcc9ec005f6c8941bb6c43",
    text: "1-2-1-1的子评论",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "a8831daa5fe1bf170078aead0b32957c23",
  },
  {
    commentId: "",
    createTime: "2020-12-25 03:06:30",
    questionId: "b1a52c595fbcc9ec005f6c8941bb6c43",
    text: "哈哈哈 ",
    user_id: "o2ml-5V1_FtRRDA6JD74FVTwc6MM",
    _id: "85ff8afa5fe557360095cdc659506bd0",
  },
  {
    commentId: "2f6ab8515fe1bcff0052329b58feffb0",
    createTime: "2020-12-22 09:39:41",
    questionId: "b1a52c595fbcc9ec005f6c8941bb6c43",
    text: "1-2的子评论",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "a8831daa5fe1bedd0078aa0416c85686",
  },
  {
    commentId: "a8831daa5fe1bedd0078aa0416c85686",
    createTime: "2020-12-22 09:40:39",
    questionId: "b1a52c595fbcc9ec005f6c8941bb6c43",
    text: "1-2-1的子评论",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "a8831daa5fe1bf170078aead0b32957c",
  },
  {
    commentId: "2f6ab8515fe1bcff0052329b58feffb0",
    createTime: "2020-12-22 09:41:25",
    questionId: "b1a52c595fbcc9ec005f6c8941bb6c43",
    text: "1-1的子评论",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "2424fa985fe1bf45005be4994a2d92bc",
  },
  {
    commentId: "",
    createTime: "2020-12-22 09:42:00",
    questionId: "b1a52c595fbcc9ec005f6c8941bb6c43",
    text: "第二条评论",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "85ff8afa5fe1bf680067ed337c56a133",
  },
  {
    commentId: "85ff8afa5fe1bf680067ed337c56a133",
    createTime: "2020-12-22 09:42:00",
    questionId: "b1a52c595fbcc9ec005f6c8941bb6c43",
    text: "2-1",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "85ff8afa5fe1brrsf680067ed337c56a133",
  },
  {
    commentId: "",
    createTime: "2020-12-22 10:26:26",
    questionId: "b1a52c595fbcc9ec005f6c8941bb6c43",
    text: "第三条",
    user_id: "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4",
    _id: "2424fa985fe1c9d2005c99ca53cbec72",
  }
]


function deep(array = [], commentId = "", newArr = []) {
  let arr = array.filter((item: any) => item.commentId == commentId);
  for (let index = 0; index < arr.length; index++) {
    const element: any = arr[index];
    newArr.push(element as never)
    if (array.some((el: any) => el.commentId == element._id)) {
      deep(array, element._id, newArr)
    } else {
      newArr.push({ isEnd: true } as never)
      continue
    }
  }
  return newArr
}

export default deep

