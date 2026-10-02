import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Modal,} from 'react-native';
import { SvgXml } from 'react-native-svg';

interface AccountSettingsScreenProps {
  userName?: string;
  userEmail?: string;
  maskedPassword?: string;
  onBackPress?: () => void;
  onEditPhoto?: () => void;
  onEditName?: (firstName: string, lastName: string) => void;
  onEditEmail?: (newEmail: string) => void;
  onChangePassword?: (newPassword: string) => void;
  onLogout?: () => void;
  onDeleteAccount?: () => void;
  onTermsPress?: () => void;
  onLicencePress?: () => void;
  onPrivacyPress?: () => void;
}

const eyeOpenIcon = `<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.05957 20.54C8.27957 15.71 13.7596 12.52 19.9996 12.52C26.2396 12.52 31.7196 15.71 34.9396 20.54" stroke="#0E2042" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 28.7802C24.0261 28.7802 27.29 25.5164 27.29 21.4902C27.29 17.464 24.0261 14.2002 20 14.2002C15.9738 14.2002 12.71 17.464 12.71 21.4902C12.71 25.5164 15.9738 28.7802 20 28.7802Z" stroke="#0E2042" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M31.3 26.4399C28.22 28.9499 24.28 30.4599 20 30.4599C15.72 30.4599 11.79 28.9599 8.70996 26.4499" stroke="#0E2042" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.96 11.94V9.54004" stroke="#0E2042" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M30.4805 15.6699L32.4905 13.6499" stroke="#0E2042" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.45953 15.67L7.51953 13.73" stroke="#0E2042" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const eyeClosedIcon = `<svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 18.7002C8.23 23.5502 13.74 26.7502 20 26.7502C26.26 26.7502 31.77 23.5502 35 18.7002" stroke="#0E2042" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 27.3501V32.1501" stroke="#0E2042" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M30.5703 23.6001L33.9603 27.0001" stroke="#0E2042" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.44957 23.6001L6.05957 27.0001" stroke="#0E2042" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const backArrowIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19L8 12L15 5" stroke="#4A7BD9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const cartIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 4.30762H5.28C7.29 4.30762 6.714 7.13362 6.426 8.35162C6.036 9.98962 6.156 11.7356 8.106 12.2096C8.496 12.3056 8.898 12.3356 9.294 12.3356H16.218C16.218 12.3356 16.41 12.3356 16.698 12.3716C18.732 12.6176 18.576 15.2816 16.53 15.2996C16.506 15.2996 16.476 15.2996 16.452 15.2996H8.682" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.01855 4.97363H19.9926C20.7906 4.97363 21.2706 5.86763 20.8266 6.53363L18.0366 10.7156" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.75597 19.6921C10.4949 19.6921 11.094 19.0931 11.094 18.3541C11.094 17.6152 10.4949 17.0161 9.75597 17.0161C9.01701 17.0161 8.41797 17.6152 8.41797 18.3541C8.41797 19.0931 9.01701 19.6921 9.75597 19.6921Z" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.4454 19.6921C17.1844 19.6921 17.7834 19.0931 17.7834 18.3541C17.7834 17.6152 17.1844 17.0161 16.4454 17.0161C15.7065 17.0161 15.1074 17.6152 15.1074 18.3541C15.1074 19.0931 15.7065 19.6921 16.4454 19.6921Z" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const searchActionButton = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.324 9.4039C8.604 10.3479 6.944 10.7999 6.2 10.7999C3.88 10.7999 2 8.9199 2 6.5999C2 4.2799 3.88 2.3999 6.2 2.3999C8.52 2.3999 10.4 4.2799 10.4 6.5999C10.4 7.0559 10.328 7.4959 10.192 7.9079" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.0002 13.5998L9.32422 9.40381" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const facebookIcon = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.2042 18.4184V24.1484C19.2042 24.6164 18.8322 25.0004 18.3762 25.0004H17.3022C16.8462 25.0004 16.4742 24.6164 16.4742 24.1484V19.0364C16.4742 18.7244 16.2282 18.4664 15.9222 18.4664H14.9022C14.4462 18.4664 14.0742 18.0824 14.0742 17.6144V16.6904C14.0742 16.2224 14.4462 15.8384 14.9022 15.8384H15.9222C16.2282 15.8384 16.4742 15.5864 16.4742 15.2684V14.7764C16.4742 13.8884 16.3722 12.9944 16.7442 12.1604C17.0562 11.4584 17.6262 10.9124 18.3042 10.5944C19.1322 10.1984 20.0262 10.1924 20.9202 10.2104C21.3702 10.2224 21.7362 10.6004 21.7362 11.0624V11.7344C21.7362 12.1604 21.4302 12.5144 21.0222 12.5744C20.9562 12.5864 20.8842 12.5984 20.8182 12.6044C20.4102 12.6764 19.9782 12.8024 19.6542 13.0784C19.2402 13.4324 19.1742 13.9544 19.1562 14.4764C19.1442 14.7464 19.1622 15.0164 19.1802 15.2924C19.1982 15.5924 19.4382 15.8264 19.7322 15.8264H20.6622C21.1722 15.8264 21.5622 16.2944 21.4842 16.8164L21.1842 18.7424" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.3319 24.9876H11.4399C8.99186 24.9876 7.00586 23.0016 7.00586 20.5536V11.4336" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.4404 7H20.5604C23.0084 7 24.9944 8.986 24.9944 11.434V20.554" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const xIcon = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.7718 19.6904L8.13379 24.9884" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23.8664 7.01172L19.3604 12.1597" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.53178 7.01172H11.4998C11.8658 7.01172 12.2138 7.19172 12.4238 7.49172L23.3858 23.2237C23.9078 23.9677 23.3738 24.9877 22.4618 24.9877H20.4698C20.1038 24.9877 19.7558 24.8077 19.5458 24.5077L8.61378 8.77572C8.09778 8.03172 8.63178 7.01172 9.53778 7.01172H9.53178Z" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const instagramIcon = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4404 7H20.5664C23.0204 7 25.0064 8.986 25.0064 11.44V20.566" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.5601 24.9996H11.4341C8.98014 24.9996 6.99414 23.0136 6.99414 20.5596V11.4336" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.9997 20.1517C18.2927 20.1517 20.1517 18.2927 20.1517 15.9997C20.1517 13.7066 18.2927 11.8477 15.9997 11.8477C13.7066 11.8477 11.8477 13.7066 11.8477 15.9997C11.8477 18.2927 13.7066 20.1517 15.9997 20.1517Z" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.4018 10.7736C22.3178 11.1156 22.0358 11.3976 21.6938 11.4696C21.3158 11.5536 20.9678 11.4216 20.7458 11.1696C20.5538 10.9476 20.4578 10.6416 20.5298 10.3116C20.6078 9.96358 20.8838 9.68158 21.2318 9.59758C21.9518 9.42358 22.5818 10.0536 22.4078 10.7736H22.4018Z" fill="#F2F4F8"/>
</svg>`;

const gmailIcon = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.9997 15.2197V21.4357C24.9997 22.2277 24.3457 22.8697 23.5537 22.8517L21.0697 22.7977C20.9017 22.7977 20.7637 22.6537 20.7637 22.4857V18.7597" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25 12.7304L20.554 16.1684L16.162 19.5344C16.066 19.6064 15.934 19.6064 15.838 19.5344L11.446 16.1684L7 12.9644V11.0384C7 9.52636 8.728 8.66836 9.934 9.58036L15.838 14.0624C15.934 14.1344 16.066 14.1344 16.156 14.0624L22.06 9.58036C23.266 8.66836 24.994 9.52636 24.994 11.0384V12.7304H25Z" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.236 18.766V22.492C11.236 22.66 11.098 22.798 10.93 22.804L8.446 22.858C7.654 22.876 7 22.234 7 21.442V15.46" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const telegramIcon = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.4615 18.5076C13.4615 18.9516 13.9835 19.1976 14.3255 18.9156L15.2735 18.1296C15.4535 17.9796 15.7055 17.9676 15.9035 18.0996L19.1075 20.2356C19.4255 20.4456 19.8575 20.2596 19.9175 19.8816L21.1295 12.6036C21.2315 11.9916 20.6255 11.5056 20.0495 11.7396L11.1815 15.3696C10.7195 15.5616 10.7555 16.2276 11.2355 16.3656L13.2275 16.9356C13.3775 16.9776 13.5335 16.9536 13.6655 16.8696L16.7855 14.7876" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.5601 24.9996H11.4341C8.98014 24.9996 6.99414 23.0136 6.99414 20.5596V11.4336" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.4404 7H20.5664C23.0204 7 25.0064 8.986 25.0064 11.44V20.566" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const perryIcon = `<svg width="77" height="30" viewBox="0 0 77 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.7282 21.3657V21.8843C30.7282 22.2213 30.4603 22.4893 30.1232 22.4893H20.0541C19.717 22.4893 19.4491 22.2213 19.4491 21.8843V21.3657C19.4491 21.0286 19.717 20.7607 20.0541 20.7607H30.1232C30.4517 20.752 30.7282 21.0286 30.7282 21.3657ZM30.1232 14.1315H20.0541C19.717 14.1315 19.4491 14.3994 19.4491 14.7365V15.2551C19.4491 15.5921 19.717 15.8601 20.0541 15.8601H30.1232C30.4603 15.8601 30.7282 15.5921 30.7282 15.2551V14.7365C30.7282 14.408 30.4603 14.1315 30.1232 14.1315ZM30.1146 7.51953H20.0454C19.7084 7.51953 19.4404 7.78747 19.4404 8.12454V8.64313C19.4404 8.9802 19.7084 9.24814 20.0454 9.24814H30.1146C30.4517 9.24814 30.7196 8.9802 30.7196 8.64313V8.12454C30.7196 7.78747 30.4517 7.51953 30.1146 7.51953Z" fill="#F2F4F8"/>
<path d="M55.1339 22.4803C54.9092 22.4803 54.6931 22.3939 54.5202 22.221L48.038 15.4794C47.7873 15.2288 47.7182 14.8571 47.8478 14.5287C47.9775 14.2003 48.2972 13.9928 48.643 13.9842C50.9593 13.9755 51.9187 13.4397 52.3249 12.9902C52.6274 12.6532 52.7484 12.2124 52.6879 11.6506C52.5583 10.2677 51.2964 9.1873 49.8184 9.1873H45.0907C44.6153 9.1873 44.2264 8.79836 44.2264 8.31435C44.2264 7.83034 44.6153 7.44141 45.0907 7.44141H49.8184C52.178 7.44141 54.2004 9.22187 54.4079 11.495C54.5029 12.5494 54.2264 13.4743 53.6041 14.1743C53.025 14.8139 52.1866 15.2634 51.063 15.5054C50.8642 15.5486 50.7864 15.7906 50.9247 15.9375L55.7303 20.9851C56.0673 21.3221 56.0673 21.8753 55.7303 22.221C55.5747 22.3939 55.35 22.4803 55.1339 22.4803ZM13.1028 7.45005H8.37505C7.89968 7.45005 7.51074 7.84763 7.51074 8.33164V21.6074C7.51074 22.0914 7.89968 22.4889 8.37505 22.4889C8.85041 22.4889 9.23935 22.0914 9.23935 21.6074V9.47252C9.23935 9.32559 9.36035 9.20459 9.49864 9.20459H13.0941C14.5721 9.20459 15.834 10.2936 15.9636 11.6851C16.0155 12.2556 15.8945 12.6964 15.6006 13.0335C15.203 13.4829 14.235 14.0188 11.9187 14.036C11.4433 14.036 11.0544 14.4336 11.063 14.9176C11.063 15.4016 11.452 15.7906 11.9273 15.7906C14.3301 15.7819 15.9463 15.2634 16.8798 14.2089C17.5021 13.5088 17.7873 12.5754 17.6836 11.5123C17.4848 9.23916 15.471 7.45005 13.1028 7.45005ZM67.8997 7.45005C67.4243 7.45005 67.0354 7.85627 67.0354 8.34892V13.0162C67.0354 13.5348 67.044 13.4915 67.0354 13.8718C67.0267 14.1398 66.8625 14.2521 66.6637 14.2953C65.3413 14.3991 63.1806 14.5546 61.789 14.0533C59.853 13.3532 59.7061 11.4345 59.7061 8.58229V8.35757C59.7061 7.85627 59.3171 7.45869 58.8418 7.45869C58.3664 7.45869 57.9774 7.86491 57.9774 8.35757V8.58229C57.9774 11.1147 57.9688 14.5892 61.2186 15.756C62.1088 16.0758 63.2411 16.1882 64.4684 16.1882C65.1944 16.1882 65.9636 16.1449 66.7242 16.0931C66.8798 16.0844 67.0008 16.2055 67.0008 16.361C67.0008 16.8105 67.0008 17.355 67.0008 18.0205C67.0008 18.6082 66.7674 19.1182 66.3093 19.559C65.4796 20.3541 63.9757 20.7949 62.5583 20.6566C61.0544 20.5097 60.0345 19.7837 59.3517 18.3576C59.1356 17.9081 58.617 17.7353 58.1935 17.9513C57.77 18.1761 57.5972 18.7119 57.8046 19.1614C58.7553 21.1406 60.3024 22.2469 62.4027 22.4544C62.6361 22.4803 62.8694 22.4889 63.1028 22.4889C64.7882 22.4889 66.4217 21.9012 67.4848 20.8986C68.3059 20.1121 68.7467 19.1268 68.7467 18.0291C68.7467 15.6869 68.7553 14.8658 68.764 14.2435C68.764 13.8632 68.7726 13.552 68.7726 13.0335V8.36621C68.764 7.84763 68.375 7.45005 67.8997 7.45005ZM39.1702 16.0499C39.0233 15.9029 39.1011 15.6523 39.3085 15.6091C40.4321 15.3584 41.2705 14.909 41.8495 14.2608C42.4718 13.552 42.7571 12.6186 42.6533 11.5469C42.4373 9.2478 40.4234 7.45005 38.0639 7.45005H33.3361C32.8608 7.45005 32.4718 7.84763 32.4718 8.33164V21.5987C32.4718 22.0914 32.8608 22.4803 33.3361 22.4803C33.8115 22.4803 34.2004 22.0827 34.2004 21.5987V9.48981C34.2004 9.34288 34.3215 9.22187 34.4597 9.22187H38.0552C39.5332 9.22187 40.7951 10.3195 40.9247 11.7197C40.9766 12.2988 40.8556 12.7396 40.5617 13.0767C40.1641 13.5261 39.1961 14.0706 36.8798 14.0793C36.5341 14.0793 36.2143 14.2953 36.0846 14.6238C35.955 14.9522 36.0241 15.3325 36.2748 15.5832L42.7571 22.2124C43.0941 22.5581 43.6386 22.5581 43.9757 22.2124C44.3128 21.8666 44.3128 21.3048 43.9757 20.9591L39.1702 16.0499Z" fill="#F2F4F8"/>
</svg>`;

export const AccountSettings: React.FC<AccountSettingsScreenProps> = ({
  userName = 'Marsha Shields',
  userEmail = 'marsha_sh1elds@gmail.com',
  maskedPassword = '***************',
  onBackPress,
  onEditPhoto,
  onEditName,
  onEditEmail,
  onChangePassword,
  onLogout,
  onDeleteAccount,
  onTermsPress,
  onLicencePress,
  onPrivacyPress,
}) => {
  const [localUserName, setLocalUserName] = useState(userName);
  const [localUserEmail, setLocalUserEmail] = useState(userEmail);
  const [localMaskedPassword, setLocalMaskedPassword] = useState(maskedPassword);

  const [isNameModalVisible, setIsNameModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [emailPassword, setEmailPassword] = useState('');
  const [showEmailPassword, setShowEmailPassword] = useState(false);
  const [codeDigits, setCodeDigits] = useState(['1', '2', '3', '4', '5', '6']);

  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleOpenNameModal = () => {
    setFirstName('');
    setLastName('');
    setIsNameModalVisible(true);
  };

  const handleSaveName = () => {
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    if (fullName) {
      setLocalUserName(fullName);
      if (onEditName) {
        onEditName(firstName, lastName);
      }
    }
    setIsNameModalVisible(false);
  };

  const handleOpenEmailModal = () => {
    setEmailPassword('');
    setShowEmailPassword(false);
    setCodeDigits(['1', '2', '3', '4', '5', '6']);
    setIsEmailModalVisible(true);
  };

  const handleCodeDigitChange = (text: string, index: number) => {
    const newDigits = [...codeDigits];
    newDigits[index] = text;
    setCodeDigits(newDigits);
  };

  const handleOpenPasswordModal = () => {
    setCurrentPassword('');
    setNewPassword('');
    setRepeatPassword('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowRepeatPassword(false);
    setIsPasswordModalVisible(true);
  };

  const handleSavePassword = () => {
    if (newPassword) {
      setLocalMaskedPassword('•'.repeat(newPassword.length));
      if (onChangePassword) {
        onChangePassword(newPassword);
      }
    }
    setIsPasswordModalVisible(false);
  };

  const handleOpenLogoutModal = () => {
    setIsEmailModalVisible(false);
    setIsLogoutModalVisible(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalVisible(false);
    if (onLogout) {
      onLogout();
    }
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDeleteAccount = () => {
    setIsDeleteModalVisible(false);
    if (onDeleteAccount) {
      onDeleteAccount();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="rgba(14, 32, 66, 0.5)"
          />
          <TouchableOpacity style={styles.searchActionButton} activeOpacity={0.7}>
            <SvgXml xml={searchActionButton} width={16} height={16} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cartButton} activeOpacity={0.7}>
          <SvgXml xml={cartIcon} width={24} height={24} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.whiteSection}>
          <View style={styles.headerTitleSection}>
            <TouchableOpacity onPress={onBackPress} style={styles.backButton} activeOpacity={0.7}>
              <SvgXml xml={backArrowIcon} width={20} height={20} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.pageTitle}>Account settings</Text>
          </View>

          <View style={styles.settingsList}>
            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Profile photo</Text>
                <Text style={styles.cardDescription}>
                  Change your profile picture.
                </Text>
              </View>
              <View style={styles.actionRight}>
                <TouchableOpacity style={styles.secondaryButton} onPress={onEditPhoto} activeOpacity={0.7}>
                  <Text style={styles.secondaryButtonText}>Change photo</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.card, styles.coloredCard]}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>First name and last name</Text>
                <Text style={styles.cardDescription}>
                  Update your first and last name for your profile where it's displayed.
                </Text>
              </View>
              <View style={styles.actionRightCol}>
                <Text style={styles.valueText}>{localUserName}</Text>
                <TouchableOpacity style={styles.secondaryButton} onPress={handleOpenNameModal} activeOpacity={0.7}>
                  <Text style={styles.secondaryButtonText}>Change name</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Email</Text>
                <Text style={styles.cardDescription}>
                  Update the email address associated with your account.
                </Text>
              </View>
              <View style={styles.actionRightCol}>
                <Text style={styles.valueText}>{localUserEmail}</Text>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={onEditEmail ? () => onEditEmail(localUserEmail) : handleOpenEmailModal}
                  activeOpacity={0.7}
                >
                  <Text style={styles.secondaryButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.card, styles.coloredCard]}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Password</Text>
                <Text style={styles.cardDescription}>
                  Change your account's password.
                </Text>
              </View>
              <View style={styles.actionRightCol}>
                <Text style={styles.valueText}>{localMaskedPassword}</Text>
                <TouchableOpacity style={styles.secondaryButton} onPress={handleOpenPasswordModal} activeOpacity={0.7}>
                  <Text style={styles.secondaryButtonText}>Change password</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Log out</Text>
                <Text style={styles.cardDescription}>
                  Ends current session, disconnecting user from account or system.
                </Text>
              </View>
              <View style={styles.actionRight}>
                <TouchableOpacity style={styles.secondaryButton} onPress={handleOpenLogoutModal} activeOpacity={0.7}>
                  <Text style={styles.secondaryButtonText}>Log out</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.card, styles.coloredCard]}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Delete account</Text>
                <Text style={styles.cardDescription}>
                  Permanently remove your account and associated data, disabling access and erasing personal information.
                </Text>
              </View>
              <View style={styles.actionRight}>
                <TouchableOpacity style={styles.destructiveButton} onPress={handleOpenDeleteModal} activeOpacity={0.7}>
                  <Text style={styles.destructiveButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.topFooter}>
            <Text style={styles.footerHeader}>Support</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>Contact us</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>FAQ</Text>
            </TouchableOpacity>

            <Text style={styles.footerHeader}>Legal notice</Text>
            <TouchableOpacity onPress={onTermsPress} activeOpacity={0.7}>
              <Text style={styles.footerLink}>Terms and Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLicencePress} activeOpacity={0.7}>
              <Text style={styles.footerLink}>License agreement</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPrivacyPress} activeOpacity={0.7}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>

            <Text style={styles.footerHeader}>Social media</Text>

            <View style={styles.socialIconsContainer}>
              <TouchableOpacity activeOpacity={0.7}>
                <SvgXml xml={facebookIcon} width={32} height={32} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7}>
                <SvgXml xml={xIcon} width={32} height={32} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7}>
                <SvgXml xml={instagramIcon} width={32} height={32} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7}>
                <SvgXml xml={gmailIcon} width={32} height={32} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7}>
                <SvgXml xml={telegramIcon} width={32} height={32} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomFooter}>
            <TouchableOpacity activeOpacity={0.7}>
              <SvgXml xml={perryIcon} width={76.27} height={30} />
            </TouchableOpacity>
            <Text style={styles.copyright}>
              © 2024 Du Soleil. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isNameModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsNameModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change name</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>First name</Text>
              <TextInput
                style={styles.modalInput}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter new first name"
                placeholderTextColor="#A3AED0"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Last name</Text>
              <TextInput
                style={styles.modalInput}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter new last name"
                placeholderTextColor="#A3AED0"
              />
            </View>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setIsNameModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={handleSaveName}
                activeOpacity={0.7}
              >
                <Text style={styles.modalSaveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isEmailModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsEmailModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.emailModalBox}>
            <Text style={styles.changeEmailHeaderTitle}>Change email</Text>

            <Text style={styles.emailDescriptionText}>
              Your current email is{' '}
              <Text style={styles.emailHighlightText}>{localUserEmail}</Text>.
            </Text>

            <Text style={styles.emailDescriptionText}>
              To change it, enter a new email, then click “Send code” and enter it in corresponding prompt.
            </Text>

            <View style={styles.inputContainerWithMargin}>
              <View style={[styles.emailInputWrapper, styles.inputErrorBorder]}>
                <View style={styles.notchContainer}>
                  <Text style={[styles.notchLabel, styles.errorText]}>Password</Text>
                </View>
                <TextInput
                  style={styles.emailPasswordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#A3AED0"
                  value={emailPassword}
                  onChangeText={setEmailPassword}
                  secureTextEntry={!showEmailPassword}
                />
                <TouchableOpacity
                  style={styles.emailEyeBtn}
                  onPress={() => setShowEmailPassword(!showEmailPassword)}
                  activeOpacity={0.7}
                >
                  <SvgXml
                    xml={showEmailPassword ? eyeOpenIcon : eyeClosedIcon}
                    width={22}
                    height={22}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.errorTextMessage}>This field is required to be filled first</Text>
            </View>

            <View style={styles.codeSubCard}>
              <View style={styles.codeInputsRow}>
                {codeDigits.map((digit, idx) => (
                  <TextInput
                    key={idx}
                    style={styles.digitBox}
                    value={digit}
                    onChangeText={(val) => handleCodeDigitChange(val, idx)}
                    keyboardType="number-pad"
                    maxLength={1}
                  />
                ))}
              </View>

              <Text style={styles.errorTextMessage}>Incorrect code, try again</Text>
              <Text style={styles.resendCodeText}>Resend code 0:59</Text>
            </View>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.emailCancelBtn}
                onPress={() => setIsEmailModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.emailCancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.emailLogoutBtn}
                onPress={handleOpenLogoutModal}
                activeOpacity={0.7}
              >
                <Text style={styles.emailLogoutBtnText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isPasswordModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPasswordModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter password</Text>
            <Text style={styles.modalSubtitle}>
              Firstly, enter your current password to confirm this is you.
            </Text>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, styles.errorText]}>Password</Text>
              <TextInput
                style={[styles.modalInputWithIcon, styles.inputErrorBorder]}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter your password"
                placeholderTextColor="#A3AED0"
                secureTextEntry={!showCurrentPassword}
              />
              <TouchableOpacity
                style={styles.eyeIconContainer}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                activeOpacity={0.7}
              >
                <SvgXml
                  xml={showCurrentPassword ? eyeOpenIcon : eyeClosedIcon}
                  width={24}
                  height={24}
                />
              </TouchableOpacity>
              <Text style={styles.errorTextMessage}>This field is necessary to continue!</Text>
            </View>

            <Text style={[styles.modalTitle, { marginTop: 8 }]}>Change password</Text>
            <Text style={styles.modalSubtitle}>
              Enter new password for your account.
            </Text>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, styles.errorText]}>New password</Text>
              <TextInput
                style={[styles.modalInputWithIcon, styles.inputErrorBorder]}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                placeholderTextColor="#A3AED0"
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity
                style={styles.eyeIconContainer}
                onPress={() => setShowNewPassword(!showNewPassword)}
                activeOpacity={0.7}
              >
                <SvgXml
                  xml={showNewPassword ? eyeOpenIcon : eyeClosedIcon}
                  width={24}
                  height={24}
                />
              </TouchableOpacity>
              <Text style={styles.errorTextMessage}>
                Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and be at least 8 characters long
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, styles.errorText]}>Repeat password</Text>
              <TextInput
                style={[styles.modalInputWithIcon, styles.inputErrorBorder]}
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                placeholder="Repeat new password"
                placeholderTextColor="#A3AED0"
                secureTextEntry={!showRepeatPassword}
              />
              <TouchableOpacity
                style={styles.eyeIconContainer}
                onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                activeOpacity={0.7}
              >
                <SvgXml
                  xml={showRepeatPassword ? eyeOpenIcon : eyeClosedIcon}
                  width={24}
                  height={24}
                />
              </TouchableOpacity>
              <Text style={styles.errorTextMessage}>Passwords don't match</Text>
            </View>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setIsPasswordModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalLogoutButton}
                onPress={handleOpenLogoutModal}
                activeOpacity={0.7}
              >
                <Text style={styles.modalLogoutButtonText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isLogoutModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.logoutModalBox}>
            <Text style={styles.logoutTitle}>Log out</Text>
            <Text style={styles.logoutSubtitle}>
              Are you sure you want to log out?
            </Text>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.logoutCancelBtn}
                onPress={() => setIsLogoutModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.logoutCancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutConfirmBtn}
                onPress={handleConfirmLogout}
                activeOpacity={0.7}
              >
                <Text style={styles.logoutConfirmBtnText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModalBox}>
            <Text style={styles.deleteModalTitle}>Delete account?</Text>

            <Text style={styles.deleteModalText}>
              This action will permanently remove your profile and correlated data.
            </Text>

            <Text style={styles.deleteModalText}>
              Once clicked, all associated information, including orders, wishlisted items, and settings, is irreversibly erased from the system.
            </Text>

            <Text style={styles.deleteModalQuestion}>
              Do you wish to proceed?
            </Text>

            <View style={styles.deleteModalButtonsRow}>
              <TouchableOpacity
                style={styles.deleteCancelBtn}
                onPress={() => setIsDeleteModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.deleteCancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteConfirmBtn}
                onPress={handleConfirmDeleteAccount}
                activeOpacity={0.7}
              >
                <Text style={styles.deleteConfirmBtnText}>Delete account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#4A7BD9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 20,
    position: 'absolute',
    width: '100%',
    height: 52,
    top: 0,
    backgroundColor: '#4A7BD9',
    zIndex: 10,
  },
  menuButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    color: '#F2F4F8',
    fontSize: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    gap: 12,
    flex: 1,
    maxWidth: 254,
    height: 32,
    backgroundColor: '#F4FAFF',
    borderRadius: 4,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    height: 32,
    paddingVertical: 0,
    fontFamily: 'Mulish',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.24,
    color: '#0E2042',
  },
  searchActionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 32,
    backgroundColor: '#B8EA48',
  },
  cartButton: {
    width: 32,
    height: 32,
    padding: 6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginTop: 52,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  whiteSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
    width: '100%',
  },
  headerTitleSection: {
    marginBottom: 20,
    gap: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontFamily: 'Mulish',
    fontSize: 16,
    lineHeight: 24,
    color: '#0E2042',
  },
  pageTitle: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 28,
    lineHeight: 32,
    color: '#0E2042',
    letterSpacing: -0.42,
  },
  settingsList: {
    gap: 8,
  },
  card: {
    padding: 12,
    borderRadius: 4,
    gap: 16,
  },
  coloredCard: {
    backgroundColor: '#F4FAFF',
  },
  cardInfo: {
    gap: 4,
  },
  cardTitle: {
    fontFamily: 'Mulish',
    fontSize: 16,
    lineHeight: 20,
    color: '#0E2042',
    letterSpacing: 0.32,
  },
  cardDescription: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 18,
    color: 'rgba(14, 32, 66, 0.5)',
    letterSpacing: 0.28,
  },
  actionRight: {
    alignItems: 'flex-end',
  },
  actionRightCol: {
    alignItems: 'flex-end',
    gap: 8,
  },
  valueText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 18,
    color: '#0E2042',
    textAlign: 'right',
    letterSpacing: 0.28,
  },
  secondaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2.5,
    borderColor: '#4A7BD9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 34,
  },
  secondaryButtonText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 18,
    color: '#0E2042',
    textAlign: 'center',
    letterSpacing: 0.28,
  },
  destructiveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2.5,
    borderColor: '#EA4848',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 34,
  },
  destructiveButtonText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 18,
    color: '#0E2042',
    textAlign: 'center',
    letterSpacing: 0.28,
  },
  footerContainer: {
    marginTop: 0,
  },
  topFooter: {
    backgroundColor: '#4A7BD9',
    paddingHorizontal: 25,
    paddingTop: 5,
    paddingBottom: 10,
  },
  footerHeader: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Mulish',
    marginTop: 15,
    marginBottom: 10,
  },
  footerLink: {
    color: '#E0E0E0',
    fontSize: 14,
    fontFamily: 'Mulish',
    marginBottom: 8,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 12,
    marginBottom: 15,
  },
  bottomFooter: {
    backgroundColor: '#2555A8',
    paddingHorizontal: 25,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyright: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'Mulish',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  modalContent: {
    width: '100%',
    backgroundColor: '#F4FAFF',
    borderRadius: 8,
    padding: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    color: '#0E2042',
  },
  modalSubtitle: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 18,
    color: '#0E2042',
    marginBottom: 4,
  },
  inputContainer: {
    position: 'relative',
    marginTop: 4,
  },
  inputLabel: {
    position: 'absolute',
    top: -9,
    left: 12,
    backgroundColor: '#F4FAFF',
    paddingHorizontal: 4,
    fontFamily: 'Mulish',
    fontSize: 12,
    color: '#0E2042',
    zIndex: 1,
  },
  modalInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#4A7BD9',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontFamily: 'Mulish',
    fontSize: 14,
    color: '#0E2042',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 12,
  },
  modalCancelButton: {
    flex: 1,
    height: 40,
    borderWidth: 2,
    borderColor: '#4A7BD9',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  modalCancelButtonText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    color: '#0E2042',
    fontWeight: '600',
  },
  modalSaveButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#B8EA48',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSaveButtonText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    color: '#0E2042',
    fontWeight: '600',
  },

  emailModalBox: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#F4FAFF',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#4A7BD9',
    padding: 16,
    gap: 12,
  },
  changeEmailHeaderTitle: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 22,
    color: '#0E2042',
    marginBottom: 2,
  },
  emailDescriptionText: {
    fontFamily: 'Mulish',
    fontSize: 13,
    lineHeight: 18,
    color: '#3B4861',
  },
  emailHighlightText: {
    color: '#4A7BD9',
    fontWeight: '500',
  },
  inputContainerWithMargin: {
    marginTop: 6,
    marginBottom: 4,
  },
  emailInputWrapper: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#0E2042',
    borderRadius: 6,
    height: 42,
    justifyContent: 'center',
    backgroundColor: '#F4FAFF',
  },
  notchContainer: {
    position: 'absolute',
    top: -9,
    left: 10,
    backgroundColor: '#F4FAFF',
    paddingHorizontal: 4,
    zIndex: 2,
  },
  notchLabel: {
    fontFamily: 'Mulish',
    fontSize: 11,
    color: '#0E2042',
  },
  emailPasswordInput: {
    paddingLeft: 12,
    paddingRight: 40,
    fontFamily: 'Mulish',
    fontSize: 13,
    color: '#0E2042',
  },
  emailEyeBtn: {
    position: 'absolute',
    right: 10,
    zIndex: 3,
  },
  codeSubCard: {
    borderWidth: 1,
    borderColor: '#4A7BD9',
    borderStyle: 'dashed',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    gap: 8,
  },
  codeInputsRow: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    marginBottom: 4,
  },
  digitBox: {
    width: 32,
    height: 38,
    borderWidth: 1,
    borderColor: '#0E2042',
    borderRadius: 4,
    textAlign: 'center',
    fontFamily: 'Mulish',
    fontSize: 15,
    color: '#0E2042',
    backgroundColor: '#FFFFFF',
  },
  resendCodeText: {
    fontFamily: 'Mulish',
    fontSize: 13,
    fontWeight: '600',
    color: '#0E2042',
    marginTop: 2,
  },
  emailCancelBtn: {
    flex: 1,
    height: 38,
    borderWidth: 2,
    borderColor: '#4A7BD9',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  emailCancelBtnText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    fontWeight: '600',
    color: '#0E2042',
  },
  emailLogoutBtn: {
    flex: 1,
    height: 38,
    backgroundColor: '#B8EA48',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailLogoutBtnText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    fontWeight: '600',
    color: '#0E2042',
  },

  modalInputWithIcon: {
    height: 44,
    borderWidth: 1,
    borderColor: '#4A7BD9',
    borderRadius: 6,
    paddingLeft: 12,
    paddingRight: 44,
    fontFamily: 'Mulish',
    fontSize: 14,
    color: '#0E2042',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 2,
  },
  modalLogoutButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#B8EA48',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalLogoutButtonText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    color: '#0E2042',
    fontWeight: '600',
  },

  logoutModalBox: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#F4FAFF',
    borderColor: '#F4FAFF',
    borderRadius: 6,
    borderWidth: 1.5,
    padding: 20,
    gap: 12,
  },
  logoutTitle: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 22,
    color: '#0E2042',
  },
  logoutSubtitle: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 20,
    color: '#3B4861',
    marginBottom: 8,
  },
  logoutCancelBtn: {
    flex: 1,
    height: 40,
    borderWidth: 2,
    borderColor: '#4A7BD9',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logoutCancelBtnText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    fontWeight: '600',
    color: '#0E2042',
  },
  logoutConfirmBtn: {
    flex: 1,
    height: 40,
    backgroundColor: '#B8EA48',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutConfirmBtnText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    fontWeight: '600',
    color: '#0E2042',
  },

  deleteModalBox: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#F4FAFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D8E2F0',
    padding: 24,
    gap: 16,
    alignItems: 'center',
  },
  deleteModalTitle: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 28,
    color: '#0E2042',
    textAlign: 'center',
  },
  deleteModalText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 20,
    color: '#0E2042',
    textAlign: 'center',
  },
  deleteModalQuestion: {
    fontFamily: 'Mulish',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    color: '#0E2042',
    textAlign: 'center',
    marginTop: 4,
  },
  deleteModalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
    marginTop: 8,
  },
  deleteCancelBtn: {
    flex: 1,
    height: 44,
    backgroundColor: '#B8EA48',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteCancelBtnText: {
    fontFamily: 'Mulish',
    fontSize: 15,
    fontWeight: '600',
    color: '#0E2042',
  },
  deleteConfirmBtn: {
    flex: 1,
    height: 44,
    backgroundColor: '#F4FAFF',
    borderWidth: 2,
    borderColor: '#EA4848',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteConfirmBtnText: {
    fontFamily: 'Mulish',
    fontSize: 15,
    fontWeight: '600',
    color: '#0E2042',
  },

  inputErrorBorder: {
    borderColor: '#EA4848',
  },
  errorText: {
    color: '#EA4848',
  },
  errorTextMessage: {
    fontFamily: 'Mulish',
    fontSize: 11,
    lineHeight: 14,
    color: '#EA4848',
    marginTop: 4,
  },
});