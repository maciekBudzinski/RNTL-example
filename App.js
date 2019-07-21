import React, {useState, useCallback} from 'react';
import {
  Alert,
  Text,
  TextInput,
  Button,
} from 'react-native';

import Layout from './components/Layout';
import ListItem from './components/ListItem';

const showEmptyInputAlert = () => {
  Alert.alert('Error', 'Can\'t add empty item', [{
    text: 'Ok',
  }]);
};

const App = () => {
  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState([]);

  const handleInputChange = useCallback((text)=> {
    setItemName(text);
  }, []);

  const addItem = useCallback(()=> {
    if (itemName) {
      setItems([...items, {id: Date.now(), name: itemName}]);
      setItemName('');
    }
    else {
      showEmptyInputAlert();
    }
  }, [itemName, items]);


  const deleteItem = useCallback((itemId)=> {
    setItems(items.filter(({id})=> id !== itemId));
  }, [items]);

  const isListEmpty = items.length === 0;
  return (
    <Layout>
      <Text>Todo App</Text>
      <TextInput placeholder="Todo name" value={itemName} onChangeText={handleInputChange} />
      <Button title="Add item" onPress={addItem} />
      {isListEmpty && <Text>No items</Text>}
      {items.map(({name, id})=> <ListItem key={id} name={name} id={id} deleteItem={deleteItem} />)}
    </Layout>
  );
};

export default App;
