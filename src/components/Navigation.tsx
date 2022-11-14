export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Profile: { name: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
    Root: undefined;
};