// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBhUfLdKwxez78Cvujj0K9E9CfKkekz_Ic',
    authDomain: 'worksfit-uv-android.firebaseapp.com',
    databaseURL: 'https://worksfit-uv-android.firebaseio.com',
    projectId: 'worksfit-uv-android',
    storageBucket: 'worksfit-uv-android.appspot.com',
    messagingSenderId: '606882187887'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
