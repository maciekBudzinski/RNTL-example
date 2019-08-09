import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

const useChuckNorrisJokeFetch = () => {
  const [joke, setJoke] = useState('');

  const getTextFromServer = async () => {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    setJoke(response.data.value);
  };

  useEffect(() => {
    getTextFromServer();
  }, []);

  return joke;
};

const Joke = () => {
  const jokeText = useChuckNorrisJokeFetch();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{jokeText}</Text>
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
});

export default Joke;
