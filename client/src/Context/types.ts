export type User = {
    _id: string;
    userName: string;
    password: string,
    // Agrega otros campos que necesites
}

export type AuthContextType = {
    authUser: Array<User> | null;
    setAuthUser: (value: Array<User>) => void;
}