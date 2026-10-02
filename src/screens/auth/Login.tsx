import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';

interface LoginScreenProps {
  onSignUpPress?: () => void;
  onForgotPasswordPress?: () => void;
  onLoginSuccess?: () => void;
  onClose?: () => void;
  onTermsPress?: () => void;
}

type ScreenStep =
  | 'login'
  | 'signUp'
  | 'verification'
  | 'finishingTouches'
  | 'forgotPassword'
  | 'resetPassword'
  | 'success';

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  code?: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSignUpPress,
  onForgotPasswordPress,
  onLoginSuccess,
  onClose,
  onTermsPress,
}) => {
  const [step, setStep] = useState<ScreenStep>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [code, setCode] = useState<string[]>(['1', '2', '3', '4', '5', '6']);

  const [errors, setErrors] = useState<FormErrors>({});

  const [timer, setTimer] = useState<number>(59);

  const inputRefs = useRef<Array<TextInput | null>>([]);

useEffect(() => {
  let interval: ReturnType<typeof setInterval>;
  if (step === 'verification' && timer > 0) {
    interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  }
  return () => clearInterval(interval);
}, [step, timer]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (errors.code) {
      setErrors((prev) => ({ ...prev, code: undefined }));
    }

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const clearErrors = () => setErrors({});

  const handleToggleSignUp = () => {
    clearErrors();
    if (step === 'login') {
      setStep('signUp');
      if (onSignUpPress) onSignUpPress();
    } else {
      setStep('login');
    }
  };

  const handleMainAction = () => {
    clearErrors();

    if (step === 'login') {
      
      const newErrors: FormErrors = {};
      if (!email.includes('@')) {
        newErrors.email = 'Wrong or invalid email address';
      }
      if (password.length < 6) {
        newErrors.password = 'Wrong password';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        if (onLoginSuccess) onLoginSuccess();
      }
    } else if (step === 'signUp') {
      const newErrors: FormErrors = {};
      if (!email.includes('@')) {
        newErrors.email = 'Wrong or invalid email address';
      }
      if (password.length < 8) {
        newErrors.password =
          'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and be at least 8 characters long';
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords must match';
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        setStep('verification');
      }
    } else if (step === 'verification') {
      if (code.join('') !== '123456') {
        setErrors({ code: 'Incorrect code, try again' });
      } else {
        setStep('finishingTouches');
      }
    } else if (step === 'finishingTouches') {
      setStep('success');
    } else if (step === 'forgotPassword') {
      setStep('resetPassword');
    } else if (step === 'resetPassword') {
      setStep('login');
    } else if (step === 'success') {
      if (onLoginSuccess) onLoginSuccess();
    }
  };

  const handleBackPress = () => {
    clearErrors();
    if (step === 'verification') {
      setStep('signUp');
    } else if (step === 'finishingTouches') {
      setStep('verification');
    } else if (step === 'forgotPassword') {
      setStep('login');
    } else if (step === 'resetPassword') {
      setStep('forgotPassword');
    }
  };

  const handleForgotPassword = () => {
    clearErrors();
    setStep('forgotPassword');
    if (onForgotPasswordPress) onForgotPasswordPress();
  };

  const showBackButton =
    step === 'verification' ||
    step === 'finishingTouches' ||
    step === 'forgotPassword' ||
    step === 'resetPassword';

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <View style={styles.topBar}>
          {showBackButton ? (
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
              <Text style={styles.backIcon}>‹</Text>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {step === 'success' && (
            <>
              <View style={[styles.header, styles.successHeader]}>
                <Text style={styles.title}>Congratulations!</Text>
                <Text style={styles.subtitle}>
                  The registration was completed
                </Text>
              </View>

              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.button} onPress={handleMainAction}>
                  <Text style={styles.buttonText}>Let’s start shopping</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {step === 'forgotPassword' && (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Forgot password</Text>
                <Text style={styles.subtitle}>
                  Enter your email to reset your password
                </Text>
              </View>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <View style={styles.labelBadge}>
                    <Text style={styles.labelText}>Email</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="rgba(14, 32, 66, 0.25)"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.button} onPress={handleMainAction}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {step === 'resetPassword' && (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Reset password</Text>
                <Text style={styles.subtitle}>
                  Set a new password for your account
                </Text>
              </View>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <View style={styles.labelBadge}>
                    <Text style={styles.labelText}>Password</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Create your password"
                    placeholderTextColor="rgba(14, 32, 66, 0.25)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.labelBadgeLarge}>
                    <Text style={styles.labelText}>Confirm password</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Repeat your password"
                    placeholderTextColor="rgba(14, 32, 66, 0.25)"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.button} onPress={handleMainAction}>
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {step === 'finishingTouches' && (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Finishing touches</Text>
                <Text style={styles.subtitle}>
                  Enter your first and last name
                </Text>
              </View>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <View style={styles.labelBadge}>
                    <Text style={styles.labelText}>First name</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your first name"
                    placeholderTextColor="rgba(14, 32, 66, 0.25)"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.labelBadge}>
                    <Text style={styles.labelText}>Last name</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your last name"
                    placeholderTextColor="rgba(14, 32, 66, 0.25)"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>

              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.button} onPress={handleMainAction}>
                  <Text style={styles.buttonText}>Create account</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {step === 'verification' && (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Send code</Text>
                <Text style={styles.subtitle}>
                  Enter the code to confirm your email
                </Text>
              </View>

              <View style={styles.verificationContainer}>
                <View style={styles.codeRow}>
                  {code.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => {
                        inputRefs.current[index] = ref;
                      }}
                      style={[
                        styles.codeInput,
                        errors.code ? styles.codeInputError : null,
                      ]}
                      value={digit}
                      onChangeText={(text) => handleCodeChange(text, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      keyboardType="number-pad"
                      maxLength={1}
                      selectTextOnFocus
                    />
                  ))}
                </View>

                {errors.code && (
                  <Text style={styles.codeErrorText}>{errors.code}</Text>
                )}

                <TouchableOpacity
                  disabled={timer > 0}
                  onPress={() => setTimer(59)}
                >
                  <Text style={styles.resendText}>
                    Resend code {timer > 0 ? `0:${timer < 10 ? `0${timer}` : timer}` : ''}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.button} onPress={handleMainAction}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {(step === 'login' || step === 'signUp') && (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>
                  {step === 'signUp' ? 'Create account' : 'Welcome back'}
                </Text>
                <Text style={styles.subtitle}>
                  {step === 'signUp'
                    ? 'Shop in the marketplace while travelling'
                    : 'Login into your account'}
                </Text>
              </View>

              <View style={styles.form}>
                <View style={styles.fieldWrapper}>
                  <View
                    style={[
                      styles.inputContainer,
                      errors.email ? styles.inputContainerError : null,
                    ]}
                  >
                    <View style={styles.labelBadge}>
                      <Text
                        style={[
                          styles.labelText,
                          errors.email ? styles.labelTextError : null,
                        ]}
                      >
                        Email
                      </Text>
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      placeholderTextColor="rgba(14, 32, 66, 0.25)"
                      value={email}
                      onChangeText={(val) => {
                        setEmail(val);
                        if (errors.email)
                          setErrors((p) => ({ ...p, email: undefined }));
                      }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.fieldWrapper}>
                  <View
                    style={[
                      styles.inputContainer,
                      errors.password ? styles.inputContainerError : null,
                    ]}
                  >
                    <View style={styles.labelBadge}>
                      <Text
                        style={[
                          styles.labelText,
                          errors.password ? styles.labelTextError : null,
                        ]}
                      >
                        Password
                      </Text>
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Create your password"
                      placeholderTextColor="rgba(14, 32, 66, 0.25)"
                      value={password}
                      onChangeText={(val) => {
                        setPassword(val);
                        if (errors.password)
                          setErrors((p) => ({ ...p, password: undefined }));
                      }}
                      secureTextEntry
                    />
                  </View>
                  {errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                {step === 'signUp' && (
                  <View style={styles.fieldWrapper}>
                    <View
                      style={[
                        styles.inputContainer,
                        errors.confirmPassword
                          ? styles.inputContainerError
                          : null,
                      ]}
                    >
                      <View style={styles.labelBadgeLarge}>
                        <Text
                          style={[
                            styles.labelText,
                            errors.confirmPassword
                              ? styles.labelTextError
                              : null,
                          ]}
                        >
                          Confirm password
                        </Text>
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Repeat your password"
                        placeholderTextColor="rgba(14, 32, 66, 0.25)"
                        value={confirmPassword}
                        onChangeText={(val) => {
                          setConfirmPassword(val);
                          if (errors.confirmPassword)
                            setErrors((p) => ({
                              ...p,
                              confirmPassword: undefined,
                            }));
                        }}
                        secureTextEntry
                      />
                    </View>
                    {errors.confirmPassword && (
                      <Text style={styles.errorText}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </View>
                )}

                {step === 'login' && (
                  <View style={styles.optionsRow}>
                    <Pressable
                      style={styles.checkboxContainer}
                      onPress={() => setStaySignedIn(!staySignedIn)}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          staySignedIn && styles.checkboxActive,
                        ]}
                      />
                      <Text style={styles.optionText}>Stay signed in</Text>
                    </Pressable>

                    <TouchableOpacity onPress={handleForgotPassword}>
                      <Text style={styles.forgotPasswordText}>
                        Forgot password?
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.button} onPress={handleMainAction}>
                  <Text style={styles.buttonText}>
                    {step === 'signUp' ? 'Continue' : 'Log in'}
                  </Text>
                </TouchableOpacity>

                <View style={styles.signUpRow}>
                  <Text style={styles.noAccountText}>
                    {step === 'signUp'
                      ? 'Have an account?'
                      : 'Don’t have an account?'}
                  </Text>
                  <TouchableOpacity onPress={handleToggleSignUp}>
                    <Text style={styles.signUpLink}>
                      {step === 'signUp' ? 'Log in' : 'Sign up'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {step === 'signUp' && (
                  <Text style={styles.termsText}>
                    By clicking “Continue”, you agree with{' '}
                    <Text style={styles.termsLink} onPress={onTermsPress}>
                      PERRY Terms and Conditions
                    </Text>
                  </Text>
                )}
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#F4FAFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 390,
    minHeight: 618,
    backgroundColor: '#F4FAFF',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  topBar: {
    width: 350,
    height: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backIcon: {
    fontSize: 22,
    color: '#3962A8',
    lineHeight: 22,
  },
  backText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    color: '#3962A8',
    fontWeight: '400',
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    fontSize: 20,
    color: '#0E2042',
    fontWeight: '300',
  },
  contentContainer: {
    width: 334,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 28,
  },
  header: {
    width: 334,
    alignItems: 'center',
    gap: 4,
  },
  successHeader: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    width: 334,
    fontFamily: 'Mulish',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: -0.3,
    color: '#0E2042',
  },
  subtitle: {
    width: 334,
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: 0.32,
    color: '#0E2042',
  },
  form: {
    width: 310,
    gap: 12,
  },
  fieldWrapper: {
    width: 310,
    gap: 2,
  },
  inputContainer: {
    width: 310,
    height: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(14, 32, 66, 0.5)',
    borderRadius: 4,
    paddingHorizontal: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  inputContainerError: {
    borderColor: '#E53935',
  },
  labelBadge: {
    position: 'absolute',
    left: 20,
    top: -9,
    backgroundColor: '#F4FAFF',
    paddingHorizontal: 4,
  },
  labelBadgeLarge: {
    position: 'absolute',
    left: 20,
    top: -9,
    backgroundColor: '#F4FAFF',
    paddingHorizontal: 4,
  },
  labelText: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.28,
    color: '#0E2042',
  },
  labelTextError: {
    color: '#E53935',
  },
  input: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.24,
    color: '#0E2042',
    padding: 0,
  },
  errorText: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    color: '#E53935',
    paddingLeft: 4,
    marginTop: 2,
  },
  optionsRow: {
    width: 310,
    height: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(14, 32, 66, 0.5)',
    borderRadius: 2,
  },
  checkboxActive: {
    backgroundColor: '#0E2042',
  },
  optionText: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.24,
    color: '#0E2042',
  },
  forgotPasswordText: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'right',
    letterSpacing: 0.24,
    color: '#0E2042',
  },
  verificationContainer: {
    width: 310,
    alignItems: 'center',
    gap: 12,
    marginVertical: 10,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 310,
  },
  codeInput: {
    width: 40,
    height: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(14, 32, 66, 0.5)',
    borderRadius: 4,
    textAlign: 'center',
    fontFamily: 'Mulish',
    fontSize: 16,
    color: '#0E2042',
    backgroundColor: '#F4FAFF',
  },
  codeInputError: {
    borderColor: '#E53935',
  },
  codeErrorText: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 14,
    color: '#E53935',
    textAlign: 'center',
  },
  resendText: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#0E2042',
    textAlign: 'center',
    marginTop: 4,
  },
  actionContainer: {
    width: 310,
    gap: 12,
    alignItems: 'center',
  },
  button: {
    width: 310,
    height: 40,
    backgroundColor: '#B8EA48',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.32,
    color: '#0E2042',
    textAlign: 'center',
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  noAccountText: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.24,
    color: '#0E2042',
  },
  signUpLink: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.24,
    color: '#4A7BD9',
  },
  termsText: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 14,
    textAlign: 'center',
    color: '#0E2042',
    opacity: 0.6,
    paddingHorizontal: 10,
  },
  termsLink: {
    color: '#4A7BD9',
    textDecorationLine: 'underline',
  },
});