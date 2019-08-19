import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import { ListItem } from 'components';

describe('Components: ListItem', () => {
  const defaultProps = {
    id: 12345,
    name: 'Todo item',
    deleteItem: jest.fn(),
    handleUnmount: jest.fn(),
    handleNameChange: jest.fn(),
  };

  beforeEach(()=>{
    defaultProps.deleteItem.mockClear();
    defaultProps.handleUnmount.mockClear();
    defaultProps.handleNameChange.mockClear();
  });

  //queryByText
  it('Should render red delete button', () => {
    const wrapper = render(<ListItem {...defaultProps} />);
    const deleteText = wrapper.getByText('Delete');
    const deleteTextStyle = deleteText.props.style;

    expect(deleteTextStyle.color).toBe('red');
  });

  //fire event
  it('Should call deleteItem function with key parameter', () => {
    const wrapper = render(<ListItem {...defaultProps} />);
    const button = wrapper.getByText('Delete');

    fireEvent.press(button);
    // fireEvent(button, 'press');

    expect(defaultProps.deleteItem).toHaveBeenCalledWith(defaultProps.id);
  });

  // unmount
  it('should call unmount function', ()=> {
    const wrapper = render(<ListItem {...defaultProps} />);

    wrapper.unmount();

    expect(defaultProps.handleUnmount).toHaveBeenCalledTimes(1);
  });

  //update
  it.only('should call handleNameChange', ()=>{
    const wrapper = render(<ListItem {...defaultProps} />);

    wrapper.rerender(<ListItem {...defaultProps} name={'new name'} />);
    // wrapper.update(<ListItem {...defaultProps} name={'new name'} />);

    expect(defaultProps.handleNameChange).toHaveBeenCalledWith(defaultProps.name);
  });
});

