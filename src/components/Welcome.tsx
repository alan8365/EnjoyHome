import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import Home from "assets/Home.svg"
import Title from "assets/Title.svg"
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: { name: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};



type Props = NativeStackScreenProps<RootStackParamList>;

export const WelcomeScreen = ({ route, navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Home style={styles.coverImg} />
      <Title style={styles.titleImg} />

      <View style={styles.buttonView}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.halfButton, styles.registerButton]}
            onPress={() => navigation.navigate('Register')}
            accessibilityLabel="註冊按鈕"
          >
            <Text style={[styles.buttonText, styles.registerText]}>註冊</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.halfButton, styles.loginButton]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.buttonText, styles.loginText]}>登入</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.fullButton, styles.googleLoginButton]}
        // onPress={() => navigate('HomeScreen')}
        >
          <Text
            style={[styles.buttonText, styles.googleLoginText]}
          >Gmail登入</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.fullButton, styles.facebookLoginButton]}
        // onPress={() => navigate('HomeScreen')}
        >
          <Text style={[styles.buttonText, styles.facebookLoginText]}>Facebook登入</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImg: {
    position: 'absolute',

    top: 63,
  },
  titleImg: {
    position: 'absolute',

    width: 104,
    height: 70,
    top: 406,
  },
  buttonView: {
    position: 'absolute',

    top: 536,
    width: 500,

    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  halfButton: {
    width: 150,
    height: 50,

    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,

    paddingTop: 10,
    paddingBottom: 10,

    borderRadius: 30,
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',

    fontSize: 18,
  },
  registerButton: {
    backgroundColor: '#ffcd69',

    borderColor: '#ffffff'
  },
  registerText: {
    color: '#ffffff',
  },
  loginButton: {
    backgroundColor: '#ffffff',

    borderColor: '#000000'
  },
  loginText: {
    color: '#000000',
  },
  fullButton: {
    width: 320,
    height: 50,

    marginTop: 10,

    paddingTop: 10,
    paddingBottom: 10,

    borderRadius: 30,
    borderWidth: 1,
  },
  googleLoginButton: {
    backgroundColor: '#ffffff',

    borderColor: '#ea7e78'
  },
  googleLoginText: {
    color: '#ea7e78',
  },
  facebookLoginButton: {
    backgroundColor: '#ffffff',
    borderColor: '#7c90a4'
  },
  facebookLoginText: {
    color: '#7c90a4',
  },
});

// export default HomeScreen;