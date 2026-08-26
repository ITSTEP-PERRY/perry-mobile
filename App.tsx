import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LegalNoticeScreen } from './src/screens/legal/LegalNotice';
import { PrivacyPolicyScreen } from './src/screens/legal/PrivacyPolicy';
import { LicenceAgreementScreen } from './src/screens/legal/LicenceAgreement';
import { TermsConditionsScreen } from './src/screens/legal/TermsConditions';
import { NotFoundScreen } from './src/screens/system/NotFound';
import { CheckOutScreen } from './src/screens/checkout/CheckOut';
import { MenuScreen } from './src/screens/system/Menu';


export default function App() {
  //const [currentScreen, setCurrentScreen] = useState<string>('legalNotice');
  //const [currentScreen, setCurrentScreen] = useState<string>('notFound');
  //const [currentScreen, setCurrentScreen] = useState<string>('checkOut');
  const [currentScreen, setCurrentScreen] = useState<string>('menu');

  return (

    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, currentScreen === 'notFound' && styles.notFoundBackground]} edges={['top', 'bottom', 'left', 'right']}>
        
        <View style={styles.content}>

          {currentScreen == 'menu' && (
            <MenuScreen
            isAuthenticated={true}
            onClose={() => setCurrentScreen('checkOut')}
            />
          )}

          {/*currentScreen === 'checkOut' && (<CheckOutScreen onTermsPress={() => setCurrentScreen('terms')} />)}

        {/*  {currentScreen === 'legalNotice' && (
            <LegalNoticeScreen
              onTermsPress={() => setCurrentScreen('terms')}
              onLicencePress={() => setCurrentScreen('licence')}
              onPrivacyPress={() => setCurrentScreen('privacy')}
            />
          )}*/}

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
              onReturnHome={() => setCurrentScreen('legalNotice')} 
            />
          )}
        </View>
      </SafeAreaView>
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
});