import * as React from 'react';
import { registerRootComponent } from "expo";
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    DrawerContentComponentProps,
} from '@react-navigation/drawer';


import AsyncStorage from '@react-native-async-storage/async-storage';

import { WelcomeScreen } from 'components/Welcome'
import { LoginScreen } from 'components/Login'
import { RegisterScreen } from 'components/Register'
import { HomeScreen } from 'components/Home'

import { RootStackParamList } from 'components/Navigation'


import { AuthContext } from 'contexts/auth-context'

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { signOut } = React.useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList
                {...props}
            />
            <DrawerItem
                label="登出"
                onPress={() => signOut()}
            />
            {/* <DrawerItem
                label="Toggle drawer"
                onPress={() => props.navigation.toggleDrawer()}
            /> */}
        </DrawerContentScrollView>
    );
}

export default function App() {
    const [state, dispatch] = React.useReducer(
        (prevState: any, action: any) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                        userNickname: action.userNickname
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

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;
            let userNickname;

            try {
                userToken = await AsyncStorage.getItem('user-token');
                userNickname = await AsyncStorage.getItem(`@${userToken}-nickname`)
            } catch (e) {
                // Restoring token failed
            }

            dispatch({ type: 'RESTORE_TOKEN', token: userToken, userNickname: userNickname });
        };

        bootstrapAsync();
    }, []);


    const authContext = {
        signIn: async (accountName: string, userType: 'parent' | 'child') => {
            const userNickname = await AsyncStorage.getItem(`@${accountName}-nickname`)

            dispatch({ type: 'SIGN_IN', token: accountName, userNickname: userNickname });
        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        signUp: async (accountName: string) => {
            const userNickname = await AsyncStorage.getItem(`@${accountName}-nickname`)

            dispatch({ type: 'SIGN_IN', token: accountName, userNickname: userNickname });
        },
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Drawer.Navigator
                    useLegacyImplementation
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                >
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
                        <Drawer.Group>
                            <Drawer.Screen
                                name="Home"
                                component={HomeScreen}
                                options={{
                                    title: `Hello，${state.userNickname}！`,
                                    headerShadowVisible: false,
                                    headerTitleStyle: {
                                        fontSize: 20
                                    },
                                }}
                            />
                        </Drawer.Group>
                    )}
                </Drawer.Navigator>
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
