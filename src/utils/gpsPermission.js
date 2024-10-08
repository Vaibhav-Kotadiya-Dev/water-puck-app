import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

const askGPSPermission = async () => {
  //prompt to enable gps
  try {
    await promptForEnableLocationIfNeeded();
    /*
    Here now the user has accepted to enable the location services
    data can be :
     - "already-enabled" if the location services has been already enabled
     - "enabled" if user has clicked on OK button in the popup
    */
    return {
      enabled: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      /*
      The user has not accepted to enable the location services
      OR something went wrong during the process
      "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
      codes :
       - ERR00 : The user has clicked on Cancel button in the popup
       - ERR01 : If the Settings change are unavailable
       - ERR02 : If the popup has failed to open
       - ERR03 : Internal error
      */
      return {
        enabled: false,
        code: error.message,
      };
    }
  }
};

const handleGPSPermission = async () => {
  //ask for GPS permission
  if (Platform.OS === 'android') {
    const result = await askGPSPermission();
    if (result?.enabled) {
      //GPS enabled successfully, display next permission
    } else {
      //GPS couldn't be enabled. Show GPS modal warning
      if (result?.code === 'ERR00') {
        //The user has clicked on Cancel button in the popup
        //show the pemission denied popup or ask them to manually enable the gps
        return;
      } else {
        //something went wrong, prompt user to manually enable the GPS from his side from settings as our attempt failed
      }
    }
  }
};

const handleLocationPermission = async () => {
  let isPermitted = false;
  if (Platform.OS === 'ios') {
    //ask for location permissions for IOS
    const locationResult = await Promise.all([
      request(PERMISSIONS.IOS.LOCATION_ALWAYS),
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE),
    ]);
    let resultAlways = locationResult[0];
    let resultWhenInUse = locationResult.length > 1 ? locationResult[1] : null;
    const isResultAlwaysDenied = () => {
      if (
        resultAlways === RESULTS.BLOCKED ||
        resultAlways === RESULTS.UNAVAILABLE ||
        resultAlways === RESULTS.DENIED
      ) {
        return true;
      } else {
        return false;
      }
    };
    const isResultWhenInUseDenied = () => {
      if (
        resultWhenInUse === RESULTS.BLOCKED ||
        resultWhenInUse === RESULTS.UNAVAILABLE ||
        resultWhenInUse === RESULTS.DENIED
      ) {
        return true;
      } else {
        return false;
      }
    };
    if (isResultAlwaysDenied() && isResultWhenInUseDenied()) {
      //user hasn't allowed location
      isPermitted = false;
    } else {
      //user has allowed location
      isPermitted = true;
    }
  } else {
    //ask for location permissions for Android
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    isPermitted = result === RESULTS.GRANTED;
  }

  if (isPermitted) {
    //Location permitted successfully, display next permission
   };
};

export {
  askGPSPermission,
  handleGPSPermission,
  handleLocationPermission
}