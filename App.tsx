import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator';

import { LegalNoticeScreen } from './src/screens/legal/LegalNotice';
import { PrivacyPolicyScreen } from './src/screens/legal/PrivacyPolicy';
import { LicenceAgreementScreen } from './src/screens/legal/LicenceAgreement';
import { TermsConditionsScreen } from './src/screens/legal/TermsConditions';
import { NotFoundScreen } from './src/screens/system/NotFound';
import { CheckOutScreen } from './src/screens/checkout/CheckOut';
import { MenuScreen } from './src/screens/system/Menu';
import { LoginScreen } from './src/screens/auth/Login';
import { MainScreen } from './src/screens/shop/Main';
import { AccountScreen } from './src/screens/user/Account';
import { AccountSettings } from './src/screens/user/AccountSettings';
import { WishlistScreen } from './src/screens/user/WishList';
import { MyOrdersScreen } from './src/screens/user/MyOrders';

type ScreenName =
  | 'devMenu'
  | 'main'
  | 'login'
  | 'menu'
  | 'checkOut'
  | 'legalNotice'
  | 'privacy'
  | 'licence'
  | 'terms'
  | 'notFound'
  | 'account'
  | 'accountSettings'
  | 'wishList'
  | 'myOrders';

interface ScreenOption {
  id: ScreenName;
  label: string;
}

const SCREENS: ScreenOption[] = [
  { id: 'main', label: 'Main' },
  { id: 'login', label: 'Login' },
  { id: 'menu', label: 'Menu' },
  { id: 'checkOut', label: 'CheckOut' },
  { id: 'account', label: 'Account' },
  { id: 'accountSettings', label: 'Account Settings' },
  { id: 'wishList', label: 'Wish List' },
  { id: 'myOrders', label: 'My Orders' },
  { id: 'legalNotice', label: 'Legal Notice' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'licence', label: 'Licence Agreement' },
  { id: 'terms', label: 'Terms & Conditions' },
  { id: 'notFound', label: '404 Not Found' },
];

export default function App() {

  const [currentScreen, setCurrentScreen] = useState<ScreenName>('main');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const selectScreen = (screen: ScreenName) => {
    setCurrentScreen(screen);
    setIsModalOpen(false);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView
          style={[
            styles.container,
            currentScreen === 'notFound' && styles.notFoundBackground,
          ]}
          edges={['top', 'bottom', 'left', 'right']}
        >
          <View style={styles.content}>
            {currentScreen === 'devMenu' && (
              <ScrollView contentContainerStyle={styles.devMenuContainer}>
                {SCREENS.map((screen) => (
                  <TouchableOpacity
                    key={screen.id}
                    style={styles.devMenuButton}
                    onPress={() => selectScreen(screen.id)}
                  >
                    <Text style={styles.devMenuButtonText}>{screen.label}</Text>
                    <Text style={styles.devMenuArrow}>›</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {currentScreen === 'main' && (
              <MainScreen
                onMenuPress={() => setCurrentScreen('menu')}
                onCartPress={() => setCurrentScreen('checkOut')}
                onLegalNoticePress={() => setCurrentScreen('legalNotice')}
                onPrivacyPress={() => setCurrentScreen('privacy')}
                onLicencePress={() => setCurrentScreen('licence')}
                onTermsPress={() => setCurrentScreen('terms')}
                onSignInPress={() => setCurrentScreen('login')}
                onLogInPress={() => setCurrentScreen('login')}
              />
            )}

            {currentScreen === 'login' && (
              <LoginScreen onLoginSuccess={() => setCurrentScreen('menu')} />
            )}

            {currentScreen === 'menu' && (
              <MenuScreen
                isAuthenticated={true}
                onClose={() => setCurrentScreen('main')}
              />
            )}

            {currentScreen === 'checkOut' && (
              <CheckOutScreen onTermsPress={() => setCurrentScreen('terms')} />
            )}

            {currentScreen === 'account' && (
              <AppNavigator initialRouteName="Account" />
            )}

            {currentScreen === 'accountSettings' && (
              <AccountSettings
                onBackPress={() => setCurrentScreen('account')}
                onTermsPress={() => setCurrentScreen('terms')}
                onLicencePress={() => setCurrentScreen('licence')}
                onPrivacyPress={() => setCurrentScreen('privacy')}
              />
            )}

            {currentScreen === 'wishList' && (
              <WishlistScreen
                onBackPress={() => setCurrentScreen('account')}
              />
            )}

            {currentScreen === 'myOrders' && (
              <MyOrdersScreen
                onBackPress={() => setCurrentScreen('account')}
              />
            )}

            {currentScreen === 'legalNotice' && (
              <LegalNoticeScreen
                onTermsPress={() => setCurrentScreen('terms')}
                onLicencePress={() => setCurrentScreen('licence')}
                onPrivacyPress={() => setCurrentScreen('privacy')}
              />
            )}

            {currentScreen === 'privacy' && (
              <PrivacyPolicyScreen
                onBackPress={() => setCurrentScreen('legalNotice')}
                onLicencePress={() => setCurrentScreen('licence')}
                onTermsPress={() => setCurrentScreen('terms')}
              />
            )}

            {currentScreen === 'licence' && (
              <LicenceAgreementScreen
                onBackPress={() => setCurrentScreen('legalNotice')}
                onTermsPress={() => setCurrentScreen('terms')}
                onPrivacyPress={() => setCurrentScreen('privacy')}
              />
            )}

            {currentScreen === 'terms' && (
              <TermsConditionsScreen
                onBackPress={() => setCurrentScreen('legalNotice')}
                onLicencePress={() => setCurrentScreen('licence')}
                onPrivacyPress={() => setCurrentScreen('privacy')}
              />
            )}

            {currentScreen === 'notFound' && (
              <NotFoundScreen
                onReturnHome={() => setCurrentScreen('main')}
              />
            )}
          </View>

          {currentScreen !== 'devMenu' && (
            <TouchableOpacity
              style={styles.floatingDevButton}
              onPress={() => setIsModalOpen(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.floatingDevButtonText}>Экраны</Text>
            </TouchableOpacity>
          )}

          <Modal
            visible={isModalOpen}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsModalOpen(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Быстрый доступ</Text>
                  <TouchableOpacity onPress={() => setIsModalOpen(false)}>
                    <Text style={styles.closeModalText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView style={{ maxHeight: 400 }}>
                  {SCREENS.map((screen) => (
                    <TouchableOpacity
                      key={screen.id}
                      style={[
                        styles.modalOption,
                        currentScreen === screen.id && styles.modalOptionActive,
                      ]}
                      onPress={() => selectScreen(screen.id)}
                    >
                      <Text
                        style={[
                          styles.modalOptionText,
                          currentScreen === screen.id && styles.modalOptionTextActive,
                        ]}
                      >
                        {screen.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  notFoundBackground: {
    backgroundColor: '#3962A8',
  },
  content: {
    flex: 1,
  },
  devMenuContainer: {
    padding: 24,
    paddingTop: 40,
  },
  devMenuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0E2042',
    marginBottom: 8,
  },
  devMenuSubtitle: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 24,
  },
  devMenuButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F4FAFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#CCDDFF',
  },
  devMenuButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3962A8',
  },
  devMenuArrow: {
    fontSize: 20,
    color: '#3962A8',
    fontWeight: 'bold',
  },
  floatingDevButton: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    backgroundColor: '#0E2042',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 999,
  },
  floatingDevButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0E2042',
  },
  closeModalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#64748B',
    padding: 4,
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 6,
  },
  modalOptionActive: {
    backgroundColor: '#EBF3FF',
  },
  modalOptionText: {
    fontSize: 15,
    color: '#334155',
  },
  modalOptionTextActive: {
    fontWeight: 'bold',
    color: '#3962A8',
  },
});