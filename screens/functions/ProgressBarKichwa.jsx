import React, { Component } from 'react';
import ProgressBar from 'react-native-progress/Bar';

export default class ProgressBarKichwa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      porcentaje: props.porcentaje, // inicializamos el estado con el valor de la prop porcentaje
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.porcentaje !== this.props.porcentaje) { // verificamos si la prop porcentaje ha cambiado
      this.setState({ porcentaje: this.props.porcentaje }); // actualizamos el estado con el nuevo valor de la prop
    }
  }

  render() {
    return (
      <ProgressBar
        progress={this.state.porcentaje / 100}
        width={300}
        height={25}
        color={'#89D630'}
        unfilledColor={'#C8C8C8'}
        borderWidth={0}
        style={{ borderRadius: 25 }}
      />
    );
  }
}
