import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, setCategory } from '../store/newsSlice';

const CATEGORIES = [
  { id: 'general', label: 'Top Stories' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'sports', label: 'Sports' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
];

export default function CategoryTabs() {
  const dispatch = useDispatch();
  const currentCategory = useSelector(state => state.news.category);

  const handleCategoryPress = (category) => {
    dispatch(setCategory(category));
    dispatch(fetchNews({ category }));
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {CATEGORIES.map((cat) => (
        <Chip
          key={cat.id}
          selected={currentCategory === cat.id}
          onPress={() => handleCategoryPress(cat.id)}
          style={styles.chip}
        >
          {cat.label}
        </Chip>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { maxHeight: 60 },
  content: { padding: 8 },
  chip: { marginHorizontal: 4 },
});
