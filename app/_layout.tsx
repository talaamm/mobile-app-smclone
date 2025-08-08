import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';


export default function RootLayout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="login" options={{ title: 'Log In', headerShown: false }} />
      <Stack.Screen name="signup" options={{ title: 'Sign Up', headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <StatusBar hidden={true} />
    </Stack>
  );
} 