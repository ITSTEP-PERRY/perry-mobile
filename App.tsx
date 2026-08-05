import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LegalNoticeScreen } from './src/screens/legal/LegalNotice';
import { PrivacyPolicyScreen } from './src/screens/legal/PrivacyPolicy';
import { LicenceAgreementScreen } from './src/screens/legal/LicenceAgreement';
import { TermsConditionsScreen } from './src/screens/legal/TermsConditions';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('legalNotice');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
        <View style={styles.content}>
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
  content: {
    flex: 1,
  },
});