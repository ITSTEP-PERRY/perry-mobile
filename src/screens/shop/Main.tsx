import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Product } from '../../types/Product';


const { width } = Dimensions.get('window');

const cartIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 4.30762H5.28C7.29 4.30762 6.714 7.13362 6.426 8.35162C6.036 9.98962 6.156 11.7356 8.106 12.2096C8.496 12.3056 8.898 12.3356 9.294 12.3356H16.218C16.218 12.3356 16.41 12.3356 16.698 12.3716C18.732 12.6176 18.576 15.2816 16.53 15.2996C16.506 15.2996 16.476 15.2996 16.452 15.2996H8.682" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.01855 4.97363H19.9926C20.7906 4.97363 21.2706 5.86763 20.8266 6.53363L18.0366 10.7156" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.75597 19.6921C10.4949 19.6921 11.094 19.0931 11.094 18.3541C11.094 17.6152 10.4949 17.0161 9.75597 17.0161C9.01701 17.0161 8.41797 17.6152 8.41797 18.3541C8.41797 19.0931 9.01701 19.6921 9.75597 19.6921Z" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.4454 19.6921C17.1844 19.6921 17.7834 19.0931 17.7834 18.3541C17.7834 17.6152 17.1844 17.0161 16.4454 17.0161C15.7065 17.0161 15.1074 17.6152 15.1074 18.3541C15.1074 19.0931 15.7065 19.6921 16.4454 19.6921Z" stroke="#F2F4F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const searchActionButton = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 14L11.1 11.1" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const starIcon = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.8301 34.0101C11.4601 35.0001 9.63011 33.6701 10.1501 32.0601L12.3601 25.2401C12.6701 24.2801 12.3301 23.2301 11.5101 22.6401L5.71011 18.4301C4.34011 17.4401 5.05011 15.2801 6.73011 15.2801H13.9001C14.9101 15.2801 15.8001 14.6301 16.1101 13.6701L18.3201 6.85008C18.8401 5.24008 21.1101 5.24008 21.6401 6.85008L23.8501 13.6701C24.1601 14.6301 25.0601 15.2801 26.0601 15.2801H33.2301C34.9201 15.2801 35.6201 17.4401 34.2501 18.4301L28.4501 22.6401C27.6301 23.2301 27.2901 24.2801 27.6001 25.2401L29.8101 32.0601C30.3301 33.6701 28.4901 35.0001 27.1301 34.0101L21.7001 29.6601C20.8801 29.0001 19.7201 28.9801 18.8701 29.5901L12.8001 34.0101H12.8301Z" fill="#0E2042" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const reviewIcon = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9004 15.4702H28.1004" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.9004 21.5103H28.1004" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M35 13.79C35 10.46 32.3 7.77002 28.98 7.77002H11.02C7.69 7.77002 5 10.47 5 13.79V23.19C5 26.52 7.7 29.21 11.02 29.21H25.07C26.06 29.21 27.03 29.41 27.94 29.81L33.31 32.14C34.11 32.49 35 31.9 35 31.03V19.69" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const discountBadge = `<svg width="115" height="78" viewBox="0 0 115 78" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_4071_6059)">
<path d="M8.09598 35.2001C8.06657 34.9562 8.05187 34.7122 8.03716 34.4683C7.09617 18.7944 24.2252 9.63097 36.6345 6.2004C50.4553 2.38866 66.0993 3.37971 78.8762 10.3476C96.4757 19.9532 104.68 40.1859 106.959 59.7477C107.503 64.459 102.533 67.6914 98.7252 65.0537C91.8883 60.3423 85.2573 51.5906 76.8325 49.9592C66.7609 48.0076 57.1452 52.7646 47.5588 55.6615C32.944 60.0679 9.83093 53.8624 8.09598 35.2001Z" fill="#B8EA48"/>
</g>
<defs>
<filter id="filter0_d_4071_6059" x="0" y="0" width="115" height="78" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0316664 0 0 0 0 0.0316664 0 0 0 0 0.0316664 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4071_6059"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4071_6059" result="shape"/>
</filter>
</defs>
</svg>`;

const arrowRight = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.750002" y="39.25" width="38.5" height="38.5" rx="1.91667" transform="rotate(-90 0.750002 39.25)" fill="#F2F4F8"/>
<rect x="0.750002" y="39.25" width="38.5" height="38.5" rx="1.91667" transform="rotate(-90 0.750002 39.25)" stroke="#4A7BD9" stroke-width="1.5"/>
<path d="M16.376 10.8799L24.35 19.1959C24.86 19.7239 24.86 20.5639 24.35 21.0919L16.376 29.3839" stroke="#4A7BD9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const arrowUpIcon = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2.09815e-06" y="48" width="48" height="48" rx="4" transform="rotate(-90 2.09815e-06 48)" fill="#B8EA48"/>
<rect x="2.09815e-06" y="48" width="48" height="48" rx="4" transform="rotate(-90 2.09815e-06 48)" stroke="url(#paint0_linear_3768_6704)"/>
<path d="M33.252 27.8702L24.936 19.8962C24.408 19.3862 23.568 19.3862 23.04 19.8962L14.748 27.8702" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_3768_6704" x1="2.43196e-06" y1="96" x2="48" y2="48" gradientUnits="userSpaceOnUse">
<stop stop-color="#D6FF66"/>
<stop offset="1" stop-color="#9ACC2A"/>
</linearGradient>
</defs>
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

interface MainScreenProps {
  onBackPress?: () => void;
  onMenuPress?: () => void;
  onCartPress?: () => void;
  onLegalNoticePress?: () => void;
  onPrivacyPress?: () => void;
  onLicencePress?: () => void;
  onTermsPress?: () => void;
  onSignInPress?: () => void;
  onLogInPress?: () => void;
}


const TRENDING_PRODUCTS: Product[] = [
  {
    id: '1',
    title: "  Everyday Deadlift Shoes Cross-Trainer..",
    rating: 4,
    reviews: 110,
    price: '$18.99',
    image: require('../../../assets/products/product-shoes.png'),
  },
  {
    id: '2',
    title: "VANLINKER Small Retro Skinny Cat Eyewear",
    rating: 4,
    reviews: 2110,
    price: '$11.99',
    image: require('../../../assets/products/product-glasses.png'),
  },
  {
    id: '3',
    title: "Classic Analog Alarm Clock, 4-inch Super...",
    rating: 4,
    reviews: 114,
    price: '$9.99',
    image: require('../../../assets/products/product-alarm.png'),
  },
  {
    id: '4',
    title: "Zeagoo Women's Casual Summer Shirt",
    rating: 4,
    reviews: 242,
    price: '$38.74',
    image: require('../../../assets/products/product-dress.png'),
  },
  {
    id: '5',
    title: "Fresh Vitamin Nectar Moisture Glow Face Cream",
    rating: 4,
    reviews: 9,
    price: '$27.24',
    oldPrice: '$52.00',
    discountBadge: '- 48%',
    image: require('../../../assets/products/product-cream.png'),
  },
  {
    id: '6',
    title: "SOMALER Women's Cotton Wide Brim Summer Hat",
    rating: 4,
    reviews: 1547,
    price: '$18.99',
    image: require('../../../assets/products/product-hat.png'),
  },
  {
    id: '7',
    title: "Luxurious Green Lingerie Set High-...",
    rating: 3,
    reviews: 50,
    price: '$12.99',
    oldPrice: '$24.00',
    discountBadge: '- 45%',
    image: require('../../../assets/products/sale-lingerie.png'),
  },
  {
    id: '8',
    title: "SOMALER Women's Cotton Wide Brim Summer Hat",
    rating: 4,
    reviews: 1547,
    price: '$18.99',
    image: require('../../../assets/products/product-hat.png'),
  },
];

const SALES: Product[] = [
  {
    id: 's1',
    title: "REORIA Women's Slimming Double Li...",
    rating: 4,
    reviews: 18,
    price: '$14.93',
    oldPrice: '$17.99',
    discountBadge: '- 17%',
    image: require('../../../assets/products/sale-woman.png'),
  },
  {
    id: 's2',
    title: "SOMALER Women's Cotton Wide Brim...",
    rating: 4,
    reviews: 1547,
    price: '$18.99',
    oldPrice: '$14.20',
    discountBadge: '- 17%',
    image: require('../../../assets/products/product-hat.png'),
  },
  {
    id: 's3',
    title: "Hanes Men's Heavyweight Cotto...",
    rating: 4,
    reviews: 1025,
    price: '$15.46',
    oldPrice: '$26.00',
    discountBadge: '- 41%',
    image: require('../../../assets/products/sale-man.png'),
  },
  {
    id: 's4',
    title: "MALACASA LUNA Seriens: 12-Piece Por...",
    rating: 4,
    reviews: 1113,
    price: '$65.99',
    oldPrice: '$85.99',
    discountBadge: '- 23%',
    image: require('../../../assets/products/sale-dishes.png'),
  },
  {
    id: 's5',
    title: "Ninja BN601 Professional Plus Fo...",
    rating: 4,
    reviews: 1341,
    price: '$89.96',
    oldPrice: '$119.95',
    discountBadge: '- 25%',
    image: require('../../../assets/products/sale-blender.png'),
  },
  {
    id: 's6',
    title: "LONDON FOG Women's Single Bre...",
    rating: 4,
    reviews: 1547,
    price: '$119.51',
    oldPrice: '$129.99',
    discountBadge: '- 8%',
    image: require('../../../assets/products/sale-coat.png'),
  },
  {
    id: 's7',
    title: "SHARPIE 1976527 Fine Point Pens, Ass...",
    rating: 4,
    reviews: 660,
    price: '$23.39',
    oldPrice: '$25.99',
    discountBadge: '- 17%',
    image: require('../../../assets/products/sale-pens.png'),
  },
  {
    id: 's8',
    title: "SOMALER Women's Cotton Wide Brim...",
    rating: 4,
    reviews: 1547,
    price: '$18.99',
    oldPrice: '$14.20',
    discountBadge: '- 17%',
    image: require('../../../assets/products/product-hat.png'),
  },
];

const renderFormattedPrice = (priceStr: string) => {
  const parts = priceStr.split('.');
  if (parts.length === 2) {
    return (
      <View style={styles.priceContainer}>
        <Text style={styles.priceMain}>{parts[0]}</Text>
        <Text style={styles.priceSup}>{parts[1]}</Text>
      </View>
    );
  }
  return <Text style={styles.priceMain}>{priceStr}</Text>;
};

const ProductCardItem: React.FC<{ product: Product; cardWidth?: number }> = ({ product, cardWidth }) => {
  return (
    <TouchableOpacity style={[styles.productCard, cardWidth ? { width: cardWidth } : null]}>
      <View style={styles.imageContainer}>
        <Image 
          source={typeof product.image === 'string' ? { uri: product.image } : product.image} 
          style={styles.productImage} 
        />
        {product.discountBadge && (
          <View style={styles.discountBadgeWrapper}>
            <SvgXml xml={discountBadge} width={55} height={37} />
            <Text style={styles.discountBadgeText}>{product.discountBadge}</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.productTitle} numberOfLines={2}>
        {product.title}
      </Text>

      <View style={styles.ratingRow}>
        <View style={styles.iconMetaItem}>
          <SvgXml xml={starIcon} width={16} height={16} />
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>
        <View style={styles.iconMetaItem}>
          <SvgXml xml={reviewIcon} width={16} height={16} />
          <Text style={styles.reviewsText}>{product.reviews}</Text>
        </View>
      </View>

      <View style={styles.priceRow}>
        {renderFormattedPrice(product.price)}
        {product.oldPrice && (
          <Text style={styles.oldPriceText}>{product.oldPrice}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export const MainScreen: React.FC<MainScreenProps> = ({
  onBackPress,
  onMenuPress,
  onCartPress,
  onLegalNoticePress,
  onPrivacyPress,
  onLicencePress,
  onTermsPress,
  onSignInPress,
  onLogInPress,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const mapProductItem = (item: any): Product => ({
    id: String(item.id),
    title: item.title || item.name || 'Without title',
    price: item.price ? `$${item.price.toFixed(2)}` : '$0.00',
    oldPrice: item.oldPrice ? `$${item.oldPrice.toFixed(2)}` : undefined,
    discountBadge: item.discountPercent ? `- ${item.discountPercent}%` : undefined,
    rating: item.rating ?? item.averageRating ?? 0,
    reviews: item.reviewsCount ?? item.reviews ?? 0,
    image: item.imageUrl || item.image || '',
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    console.log('Отправка запроса');

    fetch('http://10.0.2.2:5272/api/Products?pageNumber=1', { signal: controller.signal })
      .then(async (response) => {
        console.log('Ответ от сервера status:', response.status);
        if (!response.ok) {
          throw new Error(`Server status: ${response.status}`);
        }
        
        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : [];
        console.log('Полученные данные:', parsedData);
        return parsedData;
      })
      .then((data) => {
        if (isMounted) {
          const productsList = Array.isArray(data?.items) ? data.items : (Array.isArray(data) ? data : []);

          if (productsList.length > 0) {
            const mappedProducts = productsList.map(mapProductItem);
            setProducts(mappedProducts);
            setHasMore(data.hasNextPage ?? (productsList.length > 0));
          } else {
            console.warn('Массив items пуст! Использован TRENDING_PRODUCTS');
            setProducts(TRENDING_PRODUCTS);
            setHasMore(false);
          }
        }
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;

        console.error('Ошибка при получении товаров:', error.message || error);
        if (isMounted) {
          // setProducts(TRENDING_PRODUCTS);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const loadNextPage = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      console.log(`Загрузка страницы ${nextPage}...`);
      const response = await fetch(`http://10.0.2.2:5272/api/Products?pageNumber=${nextPage}`);
      
      if (!response.ok) {
        throw new Error(`Server status: ${response.status}`);
      }

      const text = await response.text();
      const parsedData = text ? JSON.parse(text) : [];
      const productsList = Array.isArray(parsedData?.items) ? parsedData.items : (Array.isArray(parsedData) ? parsedData : []);

      if (productsList.length > 0) {
        const newMappedProducts = productsList.map(mapProductItem);
        setProducts((prev) => [...prev, ...newMappedProducts]);
        setPage(nextPage);
        setHasMore(parsedData.hasNextPage ?? true);
      } else {
        setHasMore(false);
      }
    } catch (error: any) {
      console.error('Ошибка при загрузке следующей страницы:', error.message || error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const mainScrollRef = useRef<ScrollView>(null);
  const scrollRef1 = useRef<ScrollView>(null);
  const scrollRef2 = useRef<ScrollView>(null);
  const scrollOffset1 = useRef(0);
  const scrollOffset2 = useRef(0);

  const handleScrollToTop = () => {
    mainScrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleScrollLeft = (
    ref: React.RefObject<ScrollView | null>, 
    offsetRef: React.MutableRefObject<number>
  ) => {
    const newOffset = Math.max(0, offsetRef.current - 200);
    ref.current?.scrollTo({ x: newOffset, animated: true });
    offsetRef.current = newOffset;
  };

  const handleScrollRight = (
    ref: React.RefObject<ScrollView | null>, 
    offsetRef: React.MutableRefObject<number>
  ) => {
    const newOffset = offsetRef.current + 200;
    ref.current?.scrollTo({ x: newOffset, animated: true });
    offsetRef.current = newOffset;
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search..." 
            placeholderTextColor="rgba(14, 32, 66, 0.5)" 
          />
          <TouchableOpacity style={styles.searchActionButton}>
            <SvgXml xml={searchActionButton} width={16} height={16} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cartButton} onPress={onCartPress}>
          <SvgXml xml={cartIcon} width={24} height={24} />
        </TouchableOpacity>
      </View>
          
      <ScrollView 
        ref={mainScrollRef}
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bannerContainer}>
          <Image
            source={require('../../../assets/img/banner.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.horizontalScrollWrapper}>
            <TouchableOpacity 
              style={[styles.scrollArrowButton, styles.scrollArrowLeft]} 
              onPress={() => handleScrollLeft(scrollRef1, scrollOffset1)}
            >
              <SvgXml xml={arrowRight} width={32} height={32} style={{ transform: [{ rotate: '180deg' }] }} />
            </TouchableOpacity>

            <ScrollView 
              ref={scrollRef1}
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.categoriesRow}
              onScroll={(e) => { scrollOffset1.current = e.nativeEvent.contentOffset.x; }}
              scrollEventThrottle={16}
            >
              <TouchableOpacity style={styles.categoryCard}>
                <Image source={require('../../../assets/promos/promo-leather.png')} style={styles.categoryImage} />
                <Text style={styles.categoryTitle} numberOfLines={2}>
                  Tools for leather products: favorable price
                </Text>
                <View style={styles.seeAllContainer}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Text style={styles.seeAllArrow}>›</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.categoryCard}>
                <Image source={require('../../../assets/promos/promo-electronics.png')} style={styles.categoryImage} />
                <Text style={styles.categoryTitle} numberOfLines={2}>
                  Electronics with discount: buy time
                </Text>
                <View style={styles.seeAllContainer}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Text style={styles.seeAllArrow}>›</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.categoryCard}>
                <Image source={require('../../../assets/promos/promo-garden.png')} style={styles.categoryImage} />
                <Text style={styles.categoryTitle} numberOfLines={2}>
                  A set of garden tools: bargain price
                </Text>
                <View style={styles.seeAllContainer}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Text style={styles.seeAllArrow}>›</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.categoryCard}>
                <Image source={require('../../../assets/promos/promo-summer-care.png')} style={styles.categoryImage} />
                <Text style={styles.categoryTitle} numberOfLines={2}>
                  Summer care cosmetics: freshness
                </Text>
                <View style={styles.seeAllContainer}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Text style={styles.seeAllArrow}>›</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.categoryCard}>
                <Image source={require('../../../assets/promos/promo-baby-clothes.png')} style={styles.categoryImage} />
                <Text style={styles.categoryTitle} numberOfLines={2}>
                  Baby clothes up to $25: comfort and style
                </Text>
                <View style={styles.seeAllContainer}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Text style={styles.seeAllArrow}>›</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.categoryCard}>
                <Image source={require('../../../assets/promos/promo-women-clothes.png')} style={styles.categoryImage} />
                <Text style={styles.categoryTitle} numberOfLines={2}>
                  Stylish women's clothing: new season
                </Text>
                <View style={styles.seeAllContainer}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Text style={styles.seeAllArrow}>›</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity 
              style={[styles.scrollArrowButton, styles.scrollArrowRight]} 
              onPress={() => handleScrollRight(scrollRef1, scrollOffset1)}
            >
              <SvgXml xml={arrowRight} width={32} height={32} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Trending deals</Text>
          <View style={styles.productsGrid}>
            {(products || []).map((product) => (
              <ProductCardItem key={product.id} product={product} />
            ))}
          </View>

          {hasMore && (
            <TouchableOpacity 
              style={styles.seeAllButton} 
              onPress={loadNextPage} 
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <ActivityIndicator size="small" color="#4A7BD9" />
              ) : (
                <Text style={styles.seeAllButtonText}>See all</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionContainer}>
          <View style={styles.horizontalScrollWrapper}>
            <TouchableOpacity 
              style={[styles.scrollArrowButton, styles.scrollArrowLeft]} 
              onPress={() => handleScrollLeft(scrollRef2, scrollOffset2)}
            >
              <SvgXml xml={arrowRight} width={32} height={32} style={{ transform: [{ rotate: '180deg' }] }} />
            </TouchableOpacity>

            <ScrollView 
              ref={scrollRef2}
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.categoriesRow}
              onScroll={(e) => { scrollOffset2.current = e.nativeEvent.contentOffset.x; }}
              scrollEventThrottle={16}
            >
              <TouchableOpacity style={styles.categoryCard}>
                <Image source={require('../../../assets/promos/promo-chemicals.png')} style={styles.categoryImage} />
                <Text style={styles.categoryTitle} numberOfLines={2}>
                  Household chemicals up to $15: quality and...
                </Text>
                <View style={styles.seeAllContainer}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Text style={styles.seeAllArrow}>›</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.categoryCard}>
                <Image source={require('../../../assets/promos/promo-swimsuits.png')} style={styles.categoryImage} />
                <Text style={styles.categoryTitle} numberOfLines={2}>
                  Swimsuits: competitive prices
                </Text>
                <View style={styles.seeAllContainer}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Text style={styles.seeAllArrow}>›</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.categoryCard}>
                <Image source={require('../../../assets/promos/promo-sports.png')} style={styles.categoryImage} />
                <Text style={styles.categoryTitle} numberOfLines={2}>
                  Sports equipment bestseller: hit sales
                </Text>
                <View style={styles.seeAllContainer}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Text style={styles.seeAllArrow}>›</Text>
                </View>
              </TouchableOpacity>

               <TouchableOpacity style={styles.categoryCard}>
                <Image source={require('../../../assets/promos/promo-children.png')} style={styles.categoryImage} />
                <Text style={styles.categoryTitle} numberOfLines={2}>
                  Fashionabe children's clothes for girls: vivid i...
                </Text>
                <View style={styles.seeAllContainer}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Text style={styles.seeAllArrow}>›</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.categoryCard}>
                <Image source={require('../../../assets/promos/promo-music.png')} style={styles.categoryImage} />
                <Text style={styles.categoryTitle} numberOfLines={2}>
                  Musical instruments: sale, super prices
                </Text>
                <View style={styles.seeAllContainer}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Text style={styles.seeAllArrow}>›</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.categoryCard}>
                <Image source={require('../../../assets/promos/promo-sunglasses.png')} style={styles.categoryImage} />
                <Text style={styles.categoryTitle} numberOfLines={2}>
                  Fashion sunglases: this month's best selle...
                </Text>
                <View style={styles.seeAllContainer}>
                  <Text style={styles.seeAllText}>See all</Text>
                  <Text style={styles.seeAllArrow}>›</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity 
              style={[styles.scrollArrowButton, styles.scrollArrowRight]} 
              onPress={() => handleScrollRight(scrollRef2, scrollOffset2)}
            >
              <SvgXml xml={arrowRight} width={32} height={32} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Sale</Text>
          <View style={styles.productsGrid}>
            {SALES.map((product) => (
              <ProductCardItem key={product.id} product={product} />
            ))}
          </View>

          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllButtonText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.authBannerWrapper}>
          <ImageBackground
            source={require('../../../assets/img/auth_banner.png')}
            style={styles.authBannerBackground}
            resizeMode="cover"
          >
            <View style={styles.authBannerContent}>
              <Text style={styles.authBannerTitle}>Abundance of goods</Text>
              <Text style={styles.authBannerSubtitle}>
                Join, choose and buy with confidence!
              </Text>

              <View style={styles.authButtonsRow}>
                <TouchableOpacity style={styles.signInButton} onPress={onSignInPress}>
                  <Text style={styles.signInButtonText}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logInButton} onPress={onLogInPress}>
                  <Text style={styles.logInButtonText}>Log in</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.scrollTopButton} 
              onPress={handleScrollToTop}
              activeOpacity={0.8}
            >
              <SvgXml xml={arrowUpIcon} width={48} height={48} />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.topFooter}>
  <Text style={styles.footerHeader}>Support</Text>

  <TouchableOpacity activeOpacity={0.7} style={styles.touchableLink}>
    <Text style={styles.footerLink}>Contact us</Text>
  </TouchableOpacity>

  <TouchableOpacity activeOpacity={0.7} style={styles.touchableLink}>
    <Text style={styles.footerLink}>FAQ</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={onLegalNoticePress} activeOpacity={0.7} style={styles.touchableLink}>
    <Text style={styles.footerLink}>Legal notice</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={onPrivacyPress} activeOpacity={0.7} style={styles.touchableLink}>
    <Text style={styles.footerLink}>Privacy Policy</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={onLicencePress} activeOpacity={0.7} style={styles.touchableLink}>
    <Text style={styles.footerLink}>License agreement</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={onTermsPress} activeOpacity={0.7} style={styles.touchableLink}>
    <Text style={styles.footerLink}>Terms and Conditions</Text>
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
            <Text style={styles.copyright}>© 2024 Du Soleil. All rights reserved.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F2F4F8', 
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
    backgroundColor: '#497ECE',
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
    width: 254,
    height: 32,
    backgroundColor: '#F4FAFF',
    borderRadius: 4,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    height: 16,
    padding: 0,
    fontFamily: 'Mulish-Regular',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.24,
    color: 'rgba(14, 32, 66, 0.5)',
  },
  searchActionButton: {
    flexDirection: 'row',
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
    backgroundColor: '#F4FAFF',
  },
  scrollContent: {
    paddingTop: 52,
  },
  bannerContainer: {
    width: '100%',
    height: 220,
    backgroundColor: '#3962A8',
    marginTop: 16,
    marginBottom: 16,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  sectionContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 16,
  },
  horizontalScrollWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  scrollArrowButton: {
    position: 'absolute',
    zIndex: 5,
    top: '50%',
    marginTop: -16,
    backgroundColor: 'rgba(242, 244, 248, 0.8)',
    borderRadius: 20,
  },
  scrollArrowLeft: {
    left: 0,
  },
  scrollArrowRight: {
    right: 0,
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  categoryCard: {
    width: 171,
    minHeight: 197,
    backgroundColor: '#F4FAFF',
    borderRadius: 4,
    padding: 14,
    justifyContent: 'space-between',
    shadowColor: '#2050AD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  categoryImage: {
    width: 143,
    height: 87,
    borderRadius: 2,
    marginBottom: 4,
  },
  categoryTitle: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 18,
    color: '#0E2042',
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-end',
    marginTop: 'auto',
  },
  seeAllText: {
    fontFamily: 'Mulish',
    fontSize: 12,
    color: '#0E2042',
  },
  seeAllArrow: {
    fontSize: 14,
    color: '#4A7BD9',
    fontWeight: 'bold',
  },
  divider: {
    width: '90%',
    height: 1.5,
    backgroundColor: '#CCDDFF',
    alignSelf: 'center',
    marginVertical: 10,
  },
  sectionHeader: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    color: '#0E2042',
    letterSpacing: -0.3,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  horizontalProductsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  productCard: {
    width: (width - 48) / 2,
    height: 270,
    backgroundColor: '#F4FAFF',
    borderRadius: 4,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#2050AD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: 143,
    height: 143,
    overflow: 'visible'
  },
  productImage: {
    width: 143,
    height: 143,
    borderRadius: 2,
  },
  discountBadgeWrapper: {
    position: 'absolute',
    top: 5,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBadgeText: {
    position: 'absolute',
    top: 7,
    right: 16,
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: 11,
    color: '#0E2042',
  },
  productTitle: {
    fontFamily: 'Mulish',
    fontSize: 13,
    lineHeight: 16,
    color: '#0E2042',
    textAlign: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  iconMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontFamily: 'Mulish',
    fontSize: 12,
    color: '#0E2042',
  },
  reviewsText: {
    fontFamily: 'Mulish',
    fontSize: 12,
    color: '#0E2042',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  priceMain: {
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: 18,
    color: '#0E2042',
    lineHeight: 22,
  },
  priceSup: {
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: 11,
    color: '#0E2042',
    lineHeight: 14,
  },
  oldPriceText: {
    fontFamily: 'Mulish',
    fontSize: 13,
    color: 'rgba(14, 32, 66, 0.5)',
    textDecorationLine: 'line-through',
  },
  seeAllButton: {
    width: 120,
    height: 36,
    borderWidth: 1.5,
    borderColor: '#4A7BD9',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  seeAllButtonText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    color: '#4A7BD9',
    fontWeight: '500',
  },
  authBannerWrapper: {
    marginHorizontal: 16,
    marginTop: 24,
    height: 500, 
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#2050AD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 11.5,
    elevation: 3,
  },
  authBannerBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: 32, 
    position: 'relative',
  },
  authBannerContent: {
    width: 310,
    height: 134,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authBannerTitle: {
    fontFamily: 'Mulish',
    fontWeight: '200',
    fontSize: 22,
    lineHeight: 28,
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 6,
  },
  authBannerSubtitle: {
    fontFamily: 'Mulish',
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 20,
  },
  authButtonsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  signInButton: {
    backgroundColor: '#B8EA48',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 6,
  },
  signInButtonText: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 15,
    color: '#1E293B',
  },
  logInButton: {
    borderWidth: 1.5,
    borderColor: '#497ECE',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  logInButtonText: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: 15,
    color: '#497ECE',
  },
  scrollTopButton: {
    position: 'absolute',
    right: 0,
    bottom: 230,
    zIndex: 10,
  },
  footerContainer: {
    marginTop: 24,
  },
  topFooter: {
    backgroundColor: '#497ECE', 
    paddingHorizontal: 25,
    paddingTop: 5,
    paddingBottom: 10,
  },
  footerHeader: {
    color: 'white',
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
  footerLinkActive: {
    color: 'white',
    fontFamily: 'Mulish',
    fontWeight: '600',
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
  touchableLink: {
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
});