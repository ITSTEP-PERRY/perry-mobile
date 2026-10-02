import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const logoIcon = `<svg width="65" height="16" viewBox="0 0 65 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M49.949 15.7734C49.7133 15.7734 49.4867 15.6827 49.3054 15.5014L42.5065 8.43059C42.2436 8.1677 42.1711 7.7779 42.3071 7.43342C42.4431 7.08895 42.7785 6.87138 43.1411 6.86232C45.5705 6.85325 46.5768 6.29122 47.0028 5.81983C47.3201 5.46629 47.447 5.00396 47.3836 4.41473C47.2476 2.96431 45.9241 1.83116 44.3739 1.83116H39.4153C38.9167 1.83116 38.5088 1.42323 38.5088 0.915581C38.5088 0.407932 38.9167 0 39.4153 0H44.3739C46.8487 0 48.97 1.86742 49.1875 4.25156C49.2873 5.35751 48.9972 6.32748 48.3445 7.06175C47.7371 7.73258 46.8578 8.20396 45.6793 8.45779C45.4708 8.50311 45.3892 8.75694 45.5343 8.91104L50.5745 14.2051C50.928 14.5586 50.928 15.1388 50.5745 15.5014C50.4113 15.6827 50.1756 15.7734 49.949 15.7734ZM5.86516 0.00906536H0.906516C0.407932 0.00906536 0 0.426063 0 0.933711V14.8578C0 15.3654 0.407932 15.7824 0.906516 15.7824C1.4051 15.7824 1.81303 15.3654 1.81303 14.8578V2.13031C1.81303 1.9762 1.93994 1.84929 2.08499 1.84929H5.85609C7.40623 1.84929 8.72975 2.9915 8.86572 4.45099C8.92011 5.04929 8.7932 5.51161 8.48499 5.86515C8.06799 6.33654 7.05269 6.89858 4.62323 6.91671C4.12465 6.91671 3.71671 7.33371 3.72578 7.84136C3.72578 8.349 4.13371 8.75694 4.6323 8.75694C7.15241 8.74787 8.84759 8.20396 9.82663 7.09801C10.4793 6.36374 10.7785 5.3847 10.6697 4.26969C10.4612 1.88555 8.34901 0.00906536 5.86516 0.00906536ZM63.3382 0.00906536C62.8397 0.00906536 62.4317 0.435127 62.4317 0.95184V5.84702C62.4317 6.39093 62.4408 6.34561 62.4317 6.74447C62.4227 7.02549 62.2504 7.14334 62.0419 7.18867C60.655 7.29745 58.3887 7.46062 56.9292 6.93484C54.8986 6.20056 54.7445 4.1881 54.7445 1.1966V0.960906C54.7445 0.435127 54.3365 0.0181307 53.838 0.0181307C53.3394 0.0181307 52.9314 0.444192 52.9314 0.960906V1.1966C52.9314 3.85269 52.9224 7.49688 56.3309 8.72068C57.2646 9.05609 58.4521 9.17393 59.7394 9.17393C60.5009 9.17393 61.3077 9.12861 62.1054 9.07422C62.2686 9.06515 62.3955 9.19206 62.3955 9.35524C62.3955 9.82662 62.3955 10.3977 62.3955 11.0957C62.3955 11.7122 62.1507 12.247 61.6703 12.7093C60.8 13.5433 59.2227 14.0057 57.736 13.8606C56.1586 13.7065 55.089 12.945 54.3728 11.4493C54.1462 10.9779 53.6023 10.7966 53.1581 11.0232C52.7139 11.2589 52.5326 11.821 52.7501 12.2923C53.7473 14.3683 55.37 15.5286 57.5728 15.7462C57.8176 15.7734 58.0623 15.7824 58.3071 15.7824C60.0748 15.7824 61.7881 15.166 62.9031 14.1144C63.7643 13.2895 64.2266 12.2561 64.2266 11.1048C64.2266 8.64816 64.2357 7.78697 64.2448 7.13428C64.2448 6.73541 64.2538 6.40906 64.2538 5.86515V0.969971C64.2448 0.426062 63.8368 0.00906536 63.3382 0.00906536ZM33.2057 9.02889C33.0516 8.87478 33.1331 8.61189 33.3507 8.56657C34.5292 8.30368 35.4085 7.83229 36.0159 7.1524C36.6686 6.40906 36.9677 5.43003 36.8589 4.30595C36.6323 1.89462 34.5201 0.00906536 32.0453 0.00906536H27.0867C26.5881 0.00906536 26.1802 0.426063 26.1802 0.933711V14.8487C26.1802 15.3654 26.5881 15.7734 27.0867 15.7734C27.5853 15.7734 27.9932 15.3564 27.9932 14.8487V2.14844C27.9932 1.99433 28.1201 1.86742 28.2652 1.86742H32.0363C33.5864 1.86742 34.9099 3.0187 35.0459 4.48725C35.1003 5.09462 34.9734 5.55694 34.6652 5.91048C34.2482 6.38187 33.2329 6.95297 30.8034 6.96204C30.4408 6.96204 30.1054 7.18866 29.9694 7.53314C29.8334 7.87762 29.9059 8.27648 30.1688 8.53937L36.9677 15.4923C37.3212 15.855 37.8923 15.855 38.2459 15.4923C38.5994 15.1297 38.5994 14.5405 38.2459 14.1779L33.2057 9.02889Z" fill="#4A7BD9"/>
</svg>`;

const letterEIcon = `<svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8391 14.5224V15.0663C11.8391 15.4198 11.5581 15.7008 11.2045 15.7008H0.643625C0.290084 15.7008 0.00906536 15.4198 0.00906536 15.0663V14.5224C0.00906536 14.1688 0.290084 13.8878 0.643625 13.8878H11.2045C11.549 13.8788 11.8391 14.1688 11.8391 14.5224ZM11.2045 6.93484H0.643625C0.290084 6.93484 0.00906536 7.21586 0.00906536 7.5694V8.11331C0.00906536 8.46686 0.290084 8.74787 0.643625 8.74787H11.2045C11.5581 8.74787 11.8391 8.46686 11.8391 8.11331V7.5694C11.8391 7.22493 11.5581 6.93484 11.2045 6.93484ZM11.1955 0H0.634562C0.28102 0 0 0.28102 0 0.634561V1.17847C0 1.53201 0.28102 1.81303 0.634562 1.81303H11.1955C11.549 1.81303 11.83 1.53201 11.83 1.17847V0.634561C11.83 0.28102 11.549 0 11.1955 0Z" fill="#4A7BD9"/>
</svg>`;

const defaultAvatar = 'https://media.licdn.com/dms/image/v2/D4D03AQHb9qubRl69Cg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1723113428087?e=2147483647&v=beta&t=YnvZ7Jda-CX2cdC5YjvwC0x0NM69TuYo3mV2120wTqk';
const guestAvatar = 'https://media.licdn.com/dms/image/v2/D560BAQFDOEPT527ilw/company-logo_200_200/company-logo_200_200/0/1705441552705/eddy_energy_llc_logo?e=2147483647&v=beta&t=5D6Br89WTWP5DmJa3NQhr3S3kfG1KPHK5UNdIMWxIiU';

const closeIcon = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3999 10.4004L21.2045 21.205" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M21.2046 10.4004L10.4 21.205" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
</svg>`;

const catalogIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.0321 3.20312H6.6601C4.64206 3.20312 3.0061 4.83908 3.0061 6.85713V7.22913C3.0061 9.24717 4.64206 10.8831 6.6601 10.8831H7.0321C9.05015 10.8831 10.6861 9.24717 10.6861 7.22913V6.85713C10.6861 4.83908 9.05015 3.20312 7.0321 3.20312Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.5901 3.20312H14.7301C13.9513 3.20312 13.3201 3.8344 13.3201 4.61312V9.47312C13.3201 10.2518 13.9513 10.8831 14.7301 10.8831H19.5901C20.3688 10.8831 21.0001 10.2518 21.0001 9.47312V4.61312C21.0001 3.8344 20.3688 3.20312 19.5901 3.20312Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.2761 13.1152H4.4161C3.63738 13.1152 3.0061 13.7465 3.0061 14.5252V19.3852C3.0061 20.164 3.63738 20.7952 4.4161 20.7952H9.2761C10.0548 20.7952 10.6861 20.164 10.6861 19.3852V14.5252C10.6861 13.7465 10.0548 13.1152 9.2761 13.1152Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M17.3461 13.1152H16.9741C14.956 13.1152 13.3201 14.7512 13.3201 16.7692V17.1412C13.3201 19.1593 14.956 20.7952 16.9741 20.7952H17.3461C19.3641 20.7952 21.0001 19.1593 21.0001 17.1412V16.7692C21.0001 14.7512 19.3641 13.1152 17.3461 13.1152Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const arrowIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.168 5.8125L8.62403 11.1285C8.27203 11.4685 7.71203 11.4685 7.36003 11.1285L1.83203 5.8125" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const settingsIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.6781 4.20508H8.3161C7.8121 4.20508 7.3441 4.47508 7.0921 4.91308L3.4141 11.2851C3.1621 11.7231 3.1621 12.2631 3.4141 12.7011L7.0921 19.0731C7.3441 19.5111 7.8121 19.7811 8.3161 19.7811H15.6781C16.1821 19.7811 16.6501 19.5111 16.9021 19.0731L20.5801 12.7011C20.8321 12.2631 20.8321 11.7231 20.5801 11.2851L16.9021 4.91308C16.6501 4.47508 16.1821 4.20508 15.6781 4.20508Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 14.7602C13.5243 14.7602 14.76 13.5245 14.76 12.0002C14.76 10.4759 13.5243 9.24023 12 9.24023C10.4757 9.24023 9.23999 10.4759 9.23999 12.0002C9.23999 13.5245 10.4757 14.7602 12 14.7602Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const helpIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21 8.27411C21 6.27611 19.38 4.66211 17.388 4.66211H6.612C4.614 4.66211 3 6.28211 3 8.27411V13.9141C3 15.9121 4.62 17.5261 6.612 17.5261H15.042C15.636 17.5261 16.218 17.6461 16.764 17.8861L19.986 19.2841C20.466 19.4941 21 19.1401 21 18.6181V11.8141" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.5481 8.89185C10.6261 7.83585 11.9701 7.40985 12.7501 7.85385C13.1221 8.06385 13.3801 8.46585 13.4401 8.89185C13.5061 9.37785 13.2781 9.80385 12.9721 10.1698C12.3541 10.9138 11.8201 11.6338 12.0241 12.6658" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 14.4004H12.006" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const exitIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.042 17.274V19.638C18.042 20.346 17.472 20.916 16.764 20.916H6.37199C5.66399 20.916 5.09399 20.346 5.09399 19.638V4.36198C5.09399 3.65398 5.66399 3.08398 6.37199 3.08398H16.77C17.478 3.08398 18.048 3.65398 18.048 4.36198V6.72598" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15.4319 8.03906L18.7499 11.4951C18.9599 11.7171 18.9599 12.0651 18.7499 12.2811L15.4379 15.7311" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const fashionIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.40216 12.4318L3.64816 15.6838C2.83816 16.1398 2.76616 17.3218 3.55216 17.8138C3.75016 17.9398 3.98416 18.0118 4.24816 18.0118H15.6962H19.7402C20.0042 18.0118 20.2382 17.9398 20.4362 17.8138C21.2222 17.3218 21.1502 16.1398 20.3402 15.6838L19.4882 15.2038C17.0762 13.8478 14.6282 12.8218 12.2822 11.4778C11.8862 11.2498 11.2442 10.8238 11.1722 10.7098C10.5122 9.71377 12.5882 9.90577 13.4222 8.99977C14.6642 7.65577 13.3082 6.03577 12.1802 5.99377C11.1122 5.95177 10.3022 6.74977 10.3262 7.73377" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const electronicsIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 13.8594H5.43604V10.1934" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 6.52734H18.564V10.1933" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.5059 4.36133H4.49986C3.67475 4.36133 3.00586 5.03021 3.00586 5.85533V14.5313C3.00586 15.3564 3.67475 16.0253 4.49986 16.0253H19.5059C20.331 16.0253 20.9999 15.3564 20.9999 14.5313V5.85533C20.9999 5.03021 20.331 4.36133 19.5059 4.36133Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.34619 19.6387H15.6542" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round"/>
<path d="M12 16.0254V19.6374" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const householdIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.85 11.2131L8.25002 18.8631C7.78202 19.8531 8.50802 20.9931 9.60002 20.9931H18.834C19.92 20.9931 20.64 19.8771 20.196 18.8871L16.59 10.8711" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.09002 5.94003V7.08603C6.09002 7.47003 5.77802 7.78203 5.39402 7.78203H4.36202C3.97802 7.78203 3.66602 7.47003 3.66602 7.08603V4.84203C3.66602 4.45803 3.97802 4.14603 4.36202 4.14603H4.38602C5.34002 4.14603 6.27602 3.93003 7.17002 3.58203C10.158 2.42403 13.866 3.30003 15.282 3.72003C15.612 3.81603 15.816 4.14003 15.768 4.48203C15.534 6.04203 15.66 7.78203 15.768 8.76003C15.816 9.17403 15.492 9.52803 15.078 9.52803H12.21C12.102 9.52803 12 9.50403 11.904 9.45603L8.11202 7.57803L6.33002 10.302C6.12602 10.614 6.34802 11.028 6.72002 11.028H8.16002C8.31602 11.028 8.46002 10.95 8.54402 10.824L9.09002 10.032" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const furnitureIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7561 15.9305V11.3765C15.7561 11.0645 16.0081 10.8125 16.3201 10.8125H20.4361C20.7481 10.8125 21.0001 11.0645 21.0001 11.3765V18.8765C21.0001 19.1885 20.7481 19.4405 20.4361 19.4405H15.7141H8.28014H3.55814C3.24614 19.4405 2.99414 19.1885 2.99414 18.8765V11.3765C2.99414 11.0645 3.24614 10.8125 3.55814 10.8125H7.67414C7.98614 10.8125 8.23814 11.0645 8.23814 11.3765V15.9305" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.35205 9.10255V5.40055C5.35205 4.93855 5.64605 4.56055 6.00605 4.56055H18.0001C18.3601 4.56055 18.6541 4.93255 18.6541 5.40055V9.10255" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.146 12.3359H13.854" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round"/>
<path d="M10.146 14.9395H13.854" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const worktoolsIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.2642 10.2302C9.1202 10.2902 9.0302 10.4342 9.0302 10.5842V11.6882C9.0302 12.0422 8.5922 12.2162 8.3522 11.9462L5.3522 8.59824C5.1302 8.34624 5.3042 7.95024 5.6402 7.95024H6.7262C6.8102 7.95024 6.8942 7.92024 6.9602 7.87224L11.1122 4.72224C11.7722 4.22424 12.5402 3.88224 13.3562 3.73824L13.8722 3.64224C14.4182 3.54624 14.8622 4.07424 14.6642 4.59024L14.6102 4.73424C14.4002 5.29224 14.3522 5.90424 14.4722 6.48624L14.9342 8.71224C15.0362 9.21024 14.8082 9.71424 14.3702 9.96624L13.3442 10.5602C13.1642 10.6622 12.9122 10.6622 12.6662 10.5962C12.3122 10.5062 12.0062 10.2962 11.7662 10.0202L10.3442 8.39424" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.6558 12.3236L18.3358 19.6976C18.5998 20.1176 19.0618 20.3696 19.5538 20.3696C20.3518 20.3696 20.9938 19.7216 20.9938 18.9296V17.4596C20.9938 17.1356 20.8858 16.8176 20.6818 16.5656L16.0918 10.9316" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.38818 20.3701V15.2461" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round"/>
<path d="M3.8042 14.9648H6.9722" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

interface MenuScreenProps {
  isAuthenticated?: boolean;
  userProfile?: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  onClose?: () => void;
  onLoginPress?: () => void;
  navigation?: any;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  isAuthenticated = false,
  userProfile = {
    name: 'Marsha Shields',
    role: 'Customer',
  },
  onClose,
  onLoginPress,
}) => {
  const navigation = useNavigation<any>();
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [testAuthState, setTestAuthState] = useState(isAuthenticated);

  const isUserLoggedIn = Boolean(testAuthState);


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.topBar}>
          <TouchableOpacity 
            style={styles.devToggleBtn} 
            onPress={() => setTestAuthState(!testAuthState)}
          >
            <Text style={styles.devToggleText}>
              [DEV] {isUserLoggedIn ? 'User' : 'Guest'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <SvgXml xml={closeIcon} width="24" height="24" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {isUserLoggedIn ? (
            <View style={styles.profileSection}>
              <View style={styles.avatarPlaceholder}>
                <Image
                  source={{ uri: userProfile?.avatarUrl || defaultAvatar }}
                  style={styles.avatarImg}
                />
              </View>
              <Text style={styles.userName}>{userProfile.name}</Text>
              <Text style={styles.userRole}>{userProfile.role}</Text>
            </View>
          ) : (
            <View style={styles.guestSection}>
              <View style={styles.guestAvatarPlaceholder}> 
                <Image source={{ uri: guestAvatar }} style={styles.avatarImg} />
              </View>
              <Text style={styles.guestTitle}>Not signed in</Text>
              <Text style={styles.guestSubtitle}>
                Log in to enjoy a more pleasant experience
              </Text>
              <TouchableOpacity style={styles.primaryAuthBtn} onPress={onLoginPress}>
                <Text style={styles.primaryAuthBtnText}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryAuthBtn}>
                <Text style={styles.secondaryAuthBtnText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setIsCatalogOpen(!isCatalogOpen)}
          >
            <View style={styles.menuItemLeft}>
              <SvgXml xml={catalogIcon} width="24" height="24" style={styles.iconSpacing} />
              <Text style={styles.menuText}>Product catalog</Text>
            </View>
            <SvgXml
              xml={arrowIcon}
              width="16"
              height="16"
              style={{ transform: [{ rotate: isCatalogOpen ? '180deg' : '0deg' }] }}
            />
          </TouchableOpacity>

          {isCatalogOpen && (
            <View style={styles.subMenuContainer}>
              <TouchableOpacity style={styles.subMenuItem}>
                <SvgXml xml={fashionIcon} width="24" height="24" style={styles.iconSpacing} />
                <Text style={styles.subMenuText}>Fashion</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.subMenuItem}>
                <SvgXml xml={electronicsIcon} width="24" height="24" style={styles.iconSpacing} />
                <Text style={styles.subMenuText}>Electronics</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.subMenuItem}>
                <SvgXml xml={householdIcon} width="24" height="24" style={styles.iconSpacing} />
                <Text style={styles.subMenuText}>Household</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.subMenuItem}>
                <SvgXml xml={furnitureIcon} width="24" height="24" style={styles.iconSpacing} />
                <Text style={styles.subMenuText}>Furniture</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.subMenuItem}>
                <SvgXml xml={worktoolsIcon} width="24" height="24" style={styles.iconSpacing} />
                <Text style={styles.subMenuText}>Work tools</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.seeAllBtn}>
                <Text style={styles.seeAllBtnText}>See all</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.divider} />

          {isUserLoggedIn ? (
            <>
              <TouchableOpacity style={styles.menuItem} onPress={() => {
              onClose?.(); 
              navigation.navigate('AccountSettings'); 
            }}
            >
              <View style={styles.menuItemLeft}>
            <SvgXml xml={settingsIcon} width="24" height="24" style={styles.iconSpacing} />
          <Text style={styles.menuText}>Settings</Text>
        </View>
      </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <SvgXml xml={helpIcon} width="24" height="24" style={styles.iconSpacing} />
                  <Text style={styles.menuText}>Help & FAQ</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <SvgXml xml={exitIcon} width="24" height="24" style={styles.iconSpacing} />
                  <Text style={styles.menuText}>Exit</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <SvgXml xml={helpIcon} width="24" height="24" style={styles.iconSpacing} />
                <Text style={styles.menuText}>Help & FAQ</Text>
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.fullLogoWrapper}>
            <View style={styles.logoContainer}>
              <SvgXml xml={logoIcon} width="65" height="16" />
            </View>
            <View style={styles.letterEWrapper}>
              <SvgXml xml={letterEIcon} width="12" height="16" />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4FAFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F4FAFF',
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  devToggleBtn: {
    backgroundColor: '#4A7BD9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  devToggleText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#CCDDFF',
    marginBottom: 8,
    elevation: 5,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    resizeMode: 'cover',
  },
  userName: {
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: 16,
    color: '#0E2042',
    marginTop: 4,
  },
  userRole: {
    fontFamily: 'Mulish',
    fontSize: 12,
    color: 'rgba(14, 32, 66, 0.6)',
  },
  guestSection: {
    marginBottom: 16,
  },
  guestAvatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#CCDDFF',
    marginBottom: 8,
  },
  guestTitle: {
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: 16,
    color: '#0E2042',
  },
  guestSubtitle: {
    fontFamily: 'Mulish',
    fontSize: 12,
    color: 'rgba(14, 32, 66, 0.6)',
    marginBottom: 12,
  },
  primaryAuthBtn: {
    height: 40,
    backgroundColor: '#B8EA48',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  primaryAuthBtnText: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    color: '#0E2042',
  },
  secondaryAuthBtn: {
    height: 40,
    borderWidth: 1.5,
    borderColor: '#4A7BD9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryAuthBtnText: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    color: '#4A7BD9',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#CCDDFF',
    marginVertical: 12,
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginRight: 12,
  },
  menuText: {
    fontFamily: 'Mulish',
    fontSize: 16,
    fontWeight: '500',
    color: '#0E2042',
  },
  subMenuContainer: {
    paddingLeft: 0,
    gap: 8,
    marginVertical: 8,
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  subMenuText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.28, 
    color: '#000000',
  },
  seeAllBtn: {
    height: 36,
    borderWidth: 1.5,
    borderColor: '#4A7BD9',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  seeAllBtnText: {
    fontFamily: 'Mulish',
    fontWeight: '500',
    color: '#4A7BD9',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#CCDDFF',
  },
  fullLogoWrapper: {
    position: 'relative', 
    width: 65,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 65,
    height: 16,
  },
  letterEWrapper: {
    position: 'absolute',
    top: 0,
    left: 11, 
  }
});