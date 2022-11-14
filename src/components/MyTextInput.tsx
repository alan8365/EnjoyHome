
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput, Alert } from 'react-native';


export const MyTextInput = (props: any) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.inputContainer}>
            <Text
                style={styles.inputLabel}
            >
                {props.text}
            </Text>

            <TextInput
                style={[styles.inputs, isFocused ? styles.focusedInput : styles.unFocusedInput]}
                onFocus={() => {
                    setIsFocused(true)
                }}
                onBlur={() => {
                    setIsFocused(false)
                }}
                {...props}
            />
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