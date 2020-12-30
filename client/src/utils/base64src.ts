/**
 * @description 
 * @author cq
 * @Date 2020-12-22 14:24:01
 * @LastEditTime 2020-12-30 15:11:09
 * @LastEditors cq
 */


declare const wx: any;

const fsm = wx.getFileSystemManager();

function generateUUID() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};
function base64src(base64data: any, cb?: (path: string) => void) {
  return new Promise((resolve, reject) => {
    const newBase64data = base64data.replace(/[\s*\t\n\r]/g, '');
    let datas = newBase64data;
    let formats = 'png'
    if (/data:image\/(\w+);base64,(.*)/.test(newBase64data)) {
      const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(newBase64data) || [];
      datas = bodyData;
      formats = format;
    }
    if (!formats) {
      return (new Error('ERROR_BASE64SRC_PARSE'));
    }
    const filePath = `${wx.env.USER_DATA_PATH}/${generateUUID()}.${formats}`;
    const buffer = wx.base64ToArrayBuffer(datas);
    fsm.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success() {
        cb && cb(filePath);
        resolve(filePath)
      },
      fail() {
        reject()
        return (new Error('ERROR_BASE64SRC_WRITE'));
      },
    });
  })

};

export default base64src;