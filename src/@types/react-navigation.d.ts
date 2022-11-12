import type { SceneName } from "~src/@types/SceneName";



export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Home: undefined;
    Profile: { name: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList, 'Profile', 'Home'>;

// TODO Figure out the purpose of this code
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}