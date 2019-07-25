import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ListItem} from 'components';
import { render, fireEvent, debug } from 'react-native-testing-library';

describe('Components: ListItem', () => {
  const defaultProps = {
    id: 12345,
    name: 'Todo item',
    deleteItem: jest.fn(),
  };
  it('Should match snapshot', () => {
    const wrapper = render(<ListItem {...defaultProps}  />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render delete button', ()=> {
    const wrapper = render(<ListItem {...defaultProps}  />);
    const deleteText = wrapper.getByText('Delete');
    expect(deleteText).toBeTruthy();
  });

  it('Should render red delete button', () => {
    const wrapper = render(<ListItem {...defaultProps}  />);

    const deleteText = wrapper.getByText('Delete');
    const deleteTextStyle = deleteText.props.style;

    expect(deleteTextStyle.color).toBe('red');
  });



  it('Should call deleteItem function with key paramater', () => {
    const wrapper = render(<ListItem {...defaultProps}  />);
    const button = wrapper.getByType(TouchableOpacity);
    fireEvent.press(button);
    expect(defaultProps.deleteItem).toHaveBeenCalledTimes(1);
    expect(defaultProps.deleteItem).toHaveBeenCalledWith(defaultProps.id);
  });
});
