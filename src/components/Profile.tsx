
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';


class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Profile</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;