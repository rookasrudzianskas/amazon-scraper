import React from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, Linking } from 'react-native';

import dummyPproducts from '~/assets/search.json';
const SearchResultScreen = () => {
  const products = dummyPproducts.slice(0, 20);

  return (
    <View>
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
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default SearchResultScreen;
