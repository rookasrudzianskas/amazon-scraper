import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from "expo-router";
import { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const performSearch = () => {
    console.log('Searching...');
    router.push(`/search`);
  };

  return (
    <View className="flex flex-1 bg-white">
      <View className="m-2">
        <Stack.Screen options={{ title: 'Search' }} />
        <View className="flex flex-row items-center justify-between rounded-lg bg-white p-2">
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
            className="h-10 flex-1 rounded-lg border-2 border-black/20 bg-white p-2"
          />
          <TouchableOpacity onPress={performSearch} activeOpacity={0.7} className="m-2">
            <Ionicons name="search" size={24} color="#DDDDDD" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
