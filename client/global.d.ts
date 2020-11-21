/**
 * @description 
 * @author cq
 * @Date 2020-11-19 14:21:46
 * @LastEditTime 2020-11-20 15:28:53
 * @LastEditors cq
 */
declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd';
    [key: string]: any;
  }
}

declare namespace NodeJS {
  interface Global {
    document: Document
    window: Window
    navigator: Navigator
    registered: boolean
    __app: any
  }
}
