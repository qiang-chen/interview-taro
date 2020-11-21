/**
 * @description dva 方法
 * @author cq
 * @Date 2020-11-17 20:20:49
 * @LastEditTime 2020-11-20 15:27:41
 * @LastEditors cq
 */

/* tslint disabled */
import { create } from 'dva-core'
import createLoading from 'dva-loading';

export default function (options) {
  const app = create(options)

  // Plugins
  // app.use(createDvaImmer());
  app.use({
    ...createLoading({
      effects: true,
    }),
  });

  // HMR workaround
  if (!global.registered) options.models.forEach(model => app.model(model))
  global.registered = true
  app.start();

  // eslint-disable-next-line no-underscore-dangle
  const store = app._store

  store.subscribe(() => {
    // console.log(store.getState());
  })

  app.getStore = () => store
  app.getDispatch = () => store.dispatch

  global.__app = app;

  return app
}
