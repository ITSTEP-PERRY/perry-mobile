import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import { MainScreen } from '../screens/shop/Main';
import { LoginScreen } from '../screens/auth/Login';
import { MenuScreen } from '../screens/system/Menu';
import { CheckOutScreen } from '../screens/checkout/CheckOut';
import { AccountScreen } from '../screens/user/Account';
import { AccountSettings } from '../screens/user/AccountSettings';
import { WishlistScreen } from '../screens/user/WishList';
import { MyOrdersScreen } from '../screens/user/MyOrders';
import { LegalNoticeScreen } from '../screens/legal/LegalNotice';
import { PrivacyPolicyScreen } from '../screens/legal/PrivacyPolicy';
import { LicenceAgreementScreen } from '../screens/legal/LicenceAgreement';
import { TermsConditionsScreen } from '../screens/legal/TermsConditions';
import { NotFoundScreen } from '../screens/system/NotFound';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  initialRouteName?: keyof RootStackParamList;
}

export const AppNavigator: React.FC<AppNavigatorProps> = ({
  initialRouteName = 'Main',
}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}
    >
    
      <Stack.Screen name="Main">
        {({ navigation }) => (
          <MainScreen
            onMenuPress={() => navigation.navigate('Menu')}
            onCartPress={() => navigation.navigate('CheckOut')}
            onLegalNoticePress={() => navigation.navigate('LegalNotice')}
            onPrivacyPress={() => navigation.navigate('PrivacyPolicy')}
            onLicencePress={() => navigation.navigate('LicenceAgreement')}
            onTermsPress={() => navigation.navigate('TermsConditions')}
            onSignInPress={() => navigation.navigate('Login')}
            onLogInPress={() => navigation.navigate('Login')}
          />
        )}
      </Stack.Screen>

    
      <Stack.Screen name="Menu">
        {({ navigation }) => (
          <MenuScreen
            isAuthenticated={isLoggedIn}
            onClose={() => navigation.navigate('Main')}
            onLoginPress={() => navigation.navigate('Login')}
          />
        )}
      </Stack.Screen>

    
      <Stack.Screen name="Login">
        {({ navigation }) => (
          <LoginScreen
            onClose={() => navigation.goBack()}
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              navigation.navigate('Menu');
            }}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Account">
        {({ navigation }) => (
          <AccountScreen
            onHomePress={() => navigation.navigate('Main')}
            onAccountSettingsPress={() => navigation.navigate('AccountSettings')}
            onMyOrdersPress={() => navigation.navigate('MyOrders')}
            onWishlistPress={() => navigation.navigate('WishList')}
            onTermsPress={() => navigation.navigate('TermsConditions')}
            onLicencePress={() => navigation.navigate('LicenceAgreement')}
            onPrivacyPress={() => navigation.navigate('PrivacyPolicy')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="AccountSettings">
        {({ navigation }) => (
          <AccountSettings
            onBackPress={() => navigation.goBack()}
            onTermsPress={() => navigation.navigate('TermsConditions')}
            onLicencePress={() => navigation.navigate('LicenceAgreement')}
            onPrivacyPress={() => navigation.navigate('PrivacyPolicy')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="WishList">
        {({ navigation }) => (
          <WishlistScreen onBackPress={() => navigation.goBack()} />
        )}
      </Stack.Screen>

      <Stack.Screen name="MyOrders">
        {({ navigation }) => (
          <MyOrdersScreen onBackPress={() => navigation.goBack()} />
        )}
      </Stack.Screen>

      <Stack.Screen name="CheckOut">
        {({ navigation }) => (
          <CheckOutScreen onTermsPress={() => navigation.navigate('TermsConditions')} />
        )}
      </Stack.Screen>

      <Stack.Screen name="LegalNotice">
        {({ navigation }) => (
          <LegalNoticeScreen
            onTermsPress={() => navigation.navigate('TermsConditions')}
            onLicencePress={() => navigation.navigate('LicenceAgreement')}
            onPrivacyPress={() => navigation.navigate('PrivacyPolicy')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="PrivacyPolicy">
        {({ navigation }) => (
          <PrivacyPolicyScreen
            onBackPress={() => navigation.goBack()}
            onLicencePress={() => navigation.navigate('LicenceAgreement')}
            onTermsPress={() => navigation.navigate('TermsConditions')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="LicenceAgreement">
        {({ navigation }) => (
          <LicenceAgreementScreen
            onBackPress={() => navigation.goBack()}
            onTermsPress={() => navigation.navigate('TermsConditions')}
            onPrivacyPress={() => navigation.navigate('PrivacyPolicy')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="TermsConditions">
        {({ navigation }) => (
          <TermsConditionsScreen
            onBackPress={() => navigation.goBack()}
            onLicencePress={() => navigation.navigate('LicenceAgreement')}
            onPrivacyPress={() => navigation.navigate('PrivacyPolicy')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="NotFound">
        {({ navigation }) => (
          <NotFoundScreen onReturnHome={() => navigation.navigate('Main')} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};