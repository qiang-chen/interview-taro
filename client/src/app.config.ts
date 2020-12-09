/**
 * @description 
 * @author cq
 * @Date 2020-11-17 20:02:40
 * @LastEditTime 2020-12-08 18:14:52
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
