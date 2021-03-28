import Vue from 'vue'
import Vuex from 'vuex'

import wallet from './modules/wallet.module'
import account from './modules/account.module'
import idleHandler from './modules/idle-handler.module'
import assets from './modules/assets.module'
import kyc from './modules/kyc.module'
import businesses from './modules/businesses.module'
import identities from './modules/identities.module'

import { Wallet } from '@tokend/js-sdk'
import { useWallet } from '@/api'
import { sessionStoragePlugin } from '@/vuex/plugins/session-storage'
import _isEmpty from 'lodash/isEmpty'
import { vuexTypes } from '@/vuex/types'
import { errors } from '@/js/errors'
import { ErrorHandler } from '@/js/helpers/error-handler'

Vue.use(Vuex)

export const rootModule = {
  state: {},
  mutations: {
    [vuexTypes.CLEAR_WALLET_AND_ACCOUNT] (state) {
      state.account.account = {}
      state.wallet.wallet = {}
    },
    [vuexTypes.POP_STATE] () { },
    [vuexTypes.CLEAR_STATE] () { },
  },
  actions: {
    [vuexTypes.LOG_OUT] ({ commit }) {
      commit(vuexTypes.CLEAR_STATE)
    },
    async [vuexTypes.LOG_IN] ({ dispatch }, { email, password }) {
      await dispatch(vuexTypes.LOAD_WALLET, { email, password })
      await dispatch(vuexTypes.INIT_ACCOUNT)
    },
    async [vuexTypes.RESTORE_SESSION] ({ getters, dispatch }) {
      let walletSeed
      try {
        walletSeed = await dispatch(vuexTypes.DECRYPT_SECRET_SEED)
      } catch (e) {
        if (!(e instanceof errors.NotFoundError)) {
          ErrorHandler.processWithoutFeedback(e)
        }
        dispatch(vuexTypes.LOGOUT_SESSION)
      }

      const wallet = new Wallet(
        getters[vuexTypes.walletEmail],
        walletSeed,
        getters[vuexTypes.walletAccountId],
        getters[vuexTypes.walletId],
      )
      useWallet(wallet)
    },
  },
  getters: {
    [vuexTypes.isLoggedIn]: (_, getters) =>
      !_isEmpty(getters[vuexTypes.account]), // && !getters[vuexTypes.isAccountKycRecoveryInProgress],
  },
}

let store
function buildStore () {
  store = new Vuex.Store({
    ...rootModule,
    modules: {
      wallet,
      account,
      idleHandler,
      assets,
      kyc,
      businesses,
      identities,
    },
    plugins: [sessionStoragePlugin],
  })
  store.commit(vuexTypes.POP_STATE)
  return store
}
buildStore()

export { store, buildStore }
export { vuexTypes } from './types'
