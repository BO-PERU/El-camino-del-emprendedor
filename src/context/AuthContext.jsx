import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we have a mocked user in localStorage for testing
    const mockedUser = localStorage.getItem('mockUser');
    if (mockedUser) {
      setUser(JSON.parse(mockedUser));
      setLoading(false);
      return;
    }

    const enrichUser = (authUser) => {
      if (!authUser) return null;
      return {
        ...authUser,
        role: authUser.email === 'mario@bo.com.pe' ? 'admin' : 'user'
      };
    };

    // Check active session (Real Supabase)
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      // If error (like no URL configured), just bypass
      if (error) {
        setLoading(false);
        return;
      }
      setUser(enrichUser(session?.user));
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!localStorage.getItem('mockUser')) {
        setUser(enrichUser(session?.user));
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const loginWithMagicLink = async (email) => {
    // MOCK LOGIN FOR DEVELOPMENT
    // If running without Supabase keys, we bypass auth and simulate a user
    if (import.meta.env.VITE_SUPABASE_URL === undefined || email === 'mario@bo.com.pe' || email === 'demo@demo.com') {
      const role = email === 'mario@bo.com.pe' ? 'admin' : 'user';
      const mockUser = { id: 'mock-123', email, role };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setUser(mockUser);
      return { error: null, mock: true };
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    return { error };
  };

  const logout = async () => {
    localStorage.removeItem('mockUser');
    setUser(null);
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithMagicLink, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
