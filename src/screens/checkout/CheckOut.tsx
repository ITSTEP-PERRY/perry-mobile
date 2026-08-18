import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SvgXml } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const logoIcon = `<svg width="65" height="16" viewBox="0 0 65 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M49.949 15.7734C49.7133 15.7734 49.4867 15.6827 49.3054 15.5014L42.5065 8.43059C42.2436 8.1677 42.1711 7.7779 42.3071 7.43342C42.4431 7.08895 42.7785 6.87138 43.1411 6.86232C45.5705 6.85325 46.5768 6.29122 47.0028 5.81983C47.3201 5.46629 47.447 5.00396 47.3836 4.41473C47.2476 2.96431 45.9241 1.83116 44.3739 1.83116H39.4153C38.9167 1.83116 38.5088 1.42323 38.5088 0.915581C38.5088 0.407932 38.9167 0 39.4153 0H44.3739C46.8487 0 48.97 1.86742 49.1875 4.25156C49.2873 5.35751 48.9972 6.32748 48.3445 7.06175C47.7371 7.73258 46.8578 8.20396 45.6793 8.45779C45.4708 8.50311 45.3892 8.75694 45.5343 8.91104L50.5745 14.2051C50.928 14.5586 50.928 15.1388 50.5745 15.5014C50.4113 15.6827 50.1756 15.7734 49.949 15.7734ZM5.86516 0.00906536H0.906516C0.407932 0.00906536 0 0.426063 0 0.933711V14.8578C0 15.3654 0.407932 15.7824 0.906516 15.7824C1.4051 15.7824 1.81303 15.3654 1.81303 14.8578V2.13031C1.81303 1.9762 1.93994 1.84929 2.08499 1.84929H5.85609C7.40623 1.84929 8.72975 2.9915 8.86572 4.45099C8.92011 5.04929 8.7932 5.51161 8.48499 5.86515C8.06799 6.33654 7.05269 6.89858 4.62323 6.91671C4.12465 6.91671 3.71671 7.33371 3.72578 7.84136C3.72578 8.349 4.13371 8.75694 4.6323 8.75694C7.15241 8.74787 8.84759 8.20396 9.82663 7.09801C10.4793 6.36374 10.7785 5.3847 10.6697 4.26969C10.4612 1.88555 8.34901 0.00906536 5.86516 0.00906536ZM63.3382 0.00906536C62.8397 0.00906536 62.4317 0.435127 62.4317 0.95184V5.84702C62.4317 6.39093 62.4408 6.34561 62.4317 6.74447C62.4227 7.02549 62.2504 7.14334 62.0419 7.18867C60.655 7.29745 58.3887 7.46062 56.9292 6.93484C54.8986 6.20056 54.7445 4.1881 54.7445 1.1966V0.960906C54.7445 0.435127 54.3365 0.0181307 53.838 0.0181307C53.3394 0.0181307 52.9314 0.444192 52.9314 0.960906V1.1966C52.9314 3.85269 52.9224 7.49688 56.3309 8.72068C57.2646 9.05609 58.4521 9.17393 59.7394 9.17393C60.5009 9.17393 61.3077 9.12861 62.1054 9.07422C62.2686 9.06515 62.3955 9.19206 62.3955 9.35524C62.3955 9.82662 62.3955 10.3977 62.3955 11.0957C62.3955 11.7122 62.1507 12.247 61.6703 12.7093C60.8 13.5433 59.2227 14.0057 57.736 13.8606C56.1586 13.7065 55.089 12.945 54.3728 11.4493C54.1462 10.9779 53.6023 10.7966 53.1581 11.0232C52.7139 11.2589 52.5326 11.821 52.7501 12.2923C53.7473 14.3683 55.37 15.5286 57.5728 15.7462C57.8176 15.7734 58.0623 15.7824 58.3071 15.7824C60.0748 15.7824 61.7881 15.166 62.9031 14.1144C63.7643 13.2895 64.2266 12.2561 64.2266 11.1048C64.2266 8.64816 64.2357 7.78697 64.2448 7.13428C64.2448 6.73541 64.2538 6.40906 64.2538 5.86515V0.969971C64.2448 0.426062 63.8368 0.00906536 63.3382 0.00906536ZM33.2057 9.02889C33.0516 8.87478 33.1331 8.61189 33.3507 8.56657C34.5292 8.30368 35.4085 7.83229 36.0159 7.1524C36.6686 6.40906 36.9677 5.43003 36.8589 4.30595C36.6323 1.89462 34.5201 0.00906536 32.0453 0.00906536H27.0867C26.5881 0.00906536 26.1802 0.426063 26.1802 0.933711V14.8487C26.1802 15.3654 26.5881 15.7734 27.0867 15.7734C27.5853 15.7734 27.9932 15.3564 27.9932 14.8487V2.14844C27.9932 1.99433 28.1201 1.86742 28.2652 1.86742H32.0363C33.5864 1.86742 34.9099 3.0187 35.0459 4.48725C35.1003 5.09462 34.9734 5.55694 34.6652 5.91048C34.2482 6.38187 33.2329 6.95297 30.8034 6.96204C30.4408 6.96204 30.1054 7.18866 29.9694 7.53314C29.8334 7.87762 29.9059 8.27648 30.1688 8.53937L36.9677 15.4923C37.3212 15.855 37.8923 15.855 38.2459 15.4923C38.5994 15.1297 38.5994 14.5405 38.2459 14.1779L33.2057 9.02889Z" fill="#4A7BD9"/>
</svg>`;

const letterEIcon = `<svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8391 14.5224V15.0663C11.8391 15.4198 11.5581 15.7008 11.2045 15.7008H0.643625C0.290084 15.7008 0.00906536 15.4198 0.00906536 15.0663V14.5224C0.00906536 14.1688 0.290084 13.8878 0.643625 13.8878H11.2045C11.549 13.8788 11.8391 14.1688 11.8391 14.5224ZM11.2045 6.93484H0.643625C0.290084 6.93484 0.00906536 7.21586 0.00906536 7.5694V8.11331C0.00906536 8.46686 0.290084 8.74787 0.643625 8.74787H11.2045C11.5581 8.74787 11.8391 8.46686 11.8391 8.11331V7.5694C11.8391 7.22493 11.5581 6.93484 11.2045 6.93484ZM11.1955 0H0.634562C0.28102 0 0 0.28102 0 0.634561V1.17847C0 1.53201 0.28102 1.81303 0.634562 1.81303H11.1955C11.549 1.81303 11.83 1.53201 11.83 1.17847V0.634561C11.83 0.28102 11.549 0 11.1955 0Z" fill="#4A7BD9"/>
</svg>`;

const checkIcon = `<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 2L6.375 12L2 7.45455" stroke="#0E2042" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const arrowDownIcon = `<svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 1.5L8 8L14.5 1.5" stroke="#0E2042" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

const WORLD_COUNTRIES = [
  'United States', 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh',
  'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
  'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
  'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia',
  'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark',
  'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
  'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia',
  'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
  'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
  'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
  'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
  'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi',
  'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
  'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria',
  'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea',
  'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda',
  'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
  'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone',
  'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan',
  'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
  'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
  'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
  'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

export type PaymentMethod = 'cash' | 'card';

export interface CheckOutFormValues {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  paymentMethod: PaymentMethod;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

interface CheckOutScreenProps {
  onTermsPress?: () => void;
  onCancelPress?: () => void;
  onMainPagePress?: () => void;
  navigation?: any;
}

export const CheckOutScreen: React.FC<CheckOutScreenProps> = ({ 
  onTermsPress, 
  onCancelPress,
  onMainPagePress,
  navigation: propNavigation 
}) => {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  let navFromHook: any = null;
  try {
    navFromHook = useNavigation();
  } catch (e) {}

  const navigation = propNavigation || navFromHook;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckOutFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      state: '',
      city: '',
      zipCode: '',
      paymentMethod: 'cash',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
    },
  });

  const selectedPaymentMethod = watch('paymentMethod');

  const handleTermsPress = () => {
    if (onTermsPress) {
      onTermsPress();
    } else if (navigation?.navigate) {
      navigation.navigate('TermsConditions');
    }
  };

  const handleCancelPress = () => {
    if (onCancelPress) {
      onCancelPress();
    } else if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  const handleToMainPage = () => {
    setIsSuccessModalVisible(false);
    if (onMainPagePress) {
      onMainPagePress();
    } else if (navigation?.navigate) {
      navigation.navigate('Home');
    }
  };

  const onSubmit = (data: CheckOutFormValues) => {
    console.log('Checkout Data Submit:', data);
    setIsSuccessModalVisible(true);
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.topHeaderRow}>
          <View style={styles.logoContainer}>
            <SvgXml xml={logoIcon} width="64.25" height="15.78" />
            <View style={styles.letterEWrapper}>
              <SvgXml xml={letterEIcon} width="12" height="16" />
            </View>
          </View>
          <Text style={styles.mainTitle}>Checkout</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.headerTitle}>Recipient information</Text>
        </View>

        <View style={styles.fieldsGroup}>
          <Controller
            control={control}
            name="firstName"
            rules={{ required: 'This field is necessary to continue!' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <View style={styles.labelBadge}>
                  <Text style={[styles.labelText, errors.firstName && styles.labelError]}>
                    First name
                  </Text>
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your first name"
                    placeholderTextColor="rgba(14, 32, 66, 0.25)"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
                {errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="lastName"
            rules={{ required: 'This field is necessary to continue!' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <View style={styles.labelBadge}>
                  <Text style={[styles.labelText, errors.lastName && styles.labelError]}>
                    Last name
                  </Text>
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your last name"
                    placeholderTextColor="rgba(14, 32, 66, 0.25)"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
                {errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{ required: 'This field is necessary to continue!' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <View style={styles.labelBadge}>
                  <Text style={[styles.labelText, errors.email && styles.labelError]}>
                    Email
                  </Text>
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email"
                    placeholderTextColor="rgba(14, 32, 66, 0.25)"
                    keyboardType="email-address"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
              </View>
            )}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <Text style={styles.headerTitle}>Delivery address</Text>
        </View>

        <View style={styles.fieldsGroup}>
          <Controller
            control={control}
            name="country"
            rules={{
              required: 'This field is necessary to continue!',
              validate: (val) => val !== '' || 'This field is necessary to continue!',
            }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <View style={styles.labelBadge}>
                  <Text style={[styles.labelText, errors.country && styles.labelError]}>
                    Country
                  </Text>
                </View>
                <View style={styles.pickerBox}>
                  <Text
                    style={[
                      styles.pickerSelectedText,
                      !value && styles.pickerPlaceholderText,
                    ]}
                    numberOfLines={1}
                  >
                    {value || 'Select country'}
                  </Text>
                  <View style={styles.arrowIconWrapper} pointerEvents="none">
                    <SvgXml xml={arrowDownIcon} width="16" height="10" />
                  </View>
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                    style={styles.hiddenPicker}
                  >
                    <Picker.Item label="Select country" value="" />
                    {WORLD_COUNTRIES.map((country) => (
                      <Picker.Item key={country} label={country} value={country} />
                    ))}
                  </Picker>
                </View>
                {errors.country && (
                  <Text style={styles.errorText}>{errors.country.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="state"
            rules={{
              required: 'This field is necessary to continue!',
              validate: (val) => val !== '' || 'This field is necessary to continue!',
            }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <View style={styles.labelBadge}>
                  <Text style={[styles.labelText, errors.state && styles.labelError]}>
                    State
                  </Text>
                </View>
                <View style={styles.pickerBox}>
                  <Text
                    style={[
                      styles.pickerSelectedText,
                      !value && styles.pickerPlaceholderText,
                    ]}
                    numberOfLines={1}
                  >
                    {value || 'Select state'}
                  </Text>
                  <View style={styles.arrowIconWrapper} pointerEvents="none">
                    <SvgXml xml={arrowDownIcon} width="16" height="10" />
                  </View>
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                    style={styles.hiddenPicker}
                  >
                    <Picker.Item label="Select state" value="" />
                    {US_STATES.map((state) => (
                      <Picker.Item key={state} label={state} value={state} />
                    ))}
                  </Picker>
                </View>
                {errors.state && (
                  <Text style={styles.errorText}>{errors.state.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="city"
            rules={{
              required: 'This field is necessary to continue!',
              validate: (val) => val !== '' || 'This field is necessary to continue!',
            }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <View style={styles.labelBadge}>
                  <Text style={[styles.labelText, errors.city && styles.labelError]}>
                    City
                  </Text>
                </View>
                <View style={styles.pickerBox}>
                  <Text
                    style={[
                      styles.pickerSelectedText,
                      !value && styles.pickerPlaceholderText,
                    ]}
                    numberOfLines={1}
                  >
                    {value || 'Select city'}
                  </Text>
                  <View style={styles.arrowIconWrapper} pointerEvents="none">
                    <SvgXml xml={arrowDownIcon} width="16" height="10" />
                  </View>
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                    style={styles.hiddenPicker}
                  >
                    <Picker.Item label="Select city" value="" />
                    {WORLD_COUNTRIES.map((country) => (
                      <Picker.Item key={country} label={country} value={country} />
                    ))}
                  </Picker>
                </View>
                {errors.city && (
                  <Text style={styles.errorText}>{errors.city.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="zipCode"
            rules={{ required: 'This field is necessary to continue!' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <View style={styles.labelBadge}>
                  <Text style={[styles.labelText, errors.zipCode && styles.labelError]}>
                    Postcode
                  </Text>
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter postcode"
                    placeholderTextColor="rgba(14, 32, 66, 0.25)"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
                {errors.zipCode && (
                  <Text style={styles.errorText}>{errors.zipCode.message}</Text>
                )}
              </View>
            )}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <Text style={styles.headerTitle}>Payment method</Text>
        </View>

        <View style={styles.paymentButtonGroup}>
          <TouchableOpacity
            style={[
              styles.paymentButton,
              selectedPaymentMethod === 'cash' ? styles.primaryBtn : styles.secondaryBtn,
            ]}
            onPress={() => setValue('paymentMethod', 'cash')}
          >
            <Text style={styles.paymentBtnText}>Cash</Text>
            {selectedPaymentMethod === 'cash' && (
              <View style={styles.checkIconWrapper}>
                <SvgXml xml={checkIcon} width="18" height="14" />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentButton,
              selectedPaymentMethod === 'card' ? styles.primaryBtn : styles.secondaryBtn,
            ]}
            onPress={() => setValue('paymentMethod', 'card')}
          >
            <Text style={styles.paymentBtnText}>Card</Text>
            {selectedPaymentMethod === 'card' && (
              <View style={styles.checkIconWrapper}>
                <SvgXml xml={checkIcon} width="18" height="14" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {selectedPaymentMethod === 'card' && (
          <View style={[styles.fieldsGroup, { marginTop: 16 }]}>
            <Controller
              control={control}
              name="cardNumber"
              rules={{
                required: selectedPaymentMethod === 'card' ? 'Incorrect card number' : false,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <View style={styles.labelBadge}>
                    <Text style={[styles.labelText, errors.cardNumber && styles.labelError]}>
                      Card number
                    </Text>
                  </View>
                  <View style={styles.inputBox}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="0000-0000-0000-0000"
                      placeholderTextColor="rgba(14, 32, 66, 0.25)"
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                  {errors.cardNumber && (
                    <Text style={styles.errorText}>{errors.cardNumber.message}</Text>
                  )}
                </View>
              )}
            />

            <View style={styles.rowInputs}>
              <Controller
                control={control}
                name="cardExpiry"
                rules={{
                  required: selectedPaymentMethod === 'card' ? 'Incorrect date' : false,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                    <View style={styles.labelBadge}>
                      <Text style={[styles.labelText, errors.cardExpiry && styles.labelError]}>
                        Date of expiration
                      </Text>
                    </View>
                    <View style={styles.inputBox}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="01/01"
                        placeholderTextColor="rgba(14, 32, 66, 0.25)"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    {errors.cardExpiry && (
                      <Text style={styles.errorText}>{errors.cardExpiry.message}</Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="cardCvv"
                rules={{
                  required: selectedPaymentMethod === 'card' ? 'Incorrect code' : false,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                    <View style={styles.labelBadge}>
                      <Text style={[styles.labelText, errors.cardCvv && styles.labelError]}>
                        CVV/CVC
                      </Text>
                    </View>
                    <View style={styles.inputBox}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="***"
                        placeholderTextColor="rgba(14, 32, 66, 0.25)"
                        keyboardType="numeric"
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    {errors.cardCvv && (
                      <Text style={styles.errorText}>{errors.cardCvv.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.summaryBanner}>
          <Text style={styles.headerTitle}>Summary</Text>
          <View style={styles.divider} />

          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.productRow}>
              <Text style={styles.productTitle} numberOfLines={2}>
                PUMIEY Women's Long Sleeve T-Shirts...
              </Text>
              <View style={styles.productPriceBlock}>
                <View style={styles.smallPriceRow}>
                  <Text style={styles.qtyText}>1 x $999</Text>
                  <Text style={styles.smallCents}>99</Text>
                </View>
                <View style={styles.mainPriceRow}>
                  <Text style={styles.priceAmount}>$ 999</Text>
                  <Text style={styles.priceCents}>99</Text>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.totalAmount}>$999</Text>
              <Text style={styles.totalCents}>99</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit(onSubmit)} activeOpacity={0.8}>
            <Text style={styles.submitBtnText}>Place order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelPress} activeOpacity={0.7}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>

          <Text style={styles.termsNoticeText}>
            By clicking “Continue”, you agree with{' '}
            <Text style={styles.termsLinkText} onPress={handleTermsPress}>
              PERRY Terms and Conditions
            </Text>
          </Text>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isSuccessModalVisible}
        onRequestClose={() => setIsSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Success!</Text>
            <View style={styles.modalDivider} />
            <Text style={styles.modalMessage}>Your order was placed successfully!</Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={handleToMainPage}
              activeOpacity={0.8}
            >
              <Text style={styles.modalBtnText}>To main page</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F8',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 20,
  },
  topHeaderRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 8,
    minHeight: 38,
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    width: 65,
    height: 16,
    justifyContent: 'center',
  },
  letterEWrapper: {
    position: 'absolute',
    left: 12,
    top: 0,
  },
  mainTitle: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 38,
    color: '#0E2042',
    textAlign: 'center',
  },
  sectionHeader: {
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: 'Mulish',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    color: '#0E2042',
  },
  fieldsGroup: {
    gap: 12,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  labelBadge: {
    position: 'absolute',
    left: 20,
    top: -6,
    backgroundColor: '#F2F4F8',
    paddingHorizontal: 4,
    zIndex: 10,
  },
  labelText: {
    fontFamily: 'Mulish',
    fontSize: 12,
    lineHeight: 14,
    color: '#0E2042',
  },
  labelError: {
    color: '#D93C3C',
    fontWeight: '600',
  },
  inputBox: {
    height: 48,
    borderWidth: 1.5,
    borderColor: 'rgba(14, 32, 66, 0.5)',
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  pickerBox: {
    height: 48,
    borderWidth: 1.5,
    borderColor: 'rgba(14, 32, 66, 0.5)',
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  pickerSelectedText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    color: '#0E2042',
    paddingRight: 24,
  },
  pickerPlaceholderText: {
    color: 'rgba(14, 32, 66, 0.25)',
  },
  arrowIconWrapper: {
    position: 'absolute',
    right: 20,
    top: 18,
  },
  hiddenPicker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
  textInput: {
    fontFamily: 'Mulish',
    fontSize: 14,
    color: '#0E2042',
    padding: 0,
  },
  errorText: {
    fontSize: 10,
    color: '#D93C3C',
    marginTop: 2,
    marginLeft: 20,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#CCDDFF',
    marginVertical: 8,
  },
  paymentButtonGroup: {
    gap: 12,
  },
  paymentButton: {
    height: 44,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    position: 'relative',
  },
  primaryBtn: {
    backgroundColor: '#B8EA48',
  },
  secondaryBtn: {
    borderWidth: 2.5,
    borderColor: '#4A7BD9',
  },
  paymentBtnText: {
    fontFamily: 'Mulish',
    fontSize: 16,
    color: '#0E2042',
    fontWeight: '500',
  },
  checkIconWrapper: {
    position: 'absolute',
    right: 16,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryBanner: {
    backgroundColor: '#F4FAFF',
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    shadowColor: '#2C5DBB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 11.5,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  productTitle: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 18,
    color: '#0E2042',
    flex: 1,
    marginRight: 12,
  },
  productPriceBlock: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  smallPriceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  qtyText: {
    fontFamily: 'Mulish',
    fontSize: 12,
    color: 'rgba(14, 32, 66, 0.4)',
  },
  smallCents: {
    fontFamily: 'Mulish',
    fontSize: 8,
    color: 'rgba(14, 32, 66, 0.4)',
    transform: [{ translateY: -2 }],
  },
  mainPriceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  priceAmount: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 16,
    color: '#0E2042',
  },
  priceCents: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 10,
    color: '#0E2042',
    transform: [{ translateY: -4 }],
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    marginVertical: 12,
  },
  totalLabel: {
    fontFamily: 'Mulish',
    fontSize: 16,
    color: '#0E2042',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  totalAmount: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 28,
    color: '#0E2042',
  },
  totalCents: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 16,
    color: '#0E2042',
    transform: [{ translateY: -8 }],
  },
  submitBtn: {
    minHeight: 48,
    backgroundColor: '#B8EA48',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  submitBtnText: {
    fontFamily: 'Mulish',
    fontSize: 18,
    fontWeight: '600',
    color: '#0E2042',
    textAlign: 'center',
  },
  cancelBtn: {
    height: 48,
    borderWidth: 2,
    borderColor: '#4A7BD9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  cancelBtnText: {
    fontFamily: 'Mulish',
    fontSize: 18,
    fontWeight: '600',
    color: '#0E2042',
  },
  termsNoticeText: {
    fontFamily: 'Mulish',
    fontSize: 12,
    lineHeight: 16,
    color: '#718096',
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 12,
  },
  termsLinkText: {
    color: '#4A7BD9',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(14, 32, 66, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#F4FAFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 30,
    color: '#0E2042',
    textAlign: 'center',
  },
  modalDivider: {
    width: '100%',
    height: 1.5,
    backgroundColor: '#CCDDFF',
    marginVertical: 16,
  },
  modalMessage: {
    fontFamily: 'Mulish',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
    color: '#0E2042',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalBtn: {
    width: '100%',
    height: 48,
    backgroundColor: '#B8EA48',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBtnText: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 18,
    color: '#0E2042',
  },
});