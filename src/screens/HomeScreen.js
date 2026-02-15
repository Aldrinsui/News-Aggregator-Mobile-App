import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Searchbar, ActivityIndicator, Text, FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, searchNews } from '../store/newsSlice';
import { loadBookmarks } from '../store/bookmarksSlice';
import NewsCard from '../components/NewsCard';
import CategoryTabs from '../components/CategoryTabs';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { articles, loading, category } = useSelector(state => state.news);
  const isDark = useSelector(state => state.theme.isDark);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchNews({ category }));
    dispatch(loadBookmarks());
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchNews({ category })).finally(() => setRefreshing(false));
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(searchNews(searchQuery));
    }
  };

  const containerStyle = [
    styles.container,
    { backgroundColor: isDark ? '#121212' : '#F5F5F5' }
  ];

  if (loading && articles.length === 0) {
    return (
      <View style={[styles.center, containerStyle]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <Searchbar
        placeholder="Search news..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        style={styles.searchbar}
      />
      <CategoryTabs />
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            onPress={() => navigation.navigate('ArticleDetail', { article: item })}
          />
        )}
        keyExtractor={(item, index) => item.url + index}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>No articles found</Text>
          </View>
        }
      />
      <FAB
        icon="bookmark"
        style={styles.fab}
        onPress={() => navigation.navigate('Bookmarks')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchbar: { margin: 8 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  fab: { position: 'absolute', right: 16, bottom: 16 },
});
