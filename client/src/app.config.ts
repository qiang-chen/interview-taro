/**
 * @description 
 * @author cq
 * @Date 2020-11-17 20:02:40
 * @LastEditTime 2020-12-09 16:29:57
 * @LastEditors cq
 */
export default {
  pages: [
    'pages/home/index',//首页
    'pages/mine/index', // 我的页面
    // 'pages/aboutUs/index', // 关于我们
    // 'pages/feedback/index', // 意见反馈
  ],
  "subPackages": [
    {
      "root": "childPages/",
      "pages": [
        'QuestionList/index',//题库列表
        'Forum/index',//论坛
        'QuestionInput/index',//题库录入
        'Contact/index',//个人联系方式页面
        'QuestionDetail/index',//题库详情页面
      ],
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  }
}
