import { useState, useEffect } from "react";
import { Dimensions, ScaledSize } from "react-native";

type DimProps = {
  window: ScaledSize;
  screen: ScaledSize;
};

const getWindowOrientation = () => {
    const {width , height} = Dimensions.get('window');
    return width >= height 
}

const useOrientation = () => {
   
    const [isLandscape, SetIsLandscape] = useState<boolean>(getWindowOrientation());
    useEffect(() => {
        const onChange = (e: DimProps) => {
            SetIsLandscape(getWindowOrientation())
        }
       const subscription = Dimensions.addEventListener('change', onChange);
        return () => subscription && subscription.remove();
     });
      return {landscape: isLandscape , portrait: !isLandscape };
}

export default useOrientation;