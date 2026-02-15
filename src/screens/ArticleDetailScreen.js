import React from 'react';
import { ScrollView, StyleSheet, Linking } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { Image } from 'expo-image';
import { useSelector } from 'react-redux';

export default function ArticleDetailScreen({ route }) {
  const { article } = route.params;
  const isDark = useSelector(state => state.theme.isDark);

  const openArticle = () => {
    Linking.openURL(article.url);
  };

  const containerStyle = [
    styles.container,
    { backgroundColor: isDark ? '#121212' : '#FFFFFF' }
  ];

  return (
    <ScrollView style={containerStyle}>
      {article.urlToImage && (
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.image}
          contentFit="cover"
        />
      )}
      <Card.Content style={styles.content}>
        <Text variant="headlineSmall" style={[styles.title, { color: isDark ? '#FFF' : '#000' }]}>
          {article.title}
        </Text>
        <Text variant="bodySmall" style={[styles.meta, { color: isDark ? '#B0B0B0' : '#666' }]}>
          {article.source.name} • {new Date(article.publishedAt).toLocaleString()}
        </Text>
        <Text variant="bodyMedium" style={[styles.description, { color: isDark ? '#E0E0E0' : '#333' }]}>
          {article.description}
        </Text>
        {article.content && (
          <Text variant="bodyMedium" style={[styles.content, { color: isDark ? '#E0E0E0' : '#333' }]}>
            {article.content.split('[+')[0]}
          </Text>
        )}
        <Button mode="contained" onPress={openArticle} style={styles.button}>
          Read Full Article
        </Button>
      </Card.Content>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { height: 250 },
  content: { padding: 16 },
  title: { marginBottom: 8, fontWeight: 'bold' },
  meta: { marginBottom: 16 },
  description: { marginBottom: 16, lineHeight: 24 },
  button: { marginTop: 16 },
});
