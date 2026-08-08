import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

interface NotFoundProps {
  onReturnHome?: () => void;
}

export const NotFoundScreen: React.FC<NotFoundProps> = ({ onReturnHome }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentFrame}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/img/octopus.png')} 
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.descriptionText}>This page has gone fishing...</Text>
        </View>

        <TouchableOpacity 
          style={styles.primaryButton} 
          activeOpacity={0.8}
          onPress={onReturnHome}
        >
          <Text style={styles.buttonText}>Return to main page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3962A8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentFrame: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
 
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  
  image: {
    width: 390,
    height: 430,
    borderRadius: 4,
  },
  
  descriptionText: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    letterSpacing: 0.28, 
    color: '#F2F4F8',
  },
  
  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 260,
    height: 36,
    backgroundColor: '#B8EA48',
    borderRadius: 8,
  },
  
  buttonText: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: 0.32,
    color: '#0E2042',
  },
});

export default NotFoundScreen;