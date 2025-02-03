import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share, Dimensions, FlatList } from 'react-native';
import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get("window");

const postVideos = [
  require("../../assets/images/reels (1).mp4"),
  require("../../assets/images/reels (2).mp4"),
  require("../../assets/images/reels (3).mp4"),
  require("../../assets/images/reels (4).mp4"),
];

const captions = [
  'Exploring nature 🌿',
  'Life is an adventure 💫',
  'Coding is life 💻',
  'Adventure awaits 🌍',
];

const usernames = ['Alice', 'Bob', 'Charlie', 'David'];

const InstagramReelsPage = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef([]); 

  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentVideoIndex(index);
    }
  };

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 90, // Only switch when 90% of the reel is visible
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing post on Do Gram!',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <FlatList
      data={postVideos}
      keyExtractor={(item, index) => index.toString()}
      pagingEnabled
      horizontal={false}
      showsVerticalScrollIndicator={false}
      snapToAlignment="start"
      snapToInterval={height} // Each reel takes up full screen
      decelerationRate="fast"
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      renderItem={({ item, index }) => (
        <View style={styles.postContainer}>
          <Video
            ref={(ref) => (videoRefs.current[index] = ref)}
            source={item}
            style={styles.video}
            resizeMode="cover"
            isLooping
            shouldPlay={index === currentVideoIndex}
          />

          {/* Overlay Controls */}
          <View style={styles.overlayControls}>
            <View style={styles.leftControls}>
              <TouchableOpacity style={styles.reactionButton}>
                <FontAwesome name="heart" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.reactionButton}>
                <Ionicons name="chatbubble-outline" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.reactionButton} onPress={handleShare}>
                <Entypo name="share" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.rightControls}>
              <Text style={styles.username}>{usernames[index]}</Text>
              <Text style={styles.caption}>{captions[index]}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width,
    height, // Each reel takes up full screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width,
    height,
  },
  overlayControls: {
    position: 'absolute',
    width,
    height,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  leftControls: {
    position: 'absolute',
    bottom: 100,
    left: 20,
  },
  reactionButton: {
    marginBottom: 20,
  },
  rightControls: {
    position: 'absolute',
    bottom: 100,
    right: 20,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  caption: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
});

export default InstagramReelsPage;
