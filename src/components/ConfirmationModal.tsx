import React from 'react';
import { StyleSheet } from 'react-native';
import { Portal, Modal, Card, Text, Button } from 'react-native-paper';

interface ConfirmationModalProps {
  visible: boolean;
  coordinate: { latitude: number; longitude: number } | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  coordinate,
  onConfirm,
  onCancel,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onCancel}
        contentContainerStyle={styles.modalContainer}
      >
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.title}>
              マーカーを追加しますか？
            </Text>
            {coordinate && (
              <Text variant="bodyMedium" style={styles.coordinates}>
                緯度: {coordinate.latitude.toFixed(4)}{'\n'}
                経度: {coordinate.longitude.toFixed(4)}
              </Text>
            )}
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button onPress={onCancel} mode="outlined">
              キャンセル
            </Button>
            <Button onPress={onConfirm} mode="contained">
              OK
            </Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  coordinates: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 8,
  },
  actions: {
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
});

export default ConfirmationModal;