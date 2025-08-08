import { ThemedView } from '@/components/ThemedView';
import { apiLogin } from '@/hooks/useApi';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please fill in Email and Password.');
      return;
    }
    try {
      setLoading(true);
      await apiLogin({ identifier: email, password });
      Alert.alert('Success', 'Logged in successfully.');
      // TODO: Navigate to your main app screen (e.g., /tabs)
    } catch (error: any) {
      Alert.alert('Login failed', error?.message || 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.screen} lightColor="#6a1b9a" darkColor="#6a1b9a">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.center} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>Login</Text>
              <View style={styles.underline} />
            </View>

            <View style={styles.inputs}>
              <View style={styles.inputRow}>
                <Ionicons
                  name="mail-outline"
                  size={16}
                  color="#797979"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="example@example.com"
                  placeholderTextColor="#797979"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputRow}>
                <Ionicons
                  name="lock-closed-outline"
                  size={16}
                  color="#797979"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#797979"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            <Pressable onPress={() => Alert.alert('Forgot Password', 'Implement flow')}>
              <Text style={styles.forgotPassword}>
                Forgot Password ? <Text style={styles.linkAccent}>Click Here!</Text>
              </Text>
            </Pressable>

            <View style={styles.submitWrapper}>
              <Pressable onPress={handleLogin} disabled={loading}>
                {(state: { pressed: boolean }) => (
                  <View
                    style={[
                      styles.submit,
                      state.pressed && styles.submitPressed,
                      loading && styles.submitDisabled,
                    ]}
                  >
                    <Text style={styles.submitText}>{loading ? 'Loading...' : 'Submit'}</Text>
                  </View>
                )}
              </Pressable>
            </View>

            <View style={styles.toggleRow}>
              <Pressable onPress={() => router.replace('/signup')}>
                {(state: { pressed: boolean }) => (
                  <View style={[styles.pillButton, state.pressed && styles.submitPressed]}>
                    <Text style={styles.pillText}>Sign Up</Text>
                  </View>
                )}
              </Pressable>

              <View style={[styles.pillButton, styles.pillGray]}>
                <Text style={[styles.pillText, styles.pillGrayText]}>Login</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  center: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingBottom: 30,
    paddingHorizontal: 20,
    paddingTop: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  header: {
    alignItems: 'center',
    gap: 9,
    width: '100%',
    marginTop: 6,
    marginBottom: 12,
  },
  title: {
    color: '#3c009d',
    fontSize: 40,
    fontWeight: '700',
  },
  underline: {
    width: 61,
    height: 6,
    backgroundColor: '#3c009d',
    borderRadius: 9,
  },
  inputs: {
    marginTop: 24,
    gap: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 64,
    backgroundColor: '#eaeaea',
    borderRadius: 6,
  },
  inputIcon: {
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: '#797979',
    fontSize: 18,
  },
  forgotPassword: {
    paddingLeft: 10,
    marginTop: 16,
    color: '#797979',
    fontSize: 16,
    textAlign: 'left',
  },
  linkAccent: {
    color: '#4c00b4',
  },
  submitWrapper: {
    alignItems: 'center',
    marginVertical: 24,
  },
  submit: {
    width: 220,
    height: 59,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6a1b9a',
  },
  submitPressed: {
    transform: [{ translateY: -3 }, { scale: 1.02 }],
  },
  submitDisabled: {
    opacity: 0.7,
  },
  submitText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: 8,
  },
  pillButton: {
    width: 160,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6a1b9a',
  },
  pillText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  pillGray: {
    backgroundColor: '#d0d0d0',
  },
  pillGrayText: {
    color: '#676767',
  },
  smallLink: {
    marginTop: 16,
    alignSelf: 'center',
  },
  smallLinkText: {
    color: '#0a7ea4',
    fontSize: 16,
  },
});