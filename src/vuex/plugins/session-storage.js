import { vuexTypes } from '@/vuex/types'
import config from '@/config'

export const sessionStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case vuexTypes.CLEAR_STATE: {
        localStorage.removeItem(config.STORAGE_KEY)
        store.replaceState({})
        break
      }
      case vuexTypes.POP_STATE: {
        let savedStore = localStorage.getItem(config.STORAGE_KEY)

        if (!savedStore) {
          break
        }

        savedStore = JSON.parse(savedStore)

        store.replaceState({
          ...state,
          account: savedStore.account,
          wallet: savedStore.wallet,
          kyc: savedStore.kyc,
          keyValue: savedStore.keyValue,
          idleHandler: savedStore.idleHandler,
        })

        break
      }
      case vuexTypes.SET_ACCOUNT:
      case vuexTypes.SET_WALLET: {
        setLocalStorage(state)
        break
      }
      default:
        setLocalStorage(state)
    }
  })
}

function setLocalStorage (state) {
  localStorage.setItem(config.STORAGE_KEY, JSON.stringify({
    account: state.account,
    wallet: state.wallet,
    kyc: state.kyc,
    keyValue: state.keyValue,
    idleHandler: state.idleHandler,
  }))
}
