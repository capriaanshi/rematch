// @flow
import { createModel } from './model'
import { getStore } from './redux/store'

export const modelHooks = []
export const pluginMiddlewares = []

export const preStore = (plugins) => {
  plugins.forEach((plugin) => {
    if (plugin.middleware) {
      pluginMiddlewares.push(plugin.middleware)
    }
    if (plugin.onModel) {
      modelHooks.push(plugin.onModel)
    }
  })
}

export const postStore = (plugins) => {
  plugins.forEach((plugin) => {
    if (plugin.onInit) {
      plugin.onInit(getStore)
    }
    if (plugin.models) {
      Object.keys(plugin.models).forEach(key => {
        createModel(plugin.models[key])
      })
    }
  })
}
