import React from 'react';
import { CirclePicker } from 'react-color';

class Component extends React.Component {

  

  state = {
    background: '#fff',
  }

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };


  render() {
    return (
      <CirclePicker 
      color={
        this.state.background
      }
      onChangeComplete={
        this.handleChangeComplete
      }
      />
    );
  }
}