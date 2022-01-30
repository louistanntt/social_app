import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {config} from '../config/general';
import { commonEn, generalEn, errorEn, successEn } from './en/index';
import { commonVi, generalVi, errorVi, successVi } from './vi/index';


export const initializeI18n = async (): Promise<void> => {
  console.log('tex')
  await i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: config.defaultLang,
    debug: __DEV__,
    resources: {
      en: {
        common: commonEn,
        general: generalEn,
        success: successEn,
        error: errorEn,
      },
      vi: {
        common: commonVi,
        general: generalVi,
        success: successVi,
        error: errorVi,
      },
    },
  });
};