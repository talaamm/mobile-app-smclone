import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    // Here you would typically make an API call
    console.log('Signup attempt:', { name, email, password });
    Alert.alert('Success', 'Account created successfully!');
    // router.replace('/login');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedView style={styles.innerContainer}>
        <ThemedText type="title" style={styles.title}>
          Create Account
        </ThemedText>
        
        <ThemedText style={styles.subtitle}>
          Join us and get started
        </ThemedText>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.inputBackground, 
              color: colors.text,
              borderColor: colors.border
            }]}
            placeholder="Full Name"
            placeholderTextColor={colors.placeholder}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.inputBackground, 
              color: colors.text,
              borderColor: colors.border
            }]}
            placeholder="Email"
            placeholderTextColor={colors.placeholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.inputBackground, 
              color: colors.text,
              borderColor: colors.border
            }]}
            placeholder="Password"
            placeholderTextColor={colors.placeholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.inputBackground, 
              color: colors.text,
              borderColor: colors.border
            }]}
            placeholder="Confirm Password"
            placeholderTextColor={colors.placeholder}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={handleSignup}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>
              Create Account
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <ThemedText style={styles.loginText}>
              Already have an account?{' '}
            </ThemedText>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={[styles.loginLink, { color: colors.tint }]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.7,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
