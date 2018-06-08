import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const tabBarIcon = name => ({ tintColor }) => (
        <Icon
                style={{ backgroundColor: 'transparent' }}
                name={name}
                color={tintColor}
                size={24}
        />
);

export default tabBarIcon;