import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack initialRouteName="signup">
      <Stack.Screen name="login" options={{ title: 'Log In' }} />
      <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
} 