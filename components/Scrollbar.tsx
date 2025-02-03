import { ScrollView, Animated, View, StyleSheet, Dimensions } from 'react-native';
import React, { useRef, useState } from 'react';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ScrollableContent = () => {
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const scrollOffset = useRef(new Animated.Value(0)).current;

  // Calculate scrollbar thumb position
  const scrollbarHeight = containerHeight * (containerHeight / contentHeight);
  const scrollbarTop = scrollOffset.interpolate({
    inputRange: [0, contentHeight - containerHeight],
    outputRange: [0, containerHeight - scrollbarHeight],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffset } } }],
          { useNativeDriver: false }
        )}
        onContentSizeChange={(_, height) => setContentHeight(height)}
        onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
      >
        {/* Your content here (e.g., long list of items) */}
        <View style={styles.content} />
      </ScrollView>

      {/* Custom Scrollbar */}
      <View style={styles.scrollbarTrack}>
        <Animated.View
          style={[
            styles.scrollbarThumb,
            { height: scrollbarHeight, transform: [{ translateY: scrollbarTop }] },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    height: 2000, // Replace with dynamic content
  },
  scrollbarTrack: {
    width: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginRight: 4,
  },
  scrollbarThumb: {
    width: 6,
    backgroundColor: '#888',
    borderRadius: 3,
  },
});

export default ScrollableContent;