import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Portal,
  Modal,
  List,
  Divider,
  IconButton,
  Text,
  Surface,
} from 'react-native-paper';

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

interface MarkerListModalProps {
  visible: boolean;
  markers: MarkerData[];
  onDismiss: () => void;
  onMarkerPress: (coordinate: { latitude: number; longitude: number }) => void;
  onDeleteMarker: (markerId: string) => void;
}

const MarkerListModal: React.FC<MarkerListModalProps> = ({
  visible,
  markers,
  onDismiss,
  onMarkerPress,
  onDeleteMarker,
}) => {
  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <Surface style={styles.modalSurface} elevation={4}>
          {/* ヘッダー */}
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text variant="headlineSmall" style={styles.title}>
                マーカー一覧
              </Text>
              <Text variant="bodySmall" style={styles.subtitle}>
                {markers.length}個のマーカー
              </Text>
            </View>
            <IconButton icon="close" onPress={onDismiss} size={24} />
          </View>

          <Divider />

          {/* マーカー一覧 */}
          <ScrollView
            style={styles.markerList}
            showsVerticalScrollIndicator={false}
          >
            {markers.length === 0 ? (
              <View style={styles.emptyState}>
                <Text variant="bodyMedium" style={styles.emptyText}>
                  マーカーがありません
                </Text>
                <Text variant="bodySmall" style={styles.emptySubText}>
                  マップをタップしてマーカーを追加してください
                </Text>
              </View>
            ) : (
              markers.map((marker, index) => (
                <View key={marker.id}>
                  <List.Item
                    title={marker.title}
                    description={`${marker.description}\n追加日時: ${formatTimestamp(marker.timestamp)}`}
                    left={(props) => (
                      <List.Icon {...props} icon="map-marker" color="#e74c3c" />
                    )}
                    right={(props) => (
                      <View style={styles.markerActions}>
                        <IconButton
                          {...props}
                          icon="crosshairs-gps"
                          size={20}
                          onPress={() => onMarkerPress(marker.coordinate)}
                        />
                        {marker.id !== '1' && (
                          <IconButton
                            {...props}
                            icon="delete"
                            size={20}
                            iconColor="#e74c3c"
                            onPress={() => onDeleteMarker(marker.id)}
                          />
                        )}
                      </View>
                    )}
                    onPress={() => onMarkerPress(marker.coordinate)}
                  />
                  {index < markers.length - 1 && <Divider />}
                </View>
              ))
            )}
          </ScrollView>
        </Surface>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
  },
  modalSurface: {
    backgroundColor: 'white',
    borderRadius: 12,
    maxHeight: '80%', // 80%から90%に変更
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingRight: 8,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
  },
  markerList: {
    height: '100%',
    paddingHorizontal: 8,
  },
  markerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#666',
  },
  emptySubText: {
    textAlign: 'center',
    color: '#999',
  },
});

export default MarkerListModal;
