import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { Image } from 'expo-image';
import { useSelector, useDispatch } from 'react-redux';
import { saveBookmark, removeBookmark } from '../store/bookmarksSlice';

export default function NewsCard({ article, onPress }) {
  const isDark = useSelector(state => state.theme.isDark);
  const bookmarks = useSelector(state => state.bookmarks.bookmarks);
  const dispatch = useDispatch();

  const isBookmarked = bookmarks.some(b => b.url === article.url);

  const handleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(article.url));
    } else {
      dispatch(saveBookmark(article));
    }
  };

  const cardStyle = [
    styles.card,
    { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
  ];

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={cardStyle}>
        {article.urlToImage && (
          <Image
            source={{ uri: article.urlToImage }}
            style={styles.image}
            contentFit="cover"
          />
        )}
        <Card.Content>
          <Text
            variant="titleMedium"
            style={[styles.title, { color: isDark ? '#FFF' : '#000' }]}
            numberOfLines={3}
          >
            {article.title}
          </Text>
          <Text
            variant="bodySmall"
            style={[styles.source, { color: isDark ? '#B0B0B0' : '#666' }]}
          >
            {article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}
          </Text>
        </Card.Content>
        <Card.Actions>
          <IconButton
            icon={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            onPress={handleBookmark}
            iconColor={isBookmarked ? '#2196F3' : (isDark ? '#FFF' : '#000')}
          />
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { margin: 8, elevation: 2 },
  image: { height: 200 },
  title: { marginTop: 8, fontWeight: 'bold' },
  source: { marginTop: 4 },
});
