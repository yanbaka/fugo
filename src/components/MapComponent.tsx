import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { Card, Text, Button, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

interface MapComponentProps {
  initialRegion?: Region;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  initialRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }
}) => {
  const [region, setRegion] = useState<Region>(initialRegion);
  const [currentLocation, setCurrentLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [markers, setMarkers] = useState([
    {
      id: '1',
      coordinate: {
        latitude: 35.6762,
        longitude: 139.6503,
      },
      title: '東京駅',
      description: '日本の首都の中心駅',
    },
  ]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('位置情報の許可が必要です', '現在地を表示するには位置情報の許可が必要です。');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error('位置情報の取得に失敗しました:', error);
      Alert.alert('エラー', '位置情報の取得に失敗しました。');
    }
  };

  const moveToCurrentLocation = () => {
    if (currentLocation) {
      const newRegion = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
    } else {
      getCurrentLocation();
      Alert.alert('位置情報を取得中です', '少し待ってから再試行してください。');
    }
  };

  const handleMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    const newMarker = {
      id: Date.now().toString(),
      coordinate,
      title: 'カスタムマーカー',
      description: `緯度: ${coordinate.latitude.toFixed(4)}, 経度: ${coordinate.longitude.toFixed(4)}`,
    };
    setMarkers([...markers, newMarker]);
  };

  const resetToTokyo = () => {
    setRegion(initialRegion);
    setMarkers([
      {
        id: '1',
        coordinate: {
          latitude: 35.6762,
          longitude: 139.6503,
        },
        title: '東京駅',
        description: '日本の首都の中心駅',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.title}>
            マップ機能
          </Text>
          <Text variant="bodySmall" style={styles.description}>
            マップをタップしてマーカーを追加できます
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
          onPress={handleMapPress}
          showsUserLocation={true}
          showsMyLocationButton={false} // デフォルトボタンを無効化
          mapType="standard"
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        
        {/* マップ内の現在地ボタン */}
        <FAB
          icon={() => <Ionicons name="locate" size={20} color="white" />}
          style={styles.locationFab}
          onPress={moveToCurrentLocation}
          size="small"
        />
      </View>

      <Card style={styles.controlCard}>
        <Card.Content>
          <Button
            mode="outlined"
            onPress={resetToTokyo}
            icon={() => <Ionicons name="refresh" size={20} color="#2196f3" />}
            style={styles.resetButton}
          >
            東京駅に戻る
          </Button>
          <Text variant="bodySmall" style={styles.markerCount}>
            マーカー数: {markers.length}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginBottom: 8,
    elevation: 4,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: '#666',
  },
  mapContainer: {
    flex: 1,
    margin: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationFab: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#2196f3',
    zIndex: 1000,
  },
  controlCard: {
    margin: 16,
    marginTop: 8,
    elevation: 4,
  },
  resetButton: {
    marginBottom: 8,
  },
  markerCount: {
    textAlign: 'center',
    color: '#666',
  },
});

export default MapComponent;