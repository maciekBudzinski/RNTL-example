import React, {useState, useCallback, useEffect} from 'react';
import {
  Alert,
  Text,
  TextInput,
  Button,
  FlatList,
} from 'react-native';

import {Layout, ListItem} from 'components';
import axios from 'axios';

const useChuckNorrisJokeFetch = () => {
  const [text, setText] = useState('Hello World');
  const getTextFromServer = async () => {
    // Get response from server
    const response = await axios.get('https://api.chucknorris.io/jokes/random');

    // Set text
    setText(response.data.value);
  };

  useEffect(() => {
    getTextFromServer();
  }, []);

  return text;
};

const showEmptyInputAlert = () => {
  Alert.alert('Error', 'Can\'t add empty item', [{
    text: 'Ok',
  }]);
};

const App = ({defaultItems = []}) => {
  console.log('TCL: App -> App');
  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState(defaultItems);

  const joke = useChuckNorrisJokeFetch();
  console.log('TCL: App -> joke', joke);

  const handleInputChange = useCallback((text)=> {
    setItemName(text);
  }, []);

  const addItem = useCallback((isAsync = false)=> {
    if (itemName) {
      setItems([...items, {id: Date.now(), name: (isAsync && 'async') + itemName}]);
      setItemName('');
    }
    else {
      showEmptyInputAlert();
    }
  }, [itemName, items]);

  const addAsyncItem = () => (
    new Promise((resolve)=>{
      setTimeout(()=>{
        addItem(true);
        resolve();
      }, 500);
    })
  );

  const deleteItem = useCallback((itemId)=> {
    setItems(items.filter(({id})=> id !== itemId));
  }, [items]);

  const handleListItemUnmount = (id) => {
    console.log(`List item ${id} unmount`);
  };

  const handleChangeName = (name)=>{
    console.log(`Name changed to ${name}`);
  };

  const isListEmpty = items.length === 0;

  return (
    <Layout>
      <Text testID="testID">Todo App</Text>
      <Text>{joke}</Text>
      <TextInput placeholder="Todo name" value={itemName} onChangeText={handleInputChange} />
      <Button title="Add item" onPress={addItem} />
      <Button title="Add async item" onPress={addAsyncItem} />
      {isListEmpty && <Text>No items</Text>}
      <FlatList
        data={items}
        keyExtractor={({id})=> id.toString()}
        renderItem={({item})=>
          (
            <ListItem
              handleNameChange={handleChangeName}
              handleUnmount={handleListItemUnmount}
              deleteItem={deleteItem}
              {...item}
            />)}
      />
    </Layout>
  );
};

export default App;
