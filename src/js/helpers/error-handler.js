import { errors } from '@/js/errors'
import { Bus } from '@/js/helpers/event-bus'
import * as log from 'loglevel'
import { i18n } from '@/i18n'
import _get from 'lodash/get'
import { ErrorTracker } from '@/js/helpers/error-tracker'

export class ErrorHandler {
  static process (error, translationId = '', errorTrackerConfig = {}) {
    const msgTrId = translationId || ErrorHandler._getTranslationId(error)
    Bus.error(msgTrId)

    errorTrackerConfig.translationId = msgTrId
    ErrorHandler.processWithoutFeedback(error, errorTrackerConfig)
  }

  static processWithoutFeedback (error, errorTrackerConfig = {}) {
    ErrorHandler.trackMessage(error, errorTrackerConfig)
    log.error(error)
  }

  static trackMessage (error, opts = {}) {
    const { translationId = '', skipTrack = false } = opts

    if (!skipTrack) {
      const msgTrId = translationId || ErrorHandler._getTranslationId(error)

      const englify = i18n.getFixedT('en')
      ErrorTracker.trackMessage(englify(msgTrId))
    }
  }

  static _getTranslationId (error) {
    let translationId

    switch (error.constructor) {
      case errors.NetworkError:
        translationId = 'errors.network'
        break
      case errors.UserDoesntExistError:
        translationId = 'errors.user-doesnt-exist'
        break
      case errors.BalanceNotFoundError:
        translationId = 'errors.balance-not-found'
        break
      case errors.TimeoutError:
        translationId = 'errors.timeout'
        break
      case errors.InternalServerError:
        translationId = 'errors.internal'
        break
      case errors.BadRequestError:
        translationId = 'errors.bad-request'
        break
      case errors.NotAllowedError:
        translationId = 'errors.not-allowed'
        break
      case errors.ForbiddenRequestError:
        translationId = 'errors.forbidden'
        break
      case errors.TFARequiredError:
        translationId = 'errors.tfa-required'
        break
      case errors.VerificationRequiredError:
        translationId = 'errors.verification-required'
        break
      case errors.NotFoundError:
        translationId = 'errors.not-found'
        break
      case errors.ConflictError:
        translationId = 'errors.conflict'
        break
      case errors.UnauthorizedError:
        translationId = 'errors.unauthorized'
        break
      case errors.UserExistsError:
        translationId = 'errors.user-exists'
        break
      case errors.TransactionError:
        // eslint-disable-next-line no-case-declarations
        let errorCode
        // eslint-disable-next-line no-case-declarations
        const errorResults = error.errorResults
        if (!errorResults) {
          const operations = _get(error, '_resultCodes.operations', [])
          errorCode = operations.find(i => i !== 'op_success') || ''
        } else {
          errorCode =
            (errorResults.find(i => i.errorCode !== 'op_success') || {})
              .errorCode
        }
        translationId = `transaction-errors.${errorCode}`
        if (!i18n.exists(translationId)) {
          // If there is no localized error code, display the message
          // that came from the backend
          translationId = error.errorResults[0].message
        }
        break
      case errors.StorageServerError:
        translationId = 'errors.file-upload'
        break
      default:
        translationId = 'errors.default'
    }

    return translationId
  }
}
