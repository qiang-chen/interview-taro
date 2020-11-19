/**
 * @description 
 * @author cq
 * @Date 2020-11-19 14:21:46
 * @LastEditTime 2020-11-19 15:19:43
 * @LastEditors cq
 */
const path = require('path')
const config = {
  projectName: 'interview',
  date: '2020-11-19',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src/',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    esnextModules: ['taro-ui'],
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/ts-types': path.resolve(__dirname, '..', 'src/ts-types'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/config': path.resolve(__dirname, '..', 'src/config'),
    '@/services': path.resolve(__dirname, '..', 'src/services'),
    '@/containers': path.resolve(__dirname, '..', 'src/containers'),
    '@/hooks': path.resolve(__dirname, '..', 'src/hooks')
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
