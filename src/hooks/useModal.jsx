import React, { useCallback, useState } from 'react';
import { Modal, View, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';

//사용법
//const { Modal, open, close } = useModal();
//onPress={open}하면 <Modal>열림. close하면 닫힘

const useModal = ({ useBlur = true } = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    Modal: isOpen
      ? ({ children }) => (
          <Modal
            transparent
            visible={isOpen}
            animationType="fade"
            onRequestClose={useBlur ? close : undefined}
          >
            <TouchableWithoutFeedback onPress={useBlur ? close : undefined}>
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    {children}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )
      : () => null,
    open,
    close,
    isOpen,
  };
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {

    backgroundColor: '#fff',
    borderRadius: 8,
  },
});

export default useModal;
