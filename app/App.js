import React, { useState, useCallback } from 'react';
import {
  Alert,
  Text,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import { Layout, ListItem, Joke } from 'components';

const showEmptyInputAlert = () => {
  Alert.alert('Error', 'Can\'t add empty item', [{
    text: 'Ok',
  }]);
};

const App = ({ defaultItems = [] }) => {
  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState(defaultItems);

  const handleInputChange = useCallback((text) => {
    setItemName(text);
  }, []);

  const addItem = useCallback((isAsync = false) => {
    if (itemName) {
      setItems([...items, { id: Date.now(), name: (isAsync ? 'async' : '') + itemName }]);
      setItemName('');
    }
    else {
      showEmptyInputAlert();
    }
  }, [itemName, items]);

  const addAsyncItem = () => (
    new Promise((resolve) => {
      setTimeout(() => {
        addItem(true);
        resolve();
      }, Math.random() * 1000);
    })
  );

  const deleteItem = useCallback((itemId) => {
    setItems(items.filter(({ id }) => id !== itemId));
  }, [items]);

  const isListEmpty = items.length === 0;

  return (
    <Layout>
      <Text testID="testID">Todo App</Text>
      <TextInput placeholder="Todo name" value={itemName} onChangeText={handleInputChange} />
      <Button title="Add item" onPress={addItem} />
      <Button title="Add async item" onPress={addAsyncItem} />
      {isListEmpty && <Text>No items</Text>}
      <FlatList
        data={items}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) =>
          (
            <ListItem
              deleteItem={deleteItem}
              {...item}
            />)}
      />
      <Joke />
    </Layout>
  );
};

export default App;
