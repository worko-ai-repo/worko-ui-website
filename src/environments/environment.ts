// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    cognito: {
      userPoolId: 'ap-south-1_tAj7HAKZh',
      userPoolWebClientId: '5evf019rrkaijtnjf2j1vvdf33',
    },
    // workoUIDomain=local4200
    localUrl:"http://localhost:4400",
    crossOriginUrl:'http://localhost:4200',
    apiUrl: 'https://api.dev.worko.work/',
    saveUserInfoApi:"https://w6zitv6ryk.execute-api.us-east-1.amazonaws.com/dev/adduserinfo",
    linkedInRedirection: 
    window.location.origin + "/auth/checkRedirection",
  //"http://localhost:4200/auth/checkRedirection",
    linkedInLogout: 
    window.location.origin+"/auth/logout"
    //"http://localhost:4200"
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
  