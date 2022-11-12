import React from "react";

const auths = {
    signIn: async (accountName: string, userType: 'parent' | 'child') => { },
    signOut: () => { },
    signUp: async (accountName: string) => { },
}

export const AuthContext = React.createContext(auths);
