import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/usersService";
import toast from "react-hot-toast";
import { LaunchScreen } from '../../components/LaunchScreen';
interface AuthContextValue {
    singnedIn: boolean;
    singnin(accessToken: string): void;
    singnout(accessToken ?: string): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [singnedIn, setSingnedIn] = useState<boolean>(() => {
        const storeAccessToken = localStorage.getItem(
            localStorageKeys.ACCESS_TOKEN
        );
        return !!storeAccessToken;
    });


    const singnin = useCallback((accessToken: string) => {
        console.log("SETOUUU O TKenn", accessToken);
        localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
        setSingnedIn(true);
    }, []);

    const singnout = useCallback(() => {
        localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
        setSingnedIn(false);
    }, []);

    
    const { isError, isFetching, isSuccess } = useQuery({
      queryKey: ["users", "me"],
      queryFn: () => userService.me(),
      enabled: singnedIn,
      staleTime: Infinity,
    });

    useEffect(() => {
        if (isError) {
            toast.error("Sua sessão expirou!");
            singnout();
        }
    }, [isError, singnout]);

    return (
      <AuthContext.Provider
        value={{ singnedIn: isSuccess && singnedIn, singnin, singnout }}
      >
        <LaunchScreen isLoading={false} />
        {!isFetching && children}
      </AuthContext.Provider>
    );
}
