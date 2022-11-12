import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import Register from "assets/Register.svg"

import { MyTextInput } from 'components/MyTextInput'

import { AuthContext } from 'contexts/auth-context'


export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Profile: { name: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
};


type Props = NativeStackScreenProps<RootStackParamList>;

export const RegisterScreen = ({ route, navigation }: Props) => {
    const [nickname, setNickname] = useState('');
    const [accountName, setAccountName] = useState('');
    const [password, setPassword] = useState('');

    const { signUp } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <MyTextInput
                autoFocus={true}
                text="暱稱"
                onChangeText={(newText: string) => { setNickname(newText) }}
            />

            <MyTextInput
                text="帳號"
                onChangeText={(newText: string) => { setAccountName(newText) }}
            />

            <MyTextInput
                text="密碼"
                onChangeText={(newText: string) => { setPassword(newText) }}
            />

            <Register
                style={styles.img}
                height={"130px"}
                width={"132px"}
            />

            <TouchableOpacity
                style={[styles.button]}
                onPress={async () => {
                    try {
                        await AsyncStorage.setItem(`@${accountName}`, password)
                        await AsyncStorage.setItem(`@${accountName}-nickname`, nickname)

                        Alert.alert(
                            '恭喜',
                            '註冊成功',
                        )

                        signUp(accountName)
                    } catch (e) {
                        // saving error
                        console.log(e)
                    }
                }}
            >
                <Text style={[styles.buttonText]}>註冊</Text>
            </TouchableOpacity>

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
    inputContainer: {
        marginBottom: 20
    },
    inputLabel: {
        fontSize: 20,
        color: 'black',

        marginLeft: 10,

        width: 276,
    },
    inputs: {
        height: 40,
        width: 276,
        margin: 12,
        borderBottomWidth: 1,
    },
    focusedInput: {
        borderColor: '#FDCC4E',
    },
    unFocusedInput: {
        borderColor: 'black',
    },
    label: {
        fontSize: 18,
        color: '#8c6239',

        borderBottomWidth: 1,
        borderColor: '#8c6239',

        width: 128,

        textAlign: 'center',
    },
    rowContainer: {
        flexDirection: "row",
    },
    img: {
        margin: 5
    },
    button: {
        width: 276,
        height: 53,

        marginTop: 10,

        paddingTop: 10,
        paddingBottom: 10,

        borderRadius: 30,
        borderWidth: 1,

        backgroundColor: '#60da87',
        borderColor: 'white'
    },
    buttonText: {
        textAlign: 'center',
        justifyContent: 'center',

        fontSize: 28,
        color: 'white',
    },
})