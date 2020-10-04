import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return randomNumber;
}

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
)

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentMin = useRef(1);
  const currentMax = useRef(100);
  const [availableDeviceHeight, setavAilableDeviceHeight] = useState(Dimensions.get('window').height);
  const [availableDeviceWidth, setavAilableDeviceWidth] = useState(Dimensions.get('window').width);


  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
      return;
    }

    if (direction === 'lower')
      currentMax.current = currentGuess;
    else
      currentMin.current = currentGuess + 1;

    const newNumber = generateRandomBetween(currentMin.current, currentMax.current, currentGuess);
    setCurrentGuess(newNumber);
    setPastGuesses(prevGuesses => [newNumber.toString(), ...prevGuesses]);
  };

  useEffect(() => {
    const updateLayout =() => {
      setavAilableDeviceHeight(Dimensions.get('window').height);
      setavAilableDeviceWidth(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  })

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <TitleText>Opponent's Guess</TitleText>
        <View style={styles.controls}>
          <MainButton onPress={() => nextGuessHandler('lower')}>
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={() => nextGuessHandler('greater')}>
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>
        </View>
        {/* <View style={styles.listContainer}> */}
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, i) => renderListItem(guess, pastGuesses.length - i))}
        </ScrollView> */}
        <FlatList
          data={pastGuesses}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => renderListItem(item, pastGuesses.length - index)}
          contentContainerStyle={styles.list}
          style={styles.listContainer}
        />
        {/* </View> */}
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TitleText>Opponent's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonsContainer}>
        <MainButton onPress={() => nextGuessHandler('lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler('greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      {/* <View style={styles.listContainer}> */}
      {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, i) => renderListItem(guess, pastGuesses.length - i))}
        </ScrollView> */}
      <FlatList
        data={pastGuesses}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => renderListItem(item, pastGuesses.length - index)}
        contentContainerStyle={styles.list}
        style={styles.listContainer}
      />
      {/* </View> */}
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%',
  },
  controls: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  listContainer: {
    width: Dimensions.get('window').width > 350 ? '60%' : '80%',
    flex: 1
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});

export default GameScreen;