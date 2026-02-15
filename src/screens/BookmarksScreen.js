import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import NewsCard from '../components/NewsCard';

export default function BookmarksScreen({ navigation }) {
  const bookmarks = useSelector(state => state.bookmarks.bookmarks);
  const isDark = useSelector(state => state.theme.isDark);

  const containerStyle = [
    styles.container,
    { backgroundColor: isDark ? '#121212' : '#F5F5F5' }
  ];

  if (bookmarks.length === 0) {
    return (
      <View style={[styles.empty, containerStyle]}>
        <Text variant="headlineSmall">No bookmarks yet</Text>
        <Text variant="bodyMedium" style={styles.hint}>
          Tap the bookmark icon on articles to save them
        </Text>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <FlatList
        data={bookmarks}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            onPress={() => navigation.navigate('ArticleDetail', { article: item })}
          />
        )}
        keyExtractor={(item, index) => item.url + index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  hint: { marginTop: 8, textAlign: 'center', color: '#666' },
});
