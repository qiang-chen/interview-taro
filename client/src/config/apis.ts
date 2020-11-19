/**
 * @description 
 * @author ronffy
 * @Date 2019-12-01 14:16:31
 * @LastEditTime 2019-12-31 18:33:43
 * @LastEditors cq
 */

let apiPrefix = 'https://testsaltpractice.sunlands.wang';
let mockApiPrefix = apiPrefix;

if (process.env.NODE_ENV === 'development') {
  apiPrefix = 'https://testsaltpractice.sunlands.wang';
  mockApiPrefix = 'http://0.0.0.0:8888/api/proxy';
}

export default {
  apiPrefix,
  mockApiPrefix,
  login: `${apiPrefix}/saltpractice-api/login/code`,
  upUserInfo: `${apiPrefix}/saltpractice-api/users`,
  userInfo: `${apiPrefix}/saltpractice-api/users/self`,
  feedback: `${apiPrefix}/saltpractice-api/users/feedback`,
  home: {
    num: `${apiPrefix}/api/home/num`,
    accountList: `${apiPrefix}/saltpractice-api/account-set/list`,//帐套列表
    accountIsUse: `${apiPrefix}/saltpractice-api/account-set/in-use`,//切换帐套
    accountDelete: `${apiPrefix}/saltpractice-api/account-set/in-use`,//删除帐套
  },
  //帐套相关接口
  createAccount: {
    createAccount: `${apiPrefix}/saltpractice-api/account-set`,//创建帐套
  },
  //凭证相关接口
  voucherEntry: {
    createVoucher: `${apiPrefix}/saltpractice-api/voucher/create`,//创建凭证
    deleteVoucher: `${apiPrefix}/saltpractice-api/voucher/delete`,//删除凭证
    voucherNum: `${apiPrefix}/saltpractice-api/voucher/number`,//获取凭证号
    voucherUpload: `${apiPrefix}/saltpractice-api/upload/image`,//上传凭证
    summaryList: `${apiPrefix}/saltpractice-api/summary/list`, //获取摘要
    updateVoucher: `${apiPrefix}/saltpractice-api/voucher/update`,//更新凭证
    voucherEntryTime: `${apiPrefix}/saltpractice-api/voucher/stage`,//凭证日期
  },
  voucherDetails: {
    voucherImg: `${apiPrefix}/saltpractice-api/voucher/images`
  },
  subjectBalance: { //科目余额表
    subjectDetail: `${apiPrefix}/saltpractice-api/subject-balance/subject`,
    subjectList: `${apiPrefix}/saltpractice-api/subject-balance/detail`,
    downSubjectBalance: `${apiPrefix}/saltpractice-api/subject-balance/images`,
  },
  assetsLiabilit: {  //资产负债表
    assetsLiabilitDetail: `${apiPrefix}/saltpractice-api/assets-liabilit/detail`,
    downAssetsLiabilitDetail: `${apiPrefix}/saltpractice-api/assets-liabilit/images`,
  },
  profitLossRF: { //损益表
    voucherDetail: `${apiPrefix}/saltpractice-api/voucher`,//凭证详情
    profitRf: `${apiPrefix}/saltpractice-api/profit-rf`,  //获取利润表数据
    downProfitRf: `${apiPrefix}/saltpractice-api/profit-rf/images` //保存损益表页面图片
  },
  voucherLook: {
    voucherTime: `${apiPrefix}/saltpractice-api/voucher/stage/list`,
    voucherList: `${apiPrefix}/saltpractice-api/voucher/page/list`,//凭证列表
    voucherListPage: `${apiPrefix}/saltpractice-api/voucher/page/list`,
    voucherDelete: `${apiPrefix}/saltpractice-api/voucher/delete`,//删除凭证
    voucherDetail: `${apiPrefix}/saltpractice-api/voucher`,//凭证详情
  },
  finalTransaction: { //期末结转
    settleAccount: `${apiPrefix}/saltpractice-api/voucher/update/settle-account`, //结转/反结账
    stageList: `${apiPrefix}/saltpractice-api/profit-rf/stage`, //期末结转列表
    examine: `${apiPrefix}/saltpractice-api/profit-rf/examine`,//一键审核
    check: `${apiPrefix}/saltpractice-api/voucher/check` //是否需要结账损益
  },
  //科目相关数据筛选
  selectSubject: {
    selectSubjectList: `${apiPrefix}/saltpractice-api/subject/all`,
    searchSubjectList: `${apiPrefix}/saltpractice-api/subject/search`
  },
  uploadFile: `${apiPrefix}/saltpractice-api/upload/image`
}