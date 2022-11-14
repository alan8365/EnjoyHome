import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput } from 'react-native';
import { Calendar, Agenda, AgendaList } from 'react-native-calendars';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerActions } from '@react-navigation/native';


import Parent from "assets/Parent.svg"
import Child from "assets/Child.svg"

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

export const HomeScreen = ({ route, navigation }: Props) => {
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
                    // headerText: {
                    // },
                }}
            />

            <View>
                {/* <Text>今日事項</Text> */}

                {/* <Agenda /> */}
            </View>
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

        elevation: 20,
        shadowColor: '#60da87',

        borderRadius: 30,
    }
})