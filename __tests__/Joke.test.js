import React from 'react';
import {
  render,
  flushMicrotasksQueue,
} from 'react-native-testing-library';
import axios from 'axios';
import { Joke } from 'components';

describe('Components: joke' ,()=>{
  it('should display fetched joke', async () => {
    const mockedJokeValue = 'Mocked unfunny joke';
    jest.spyOn(axios, 'get').mockReturnValue({ data: { value: mockedJokeValue } });

    const wrapper = render(<Joke />);

    // await flushMicrotasksQueue();

    const jokeNode = wrapper.getByText(mockedJokeValue);
    expect(jokeNode).toBeTruthy();
  });
});
