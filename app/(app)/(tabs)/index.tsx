import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useAuth } from '~/contexts/AuthContext';
import { supabase } from '~/utils/supabase';

dayjs.extend(relativeTime);

export default function Home() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const [pastHistory, setPastHistory] = useState([]);

  useEffect(() => {
    supabase
      .from('searches')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data }) => {
        setPastHistory(data);
      });
  });

  const performSearch = async () => {
    console.log('Searching...');

    // save in the database now
    const { data } = await supabase
      .from('searches')
      .insert({
        query: search,
        user_id: user.id,
      })
      .select()
      .single();
    if (data) router.push(`/search/${data.id}`);
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
      <TouchableOpacity onPress={() => router.push('/login')} className="m-2">
        <Text className="text-center">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => supabase.auth.signOut()} className="m-2">
        <Text className="text-center">Sign out</Text>
      </TouchableOpacity>

      <FlatList
        data={pastHistory}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <View className="my-1 flex flex-col items-start border-b border-black/20 p-2">
            <Text className="font-semibold">{item.query}</Text>
            <Text className="text-xs">
              {dayjs(item.created_at).fromNow()}
              <Text className="text-xs text-gray-500"> | Last updated</Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
}
