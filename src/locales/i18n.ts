import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {config} from '../config/general';
import { commonEn, generalEn, errorEn, successEn, dateEn } from './en/index';
import { commonVi, generalVi, errorVi, successVi, dateVi } from './vi/index';

const resources = {
  en: {
    common: commonEn,
    general: generalEn,
    success: successEn,
    error: errorEn,
    date: dateEn
  },
  vi: {
    common: commonVi,
    general: generalVi,
    success: successVi,
    error: errorVi,
    date: dateVi
  },
}

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: config.defaultLang,
  debug: __DEV__,
  resources
});

export default i18next