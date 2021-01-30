import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import createPersistedState from 'use-persisted-state';
import IMessage from '../models/IMessage';
import {
  confirmAccount,
  login,
  logout,
  register,
} from '../util/api';

interface IState {
  user: any,
  isAuthenticated: boolean,
  message: IMessage | null,
}

const AuthDispatchContext = createContext(({} as any));
const AuthStateContext = createContext(({} as any));

const usePersistedAuthState = createPersistedState('brickboard-user');

const initialState: IState = {
  isAuthenticated: false,
  user: null,
  message: null,
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
    case 'SET_MESSAGE':
      return {
        ...state,
        message: payload,
      };
    case 'REMOVE_MESSAGE':
      return {
        ...state,
        message: null,
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

  const setMessage = (message: IMessage) => {
    dispatch({ type: 'SET_MESSAGE', payload: message });
    setTimeout(() => {
      dispatch({ type: 'REMOVE_MESSAGE', payload: null });
    }, 3000);
  };

  const removeMessage = () => {
    dispatch({ type: 'REMOVE_MESSAGE', payload: null });
  };

  return (
    <AuthDispatchContext.Provider
      value={{
        performLogin,
        performLogout,
        performSignup,
        performAccountConfirmation,
        setMessage,
        removeMessage,
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
      'useAuthDispatch is not working, use it within an AuthProvider',
    );
  }
  return context;
}

export { AuthProvider, useAuthDispatch, useAuthState };
