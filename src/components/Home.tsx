import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';

import Parent from "assets/Parent.svg"
import Child from "assets/Child.svg"

import { AuthContext } from 'contexts/auth-context'

export const HomeScreen = () => {
    const { signOut } = React.useContext(AuthContext);


    return (
        <View style={styles.container}>
            <Calendar
                style={styles.calendar}
                markedDates={{
                    '2022-11-16': { selected: true, },
                }}
                onDayPress={day => {
                    console.log(day)
                }}
                theme={{
                    selectedDayBackgroundColor: '#fee4cc',
                    selectedDayTextColor: 'black',
                    headerText: {
                    },
                
                }}
            />

            <Button title={'logout'} onPress={() => { signOut() }}></Button>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    calendar: {
        top: 30,

        width: 330,
        height: 335,

        elevation: 1.5,

        borderRadius: 30,
    }
})