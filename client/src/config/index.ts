/**
 * @description 
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2020-11-19 10:19:19
 * @LastEditors cq
 */

// const ENV = process.env.ENV;
const ossOrigin = 'https://img.sunlands.wang'; // 静态文件地址
const ossOriginAddSalt = `${ossOrigin}/addSalt/img`; // 加盐小程序-静态文件地址
let APPID = 'wxde0ff95399f86e89';

const defaultAvatarUrl = `${ossOriginAddSalt}/1.0/mine/touxiang.png`

if (process.env.NODE_ENV === 'development') {
  APPID = 'wxde0ff95399f86e89';
}

export default {
  // ENV,
  APPID,
  ossOrigin,
  ossOriginAddSalt,
  defaultAvatarUrl,
}
