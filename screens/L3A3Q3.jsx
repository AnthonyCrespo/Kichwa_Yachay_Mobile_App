import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const PairButtons = () => {
    const [selectedLeftButton, setSelectedLeftButton] = useState(null);
    const [selectedRightButton, setSelectedRightButton] = useState(null);
  
    const handlePress = (buttonValue, buttonPosition) => {
      if (buttonPosition === 'left') {
        setSelectedLeftButton(buttonValue);
      } else {
        setSelectedRightButton(buttonValue);
      }
  
      if (selectedLeftButton !== null && selectedRightButton !== null) {
        // If both buttons have been selected, check if they match
        if (isMatch()) {
          alert('¡Correcto!');
        } else {
          // If they don't match, reset the selections
          setSelectedLeftButton(null);
          setSelectedRightButton(null);
        }
      }
    };
  
    const isMatch = () => {
      // Specify the correct combination of buttons here
      return (selectedLeftButton === 'Button 1' && selectedRightButton === 'Button 2',
              selectedLeftButton === 'Button 3' && selectedRightButton === 'Button 4'
  
      )
    };
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', margin: 20 }}>
          <TouchableOpacity
            style={[styles.button, selectedLeftButton === 'Button 1' && styles.selected]}
            onPress={() => handlePress('Button 1', 'left')}
            disabled={selectedLeftButton !== null}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Button 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, selectedLeftButton === 'Button 3' && styles.selected]}
            onPress={() => handlePress('Button 3', 'left')}
            disabled={selectedLeftButton !== null}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Button 3</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', margin: 20 }}>
          <TouchableOpacity
            style={[styles.button, selectedRightButton === 'Button 2' && styles.selected]}
            onPress={() => handlePress('Button 2', 'right')}
            disabled={selectedLeftButton === null || selectedRightButton !== null}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Button 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, selectedRightButton === 'Button 4' && styles.selected]}
            onPress={() => handlePress('Button 4', 'right')}
            disabled={selectedLeftButton === null || selectedRightButton !== null}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Button 4</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  

const styles = {
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  selected: {
    backgroundColor: 'green',
    color: 'white',
  },
};

export default PairButtons;

