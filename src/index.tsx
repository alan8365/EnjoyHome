import * as React from 'react';
import { registerRootComponent } from "expo";
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { WelcomeScreen } from 'components/Welcome'
import { LoginScreen } from 'components/Login'
import { RegisterScreen } from 'components/Register'
import { HomeScreen } from 'components/Home'

import { AuthContext } from 'contexts/auth-context'


export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Profile: { name: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
    const [state, dispatch] = React.useReducer(
        (prevState: any, action: any) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        userNickname: action.userNickname
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            userNickname: null,
            userType: null,
        }
    );

    const authContext = {
        signIn: async (accountName: string, userType: 'parent' | 'child') => {
            const userNickname = await AsyncStorage.getItem(`@${accountName}-nickname`)
            console.log(userNickname)

            dispatch({ type: 'SIGN_IN', token: accountName, userNickname: userNickname });
        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        signUp: async (accountName: string) => {
            const userNickname = await AsyncStorage.getItem(`@${accountName}-nickName`)

            dispatch({ type: 'SIGN_IN', token: accountName, userNickname: userNickname });
        },
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator>
                    {!state.userToken ? (
                        <>
                            <Stack.Screen
                                name="Welcome"
                                component={WelcomeScreen}
                                options={{
                                    headerShown: false
                                }}
                            />
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{
                                    title: '登入',
                                    headerTitleAlign: 'center',
                                    headerBackImageSource: require('assets/back-button-64.png'),
                                    headerShadowVisible: false,
                                    headerTitleStyle: {
                                        fontSize: 35,
                                    },
                                }}
                            />
                            <Stack.Screen
                                name="Register"
                                component={RegisterScreen}
                                options={{
                                    title: '註冊',
                                    headerTitleAlign: 'center',
                                    headerBackImageSource: require('assets/back-button-64.png'),
                                    headerShadowVisible: false,
                                    headerTitleStyle: {
                                        fontSize: 35,
                                    },
                                }}
                            />
                        </>
                    ) : (
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{
                                title: `Hello，${state.userNickname}`,
                                // headerShown: false
                                headerShadowVisible: false,
                                headerTitleStyle: {
                                    fontSize: 20
                                },
                            }}
                        />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
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
