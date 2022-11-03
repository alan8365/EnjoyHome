import React, { Component } from 'react';
import { registerRootComponent } from "expo";
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeScreen } from 'components/Home'
import { LoginScreen } from 'components/Login'


type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Profile: { name: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home', 'Login'>;


const Stack = createNativeStackNavigator<RootStackParamList>();

// class HomeScreen extends Component<Props> {
//     render(): React.ReactNode {
//         return (
//             <Button
//                 title="Go to Jane's profile"
//                 onPress={() =>
//                     this.props.navigation.navigate('Profile', { name: 'Jane' })
//                 }
//             />
//         );
//     }

// }


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'Welcome',
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        title: '登入',
                        headerTitleAlign: 'center',
                        headerBackImageSource: require('assets/back-button.png'),
                        headerShadowVisible: false,
                        headerTitleStyle: {
                            fontSize: 35,
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


registerRootComponent(App);
