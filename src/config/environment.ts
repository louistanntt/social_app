import Config from "react-native-config";

type configInstanceType = {
  API_URL?: string,
  accessToken: string | null 
}

const API_URL = Config.API_URL;
let accessToken = null;

export default {
  API_URL,
  accessToken
} as configInstanceType