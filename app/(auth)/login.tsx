import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, Alert, TextInput, Pressable } from 'react-native';

import { supabase } from '~/utils/supabase';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert('Error creating the account', error.message);
    }
  };

  const onSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      Alert.alert('Error creating the account', error.message);
    }
  };
  return (
    <View className="gap-3 p-3">
      <Stack.Screen options={{ title: 'Sign in' }} />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="email"
        className="rounded border border-gray-300 bg-white p-3"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        secureTextEntry
        className="rounded border border-gray-300 bg-white p-3"
      />

      <View className="flex-row gap-2">
        <Pressable onPress={onSignIn} className="flex-1 items-center rounded bg-teal-500 p-3">
          <Text className="font-bold color-white">Sign in</Text>
        </Pressable>

        <Pressable onPress={onSignUp} className="flex-1 items-center rounded bg-teal-500 p-3">
          <Text className="font-bold color-white">Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
