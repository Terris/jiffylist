import { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react';
import Realm, { User } from 'realm';
import app from '../lib/Realm';

type AuthCredentials = {
  email: string;
  password: string;
};

interface AuthContextProps {
  user: User | null;
  error: string | null;
  setError: (error: string | null) => void;
  loading: boolean;
  signUp: ({ email, password }: AuthCredentials) => void;
  signIn: ({ email, password }: AuthCredentials) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  error: null,
  setError: () => null,
  loading: false,
  signUp: () => null,
  signIn: () => null,
  signOut: () => null,
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const realmRef = useRef<Realm | null>(null);
  const [user, setUser] = useState<User | null>(app.currentUser);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const config = {
      sync: {
        user,
        partitionValue: `user=${user.id}`,
      },
    };

    // Open a realm with the logged in user's partition value
    Realm.open(config as Realm.Configuration).then((userRealm) => {
      realmRef.current = userRealm;
    });

    return () => {
      const userRealm = realmRef.current;
      if (userRealm) {
        userRealm.close();
        realmRef.current = null;
      }
    };
  }, [user]);

  const signIn = async ({ email, password }: AuthCredentials) => {
    if (email && password) {
      try {
        setLoading(true);
        const creds = Realm.Credentials.emailPassword(email, password);
        const newUser = await app.logIn(creds);
        setUser(newUser);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Email and password can't be empty");
    }
  };

  const signUp = async ({ email, password }: AuthCredentials) => {
    if (email && password) {
      try {
        setError(null);
        setLoading(true);
        await app.emailPasswordAuth.registerUser({ email, password });
        signIn({ email, password });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Email and password can't be empty");
    }
  };

  const signOut = () => {
    if (user == null) {
      return;
    }
    user.logOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        setError,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
