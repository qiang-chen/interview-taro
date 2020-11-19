/**
 * @description 上传文件
 * @author cq
 * @Date 2019-12-17 20:20:03
 * @LastEditTime 2019-12-24 18:10:47
 * @LastEditors cq
 */

import Taro from '@tarojs/taro';
import apis from '@config/apis';
import globalApp from './globalApp';

export default function cusUploadFile(filePath) {
  return Taro.uploadFile({
    url: apis.uploadFile,
    header: {
      'content-type': 'multipart/form-data',
      'Authorization': globalApp.get('Authorization') // 上传需要单独处理cookie
    },
    filePath,
    name: 'files'
  })
    .then(res => {
      try {
        const data = JSON.parse(res.data)
        return data.data[0]
      } catch (error) {
        throw new Error('上传图片失败')
      }
    })
    .catch((e) => {
      console.error(e);
    })
}
