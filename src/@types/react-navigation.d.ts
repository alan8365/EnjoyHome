import type { SceneName } from "~src/@types/SceneName";


export type RootStackParamList = {
    Home: undefined;
    Profile: { name: string };
    Feed: { sort: 'latest' | 'top' } | undefined;
    // [SceneName.Home]: NavigatorScreenParams<undefined>;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile', 'Home'>;

// TODO Figure out the purpose of this code
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}