import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { Card, Text, Button, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MarkerListModal from './MarkerListModal';
import ConfirmationModal from './ConfirmationModal';

const { width, height } = Dimensions.get('window');

interface MapComponentProps {
  initialRegion?: Region;
}

interface MarkerData {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
  timestamp: Date;
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
  const [markers, setMarkers] = useState<MarkerData[]>([
    {
      id: '1',
      coordinate: {
        latitude: 35.6762,
        longitude: 139.6503,
      },
      title: '東京駅',
      description: '日本の首都の中心駅',
      timestamp: new Date(),
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [pendingCoordinate, setPendingCoordinate] = useState<{latitude: number, longitude: number} | null>(null);

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
    setPendingCoordinate(coordinate);
    setConfirmationVisible(true);
  };

  const confirmAddMarker = () => {
    if (pendingCoordinate) {
      const newMarker: MarkerData = {
        id: Date.now().toString(),
        coordinate: pendingCoordinate,
        title: 'カスタムマーカー',
        description: `緯度: ${pendingCoordinate.latitude.toFixed(4)}, 経度: ${pendingCoordinate.longitude.toFixed(4)}`,
        timestamp: new Date(),
      };
      setMarkers([...markers, newMarker]);
    }
    setConfirmationVisible(false);
    setPendingCoordinate(null);
  };

  const cancelAddMarker = () => {
    setConfirmationVisible(false);
    setPendingCoordinate(null);
  };

  const moveToMarker = (markerCoordinate: {latitude: number, longitude: number}) => {
    const newRegion = {
      latitude: markerCoordinate.latitude,
      longitude: markerCoordinate.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    setRegion(newRegion);
    setModalVisible(false);
  };

  const deleteMarker = (markerId: string) => {
    if (markerId === '1') {
      Alert.alert('削除できません', '東京駅のマーカーは削除できません。');
      return;
    }
    setMarkers(markers.filter(marker => marker.id !== markerId));
  };

  const resetToTokyo = () => {
    setRegion(initialRegion);
  };

  const resetMarkers = () => {
    Alert.alert(
      'マーカーをリセット',
      'すべてのカスタムマーカーを削除しますか？',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: 'リセット',
          style: 'destructive',
          onPress: () => {
            setMarkers([
              {
                id: '1',
                coordinate: {
                  latitude: 35.6762,
                  longitude: 139.6503,
                },
                title: '東京駅',
                description: '日本の首都の中心駅',
                timestamp: new Date(),
              },
            ]);
          },
        },
      ]
    );
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
          showsMyLocationButton={false}
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
        
        <FAB
          icon={() => <Ionicons name="locate" size={20} color="white" />}
          style={styles.locationFab}
          onPress={moveToCurrentLocation}
          size="small"
        />

        <FAB
          icon={() => <Ionicons name="list" size={20} color="white" />}
          style={styles.listFab}
          onPress={() => setModalVisible(true)}
          size="small"
        />
      </View>

      <Card style={styles.controlCard}>
        <Card.Content>
          <View style={styles.buttonRow}>
            <Button
              mode="outlined"
              onPress={resetToTokyo}
              icon={() => <Ionicons name="home" size={20} color="#2196f3" />}
              style={styles.controlButton}
            >
              東京駅に戻る
            </Button>
            <Button
              mode="outlined"
              onPress={resetMarkers}
              icon={() => <Ionicons name="trash" size={20} color="#e74c3c" />}
              style={styles.controlButton}
              buttonColor="#fff"
              textColor="#e74c3c"
            >
              マーカーリセット
            </Button>
          </View>
        </Card.Content>
      </Card>

      <MarkerListModal
        visible={modalVisible}
        markers={markers}
        onDismiss={() => setModalVisible(false)}
        onMarkerPress={moveToMarker}
        onDeleteMarker={deleteMarker}
      />

      <ConfirmationModal
        visible={confirmationVisible}
        coordinate={pendingCoordinate}
        onConfirm={confirmAddMarker}
        onCancel={cancelAddMarker}
      />
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
  listFab: {
    position: 'absolute',
    top: 16,
    right: 70,
    backgroundColor: '#4caf50',
    zIndex: 1000,
  },
  controlCard: {
    margin: 16,
    marginTop: 8,
    elevation: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  controlButton: {
    flex: 1,
  },
});

export default MapComponent;