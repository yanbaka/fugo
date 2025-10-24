import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../styles/theme';

const TileBackground = () => {
  const { width, height } = Dimensions.get('window');
  const tileSize = 20;
  const tilesX = Math.ceil(width / tileSize) + 1;
  const tilesY = Math.ceil(height / tileSize) + 1;

  const tiles = [];
  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      const isAlternate = (x + y) % 2 === 1;
      tiles.push(
        <View
          key={`${x}-${y}`}
          style={[
            styles.tile,
            {
              left: x * tileSize,
              top: y * tileSize,
            },
            isAlternate && styles.tileAlternate,
          ]}
        />
      );
    }
  }

  return <View style={styles.container}>{tiles}</View>;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.lightBeige,
  },
  tile: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: COLORS.tileLight,
    borderWidth: 0.5,
    borderColor: COLORS.tileStroke,
  },
  tileAlternate: {
    backgroundColor: COLORS.tileDark,
  },
});

export default TileBackground;
