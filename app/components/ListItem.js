import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ListItem = ({
  name,
  id,
  deleteItem,
  handleUnmount = () => console.log('unmount'),
  handleNameChange = itemName => console.log(itemName),
}) => {
  const handleDeletePress = useCallback(() => {
    deleteItem(id);
  }, [deleteItem, id]);

  useEffect(() => handleUnmount());

  useEffect(() => {
    handleNameChange(name);
  }, [handleNameChange, name]);

  return (
    <View testID="wrapper" style={styles.wrapper}>
      <Text style={styles.text}>{name}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleDeletePress}>
          <Text style={styles.deleteItem}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 22,
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  deleteItem: {
    color: 'red',
  },

});

export default ListItem;
