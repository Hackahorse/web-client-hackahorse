import IdentityGetterMixin from '@/vue/mixins/identity-getter'
import { api } from '@/api'

import { vuexTypes } from '@/vuex'
import { mapGetters } from 'vuex'
import { MARKETPLACE_OFFER_REQUEST_TYPES } from '@/js/const/marketplacec-offer.const'
import { MarketplaceOfferBidRecord } from '@/js/records/entities/marketplace-offer-bid.record'

export default {
  mixins: [IdentityGetterMixin],
  computed: {
    ...mapGetters({
      accountId: vuexTypes.accountId,
      isLoggedIn: vuexTypes.isLoggedIn,
    }),
  },

  methods: {
    // eslint-disable-next-line max-len
    async createAtomicSwapBidOperation (amount, paymentMethodId, atomicSwapAskId, promoCode, email) {
      let accountId = this.accountId

      if (email) {
        const senderAccountId = await this.getAccountIdByIdentifier(email)
        if (senderAccountId) {
          accountId = senderAccountId
        } else {
          accountId = await this.createAccountAndGetAccountIdByEmail(email)
        }
      }

      const atomicSwapBidOperation = this.buildCreateAtomicSwapBidOperation(
        amount,
        paymentMethodId,
        atomicSwapAskId,
        promoCode,
        accountId,
      )
      const { data } = await api.post(
        '/integrations/marketplace/buy',
        atomicSwapBidOperation,
      )
      return new MarketplaceOfferBidRecord(data)
    },

    // eslint-disable-next-line max-len
    buildCreateAtomicSwapBidOperation (amount, paymentMethodId, atomicSwapAskId, promoCode, accountId) {
      return {
        data: {
          type: MARKETPLACE_OFFER_REQUEST_TYPES.createBuyRequest,
          attributes: {
            amount: amount,
            offer_id: Number(atomicSwapAskId),
            payment_method_id: Number(paymentMethodId),
            sender_account_id: accountId,
            ...(promoCode
              ? { promocode: promoCode }
              : {}
            ),
          },
        },
      }
    },
  },
}
