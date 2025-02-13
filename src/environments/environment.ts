// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://gap-api.apps.non-core-dev.sterlingbank.com/api/GAPSentinel',
  XApiKey: '2D6gqApezbU2aqJB',
  // baseUrl: 'https://sandboxapi-pilot.appsuport.p.azurewebsites.net/gateway/sandbox/api/',
  baseUrl: 'https://uat-gateway.sterling.ng/api/UserProfile',
  applicationBaseUrl: 'https://uat-gateway.sterling.ng/api/Application',
  static_IV_KEY: 'BE/s3V0HtpPsE+1x',
  static_app_Key: 'zAL7X5AVRm8l4Ifs',
  // APP_IV_KEY: 'tmUw2XuaoLcBK3PqMQnz+w==',
  // APP_Key: 'o5D7G4iHirNb8GGCu04pQw==',
  // verifyTokenBaseUrl: 'https://onetokenapi-newdev.az-sterlingapp-tcoe-dev.p.azurewebsites.net',
  verifyTokenBaseUrl: 'https://onetoken-api.sterling.ng',
  Api_Key: 'zAL7X5AVRm8l4Ifs',
  Api_IV: 'BE/s3V0HtpPsE+1x',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
