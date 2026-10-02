import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {

  Main: undefined;
  Login: undefined;
  Menu: undefined;

  Account: undefined;
  AccountSettings: undefined;
  WishList: undefined;
  MyOrders: undefined;

  CheckOut: undefined;

  LegalNotice: undefined;
  PrivacyPolicy: undefined;
  LicenceAgreement: undefined;
  TermsConditions: undefined;

  NotFound: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;