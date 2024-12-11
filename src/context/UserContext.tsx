import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/index";

export interface UserContextType {
    user: User | null;
    setUser: (data: User) => void;
    login: (data: User) => void;
    logOut: () => void;
    showRighNav: boolean;
    setShowRighNav: (value: boolean) => void;
}

const initialState: UserContextType = {
    user: JSON.parse(localStorage.getItem("Nova_User") || "null"),
    login: () => null,
    setUser: () => null,
    logOut: () => null,
    showRighNav: false,
    setShowRighNav: () => null,
};

export const UserContext = createContext<UserContextType>(initialState);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [showRighNav, setShowRighNav] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("Nova_User") || "null") || null
    );
    const login = (data: User) => {
        setUser(data);
        localStorage.setItem("Nova_Token", data.token!);
        localStorage.setItem("Nova_User", JSON.stringify(data));
    };
    const logOut = () => {
        setUser(null);
        localStorage.removeItem("Nova_Token");
        localStorage.removeItem("Nova_User");
    };

    const state = {
        user,
        login,
        logOut,
        setUser,
        showRighNav,
        setShowRighNav,
    };
    useEffect(() => {
        if (user) {
            localStorage.setItem("Nova_Token", user.token!);
            localStorage.setItem("Nova_User", JSON.stringify(user));
        }
    }, [user]);
    return (
        <UserContext.Provider value={state}>{children}</UserContext.Provider>
    );
};
