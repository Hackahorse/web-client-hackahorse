import _get from 'lodash/get'
import { store, vuexTypes } from '@/vuex/index'

export class MarketplaceOfferAskRecord {
  constructor (record) {
    this._record = record

    this.id = record.id
    this.ownerId = _get(record, 'owner')
    this.amount = _get(record, 'baseAmount')
    this.baseAssetCode = _get(record, 'baseAsset')
    this.isCanceled = _get(record, 'isCanceled')
    // eslint-disable-next-line max-len
    this.baseAssetName = store.getters[vuexTypes.assetByCode](this.baseAssetCode)
      .name
    this.price = _get(record, 'price')
    this.priceAsset = _get(record, 'priceAsset')
    this.quoteAssets = _get(record, 'paymentMethods', [])
      .map(item => ({
        asset: store.getters[vuexTypes.assetByCode](item.asset),
        paymentMethodId: item.id,
        paymentMethodType: String(item.type.value),
        destination: _get(item, 'destination') || '',
      }))
  }

  getPaymentMethodIdByAssetCode (assetCode) {
    const quoteAsset = this.quoteAssets.find(quoteAsset => {
      return quoteAsset.asset.code === assetCode
    })
    return quoteAsset.paymentMethodId
  }

  getAssetCodeByPaymentMethodId (id) {
    const quoteAsset = this.quoteAssets.find(quoteAsset => {
      return quoteAsset.paymentMethodId === id
    })
    return quoteAsset.asset.code
  }

  get isAmountMoreThanZero () {
    return +this.amount > 0
  }
}
