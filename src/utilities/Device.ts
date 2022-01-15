import { useState, useEffect } from "react";
import { Dimensions, Platform, StatusBar, NativeModules, ScaledSize } from "react-native";

type DimProps = {
    window: ScaledSize;
    screen: ScaledSize;
  };

const useDeviceInfo = (skipAndroid?: boolean) => {

    const [screenInfo, setScreenInfo] = useState<ScaledSize>(
        Dimensions.get('window'),
    );

    const { StatusBarManager } = NativeModules;
    const DeviceInfo =  NativeModules.DeviceInfo;
    const deviceName = DeviceInfo.getName();

    const STATUSBAR_DEFAULT_HEIGHT = 20;

    // const X_WIDTH = 375;
    // const X_HEIGHT = 812;

    // const XSMAX_WIDTH = 414;
    // const XSMAX_HEIGHT = 896;

    // const IP12_WIDTH = 390;
    // const IP12_HEIGHT = 844;

    // const IP12MAX_WIDTH = 428;
    // const IP12MAX_HEIGHT = 926;

    let statusBarHeight = STATUSBAR_DEFAULT_HEIGHT;
    // let isIPhoneX_v = false;
    // let isIPhoneXMax_v = false;
    // let isIPhone12_v = false;
    // let isIPhone12Max_v = false;
    // let isIPhoneWithMonobrow_v = false;

    useEffect(() => {
        const onChange = (e: DimProps) => {
          setScreenInfo(e.window);
        };
    
       const subscription = Dimensions.addEventListener('change', onChange);
    
        return () => subscription && subscription.remove();
      });

    const getStatusBarHeight = () => {
        if(Platform.OS === 'ios'){
            statusBarHeight = StatusBarManager.HEIGHT;
        }
        return Platform.select({
            ios: statusBarHeight,
            android: skipAndroid ? 0 : StatusBar.currentHeight,
            default: 0,
        })
    }

    const isTablet = () => {
        return screenInfo.width > 500 && screenInfo.height > 500
    }

    return {
        windowWidth: screenInfo.width,
        windowHeight: screenInfo.height,
        statusBarHeight: getStatusBarHeight(),
        isTablet: isTablet(),
        deviceName: deviceName,
    }
}
export default useDeviceInfo;