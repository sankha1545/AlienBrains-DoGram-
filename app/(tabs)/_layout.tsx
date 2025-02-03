
import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
export default function TabLayout() {
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true} 
      >
        <Stack />
      </ScrollView>
    </SafeAreaView>         
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    paddingBottom: 20, 
  },
});
