import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import BodyText from '../components/BodyText';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  useEffect(()=>{
    const updateDimensions = () => {
      setButtonWidth((Dimensions.get('window').width / 4));
    };

    Dimensions.addEventListener('change', updateDimensions);

    return () =>{
      Dimensions.removeEventListener('change', updateDimensions);
    }
  })


  const numberInbutHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHanlder = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99)
      return Alert.alert('Invalid number!', 'Number has to be between 1 and 99', [{
        text: 'Okay',
        style: 'destructive',
        onPress: resetInputHandler
      }]);
    setConfirmed(true);
    setEnteredValue('');
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss()
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputcontainer}>
              <BodyText>Select a Number</BodyText>
              <Input style={styles.input}
                maxLength={2}
                keyboardType='numeric'
                onChangeText={numberInbutHandler}
                value={enteredValue} />
              <View style={styles.buttonContainer}>
                <View style={{width: buttonWidth}}>
                  <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                </View>
                <View style={{width: buttonWidth}}>
                  <Button title="Confirm" onPress={confirmInputHanlder} color={Colors.primary} />
                </View>
              </View>
            </Card>
            {confirmed && (
              <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>
                  {selectedNumber}
                </NumberContainer>
                <MainButton onPress={() => onStartGame(selectedNumber)}>
                  START GAME
            </MainButton>
              </Card>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputcontainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default StartGameScreen;