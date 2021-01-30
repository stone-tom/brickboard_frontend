import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import createPersistedState from 'use-persisted-state';
import {
  confirmAccount,
  login,
  logout,
  register,
} from '../util/api';

const AuthDispatchContext = createContext({});
const AuthStateContext = createContext({});

const usePersistedAuthState = createPersistedState('brickboard-user');

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state, { payload, type }) {
  switch (type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      throw new Error(`Unhandled action type ${type}`);
  }
}

function AuthProvider({ children }) {
  const [brickboardUser, saveBrickboardUser] = usePersistedAuthState(
    JSON.stringify(initialState),
  );
  const [state, dispatch] = useReducer(reducer, JSON.parse(brickboardUser));

  useEffect(() => {
    saveBrickboardUser(JSON.stringify(state));
  }, [state, saveBrickboardUser]);

  const performLogin = async (email, password) => {
    const { content, error } = await login(email, password);
    let user = {};
    if (error) {
      throw new Error(error);
    }
    if (content) {
      user = {
        name: content.data.attributes.display_name,
        admin: content.data.attributes.admin,
        avatar: content.data.attributes.avatar,
      };
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user } });
    }
  };
  const performLogout = async () => {
    const { error } = await logout();
    if (error) {
      throw new Error(error);
    }
    dispatch({ type: 'LOGOUT', payload: null });
  };

  const performSignup = async (email, displayName, password) => {
    const { content, error } = await register(email, displayName, password);
    if (error) {
      throw new Error(error);
    }
    return content;
  };

  const performAccountConfirmation = async (code: string) => {
    const { content, error } = await confirmAccount(code);

    if (error) {
      throw new Error(error);
    }
    const user = {
      name: content.data.attributes.display_name,
      admin: content.data.attributes.admin,
      avatar: content.data.attributes.avatar,
    };
    return user;
  };

  return (
    <AuthDispatchContext.Provider
      value={{
        performLogin,
        performLogout,
        performSignup,
        performAccountConfirmation,
      }}
    >
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
}

function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useAuthDispatch is not working, use it within an AuthProvider',
    );
  }
  return context;
}

function useAuthState() {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error(
      'suseAuthDispatch is not working, use it within an AuthProvider',
    );
  }
  return context;
}

export { AuthProvider, useAuthDispatch, useAuthState };
