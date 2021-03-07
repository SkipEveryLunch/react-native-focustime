import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return (
    <Text
      style={item.status > 1 ? styles.historyItemRed : styles.historyItemGreen}>
      {item.subject}
    </Text>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems:"center" }}>
        <Text style={styles.title}>Things we've focused on</Text>
        {!!focusHistory.length && (
          <>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItemRed: {
    color: 'red',
    fontSize: fontSizes.md,
  },
  historyItemGreen: {
    color: 'green',
    fontSize: fontSizes.md,
  },
  title: {
    fontSize: fontSizes.lg,
    color: 'white',
  },
  clearContainer:{
    
  }
});
