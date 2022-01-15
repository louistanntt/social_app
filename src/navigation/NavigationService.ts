import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef: any = createNavigationContainerRef()

export function navigate<T>(name: string, params: T) {
  if (navigationRef.isReady()) {
    navigationRef.current?.navigate(name , params);
  }else{
    console.log('not handle')
  }
}

export function goBack(){
 navigationRef.current?.goBack();
}
