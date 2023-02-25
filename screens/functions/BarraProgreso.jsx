import React, { useState } from 'react';
import { View } from 'react-native';

const BarraProgreso = ({ porcentaje }) => {
  const [barraAncho, setBarraAncho] = useState(0);

  const onLayout = event => {
    const { width } = event.nativeEvent.layout;
    setBarraAncho(width * porcentaje);
  };

  return (
    <View style={{ height: 10, backgroundColor: 'lightgray' }}>
      <View
        style={{ height: 10, width: barraAncho, backgroundColor: 'green' }}
        onLayout={onLayout}
      />
    </View>
  );
};

export default BarraProgreso;