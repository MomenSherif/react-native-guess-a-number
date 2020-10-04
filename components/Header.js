import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = ({ title }) => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIos,
          android: styles.headerAndroid
        })
      }}>
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIos: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,

  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: 'transparent',
    borderBottomWidth: 10,
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? Colors.primary : 'white'
  }
});

export default Header;