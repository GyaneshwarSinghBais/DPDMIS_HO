import React, { useState } from 'react';
import { View, Picker } from 'react-native';

const MyEXPDDL = () => {
  // Sample array of items for the dropdown
  const items = ['All','Under 1 Month', 'Under 2-3 Month', 'Under 4-6 Month'];

  // State variable to store the selected item
  const [selectedItem, setSelectedItem] = useState(items[0]);

  // Function to handle the item selection
  const handleItemChange = (itemValue) => {
    setSelectedItem(itemValue);
  };

  return (
    <View>
      <Picker
        selectedValue={selectedItem}
        onValueChange={handleItemChange}
      >
        {items.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>
    </View>
  );
};

export default MyEXPDDL;