import '@/scss/app.scss'

import Vue from 'vue'
import App from '@/vue/App.vue'
import router from '@/vue-router'
import { buildStore } from '@/vuex'
import moment from 'moment'

import { initApi } from './api'
import { keyValues } from '@/key-values'
import { i18n } from '@/i18n'
import { globalize } from './vue/filters/globalize'

async function init () {
  await initApi()
  await keyValues.load()

  i18n.onLanguageChanged(lang => {
    moment.locale(lang)
  })
  await i18n.init()

  Vue.filter('globalize', globalize)

  Vue.config.productionTip = false

  const store = buildStore()

  new Vue({
    store,
    router,
    render: h => h(App),
  }).$mount('#app')
}

init()
