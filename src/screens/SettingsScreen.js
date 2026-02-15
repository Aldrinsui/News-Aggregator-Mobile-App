import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const isDark = useSelector(state => state.theme.isDark);

  const containerStyle = [
    styles.container,
    { backgroundColor: isDark ? '#121212' : '#FFFFFF' }
  ];

  return (
    <View style={containerStyle}>
      <List.Section>
        <List.Subheader>Appearance</List.Subheader>
        <List.Item
          title="Dark Mode"
          description="Switch between light and dark theme"
          left={props => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => (
            <Switch value={isDark} onValueChange={() => dispatch(toggleTheme())} />
          )}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>About</List.Subheader>
        <List.Item
          title="Version"
          description="1.0.0"
          left={props => <List.Icon {...props} icon="information" />}
        />
        <List.Item
          title="Data Source"
          description="News API"
          left={props => <List.Icon {...props} icon="api" />}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
