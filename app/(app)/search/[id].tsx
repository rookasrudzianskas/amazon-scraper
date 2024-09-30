import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator, Button
} from "react-native";

import dummyPproducts from '~/assets/search.json';
import { supabase } from '~/utils/supabase';

dayjs.extend(relativeTime);

const SearchResultScreen = () => {
  const products = dummyPproducts.slice(0, 20);
  const { id } = useLocalSearchParams();
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase
      .from('searches')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        setSearch(data);
      });
  }, [id]);

  const startScraping = async () => {
    const { data, error } = await supabase.functions.invoke('scrape-start', {
      body: JSON.stringify({ record: search }),
    });
    console.log(data, error);
  }

  if (!search) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <View className="m-2 rounded bg-white p-2 shadow-sm">
        <Text className="text-lg">{search.query}</Text>
        <Text className="text-sm">
          {dayjs(search.created_at).fromNow()}
          <Text className="text-xs text-gray-500"> | Last updated</Text>
        </Text>
        <Text className="text-sm text-gray-500">{dayjs(search.updated_at).fromNow()}</Text>

        <Button title="Start scraping" onPress={startScraping} />

      </View>
      <FlatList
        data={products}
        contentContainerClassName="gap-2 rounded-lg p-4"
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Linking.openURL(item.url)}
            className="flex flex-row items-center justify-between rounded-md bg-white p-2">
            <Image source={{ uri: item.image }} className="mr-3 h-20 w-20 rounded-md" />
            <Text className="flex-1 text-sm" numberOfLines={4}>
              {item.name}
            </Text>
            <Text className="text-md">${item.final_price}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.asin}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SearchResultScreen;
