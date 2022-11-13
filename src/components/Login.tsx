import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Parent from "assets/Parent.svg"
import Child from "assets/Child.svg"

import { MyTextInput } from 'components/MyTextInput'

import { AuthContext } from 'contexts/auth-context'

const login = async (accountName: string, password: string) => {
    try {
        const value = await AsyncStorage.getItem(`@${accountName}`)
        if (value !== null) {
            // value previously stored
            if (value === password) {
                await AsyncStorage.setItem(`user-token`, `${accountName}`)
                return true
            }
            else {
            Alert.alert(
                '抱歉',
                '密碼錯誤'
            )
            }
        } else {
            Alert.alert(
                '抱歉',
                '登入失敗'
            )
        }
    } catch (e) {
        console.log(e)
    }

    return false
}


export const LoginScreen = () => {
    const [accountName, setAccountName] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <MyTextInput
                autoFocus={true}
                text="帳號"
                onChangeText={(newText: string) => { setAccountName(newText) }}
            />

            <MyTextInput
                text="密碼"
                onChangeText={(newText: string) => { setPassword(newText) }}
            />

            <Text
                style={styles.label}
            >
                選擇使用者
            </Text>

            <View style={styles.rowContainer}>
                <Parent
                    style={styles.img}
                    height={"169px"}
                    width={"169px"}
                    onPress={async () => {
                        const isLoginSucces = await login(accountName, password)

                        if (isLoginSucces) {
                            signIn(accountName, 'parent')
                        }
                    }}
                />
                <Child
                    style={styles.img}
                    height={"169px"}
                    width={"169px"}
                    onPress={async () => {
                        const isLoginSucces = await login(accountName, password)

                        if (isLoginSucces) {
                            signIn(accountName, 'child')
                        }
                    }}
                />
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
    }
})