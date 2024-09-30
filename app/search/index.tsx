import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

import dummyPproducts from '~/assets/search.json';
const SearchResultScreen = () => {
  const products = dummyPproducts.slice(0, 20);

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View className="flex flex-row items-center justify-between p-2">
            <Text className="text-lg">{item.name}</Text>
            <Text className="text-lg">{item.price}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default SearchResultScreen;
