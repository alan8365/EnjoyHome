import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput } from 'react-native';

import Parent from "assets/Parent.svg"
import Child from "assets/Child.svg"

import { AuthContext } from 'contexts/auth-context'

export const HomeScreen = () => {
    const { signOut } = React.useContext(AuthContext);


    return (
        <View style={styles.container}>
            <Button title={'logout'} onPress={() => { signOut()}}></Button>
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
})