import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import theme from '../libs/theme';

const Switch = (props) => {
  const { options, selected, onChange } = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 180,
      }}
    >
      {options.map((option, index) => (
        <TouchableOpacity
          key={index.toString()}
          onPress={() => onChange(option)}
          style={{
            flex: 1,
            backgroundColor: option === selected ? 'black' : 'white',
            borderTopLeftRadius: index === 0 ? 20 : 0,
            borderBottomLeftRadius: index === 0 ? 20 : 0,
            borderTopRightRadius: index === 1 ? 20 : 0,
            borderBottomRightRadius: index === 1 ? 20 : 0,
            padding: 10,
          }}
        >
          <Text
            style={{
              color: option === selected ? 'white' : 'black',
              textAlign: 'center',
            }}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Switch;

Switch.propTypes = {
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
