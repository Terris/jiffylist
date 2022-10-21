import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { UserProfileProps } from '../types/models.types';

type AuthCredentials = {
  email: string;
  password: string;
};

interface AuthContextProps {
  loading: boolean;
  error: string | null;
  session: Session | null;
  userProfile: UserProfileProps | null;
  signUp: ({ email, password }: AuthCredentials) => Promise<void>;
  signIn: ({ email, password }: AuthCredentials) => Promise<void>;
  signOut: () => void;
  updateUserProfile: ({ username, website, avatarUrl }: UserProfileProps) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  loading: false,
  error: null,
  session: null,
  userProfile: null,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => null,
  updateUserProfile: async () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileProps | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUserProfile({
          username: data.username,
          website: data.website,
          avatarUrl: data.avatar_url,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function signIn({ email, password }: AuthCredentials) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  }

  async function signUp({ email, password }: AuthCredentials) {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        throw error;
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    supabase.auth.signOut();
  }

  async function updateUserProfile({ username, website, avatarUrl }: UserProfileProps) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');
      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      };
      let { error } = await supabase.from('profiles').upsert(updates);
      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        error,
        session,
        userProfile,
        signUp,
        signIn,
        signOut,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
