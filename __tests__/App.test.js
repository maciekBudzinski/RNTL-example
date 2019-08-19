import React from 'react';
import { ListItem } from 'components';
import App from '../app/App';
import {
  render,
  fireEvent,
  waitForElement,
} from 'react-native-testing-library';

describe('App', () => {

  //waitForElement
  it('Should add async item correctly', async () => {
    const newTodoName = 'Test todo';
    const wrapper = render(<App />);

    const textInput = wrapper.getByPlaceholder('Todo name');
    fireEvent.changeText(textInput, newTodoName);

    const addButton = wrapper.getByText('Add async item');
    fireEvent.press(addButton);

    // const newAsyncItem = await waitForElement(() => wrapper.getByText('async' + newTodoName), 2000, 200);
    // waitForElement(expectation, timeout, interval)
    expect(wrapper.getByText('async' + newTodoName)).toBeTruthy();
  });
});
