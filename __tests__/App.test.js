import React from 'react';
import {Button, TouchableOpacity} from 'react-native';
import {ListItem} from 'components';
import App from '../App';
import { render, debug, fireEvent, waitForElement } from 'react-native-testing-library';

describe('App', () => {
  it('Should match snapshot', () => {
    const wrapper = render(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should add item correctly', ()=>{
    const newTodoName = 'Test todo';

    const wrapper = render(<App />);

    const textInput = wrapper.getByPlaceholder('Todo name');
    fireEvent.changeText(textInput, newTodoName);

    const addButton = wrapper.getByType(Button);
    fireEvent.press(addButton);

    expect(wrapper.getByType(ListItem)).toBeTruthy();
    expect(wrapper.getByText(newTodoName)).toBeTruthy();
  });

  it('Should delete items', ()=> {
    const props = {
      defaultItems : [{
        id: 123,
        name: 'Todo 123',
      },
      {
        id: 456,
        name: 'Todo 456',
      },
      ],
    };

    const wrapper = render(<App {...props} />);
    const deleteButtons = wrapper.getAllByText('Delete');
    fireEvent.press(deleteButtons[0]);
    expect(wrapper.getAllByType(ListItem).length).toBe(1);
    expect(wrapper.getAllByText('Todo 456').length).toBe(1);
  });
});
