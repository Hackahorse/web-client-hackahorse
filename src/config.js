import packageJson from '../package.json'
import _isEmpty from 'lodash/isEmpty'
import { base } from '@tokend/js-sdk'

const config = {}

const env = _isEmpty(document.ENV)
  ? process.env
  : document.ENV

Object.keys(env).forEach(varName => {
  const value = normalize(env[varName])
  if (varName.startsWith('VUE_APP')) {
    const key = varName.replace('VUE_APP_', '')
    config[key] = value
  } else {
    config[varName] = value
  }
})

function normalize (value) {
  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  return value
}

export default Object.assign(
  {
    /**
     * App name
     */
    APP_NAME: 'Hackahorse',

    /**
     * URL of the Horizon server. The application is going to fetch all the
     * needed network configs from the provided value.
     */
    HORIZON_SERVER: '',

    /**
     * URL of the storage server. Here will be stored pics and other uploadable
     * files.
     */
    FILE_STORAGE: '',

    /**
     * Will skip the email confirmation step during sign up. Instead of the
     * sipped step, the user will be instantly logged in and redirected
     * to the application.
     */
    SKIP_EMAIL_CONFIRMATION_STEP: false,

    /**
     * Sets the logging level, for more options visit
     * https://www.npmjs.com/package/loglevel#documentation
     */
    LOG_LEVEL: 'trace',

    /**
     * Default lower acceptable amount by most input fields. Tends to be
     * dropped one day
     */
    MIN_AMOUNT: String(1 / 100),

    /**
     * Default higher acceptable amount by most input fields. Tends to be
     * dropped one day
     */
    MAX_AMOUNT: String(
      Math.floor(parseFloat(base.Operation.MAX_INT64_AMOUNT) * 100) / 100,
    ),

    // deprecated constants

    /**
     * Default limit of the number of transactions per a page
     */
    TRANSACTIONS_PER_PAGE: 12,

    /**
     * Default limit of the number of requests per a page
     */
    REQUESTS_PER_PAGE: 10,

    /**
     * Default amount precision, the number of digits
     * after a point
     */
    DECIMAL_POINTS: 2,

    /**
     * Maximum amount precision in system, the number of digits
     * after a point
     */
    MAX_SYSTEM_DECIMAL_POINTS: 6,

    /**
     * Default acceptable step for amount change,
     * depends on amount precision
     */
    MINIMAL_NUMBER_INPUT_STEP: 0.01,

    /**
     * Default asset signer for pre-issuance upload
     */
    NULL_ASSET_SIGNER: 'GAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHV4',

    /**
     * Should be populated by DevOps team during the deployment
     * The field being displayed on login screen.
     */
    BUILD_VERSION: packageJson.version,

    /**
     * User will be logged out after IDLE_TIMEOUT (minutes) time of
     * inactivity
     */
    IDLE_TIMEOUT: 15,

    /**
     * Module scheme to use. The module scheme will be used to combine module
     * set of the application.
     */
    MODULE_SCHEME_NAME: 'conto',

    /**
     * Data reload interval
     */
    RELOAD_DATA_TICKER_INTERVAL_MS: 10000,

    /**
     * Link to iOS application manifest file. If empty, links for iOS download
     * section will not be shown.
     */
    IOS_MANIFEST_LINK: 'itms-services://?action=download-manifest&url=https://s3-eu-west-1.amazonaws.com/ios-tokend-app/manifest.plist',

    /**
     * Link to android version of mobile client of the application. If empty,
     * links for Android download will not be shown.
     */
    PLAY_MARKET_LINK: 'https://play.google.com/store/apps/details?id=org.tokend.template',

    /**
     * URL of the Sentry DSN. It???s a representation of the configuration
     * required by the Sentry SDKs.
     */
    SENTRY_DSN: '',

    /**
     * Keep session interval
     */
    KEEP_SESSION_INTERVAL: 1000 * 60 * 2,

    /**
     * Sets timeout before reload on some screens. Depends on block close time
     * of your instance configuration, we recommend using value equal to
     * *block close time* + 500ms
     */
    RELOAD_TIMEOUT: 5500,

    /**
     * Session storage key
     */
    STORAGE_KEY: 'TokenDStore-v2',

    /**
     * Bucket url where located imgs
     */
    IMG_BUCKET_URL: 'https://conto-images.s3.eu-north-1.amazonaws.com',

    /**
     * Support email
     */
    SUPPORT_EMAIL: 'contact@distributedlab.com',

    /**
     * Support phone
     */
    SUPPORT_PHONE: '',

    /**
     * Support url
     */
    SUPPORT_URL: '',

    CORPORATE_BOKKIE: 'GCKPXLM2FJQOG44MMXQIJVOIJQDFHHQZMM2ODYZVVDPA5EXIA6NPFJUW',

    /**
     * Related Mobile application configuration. You can omit:
     * MOBILE_APP_NAME, MOBILE_APP_AUTHOR - The Smart App Banner won???t show
     * PLAY_MARKET_ID - Play Market prompt won???t show
     * APP_STORE_ID - App Store prompt won???t show
     */
    MOBILE_APP_NAME: 'Conto',
    MOBILE_APP_AUTHOR: 'Distributed Lab',
    PLAY_MARKET_ID: 'org.tokend.conto',
    PLAY_MARKET_ICON: 'https://lh3.googleusercontent.com/OgEkAMSJk3RpQd-IHRFh9TiKMjmnR-Q86tcMcylp-FL0385WQBn0uZ5LsFhFtHVttMI=s180-rw',
    APP_STORE_ID: '',
    APP_STORE_ICON: '',
  },
  // process.env,
  process.env
    ? config
    : process.env,
  document.ENV
    ? config
    : document.ENV,
)
