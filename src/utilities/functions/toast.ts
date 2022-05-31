import Toast from "react-native-toast-message";


export const toast = (text: string, type:string = "success", duration:number = 2000, text2?:string) => {
    
    let toastType = type;
    if (type === "danger" || type === "error") {
      toastType = "error";
    }
  
    return Toast.show({
      text1: text,
      text2,
      autoHide: true,
      type: toastType,
      visibilityTime: duration,
    })
  };
  
  export const errorToast = (error: any, title: string) => {
    // if (error?.response?.status === 401) {
    //   AsyncStorage.multiRemove(["selectedShopId", "token"]);
    //   RNRestart.Restart();
    // }
    // if (error?.response?.status === 413) {
    //   toast(i18n.t("FILE_TOO_LARGE"), 5000);
    // }
    // if (error?.response?.data?.message) {
    //   console.log(error.response.data.message);
    // } else {
    //   console.log(error); 
    // }
  
    // if (error.message === "Network Error") {
    //   toast(i18n.t("NETWORK_DISCONNECTED"), "danger", 10000);
    // } else {
    //   toast(title, "danger", 5000);
    // }
  };