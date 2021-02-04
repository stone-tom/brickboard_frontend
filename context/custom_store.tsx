import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import createPersistedState from 'use-persisted-state';
import IMessage from '../models/IMessage';
import IUser from '../models/IUser';
import {
  confirmAccount,
  login,
  logout,
  register,
} from '../util/api';

interface IState {
  user: IUser | null,
  isAuthenticated: boolean,
  message: IMessage | null,
  component: ReactNode,
}

const StoreDispatchContext = createContext(({} as any));
const StoreStateContext = createContext(({} as any));

const usePersistedStoreState = createPersistedState('brickboard-user');

const initialState: IState = {
  isAuthenticated: false,
  user: null,
  message: null,
  component: null,
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
        ...state,
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
    case 'ADD_COMPONENT':
      return {
        ...state,
        component: payload,
      };
    case 'REMOVE_COMPONENT':
      return {
        ...state,
        commponent: null,
      };
    default:
      throw new Error(`Unhandled action type ${type}`);
  }
}

function StoreProvider({
  children,
}: { children: ReactNode }) {
  const [brickboardUser, saveBrickboardUser] = usePersistedStoreState(
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
      user = content.data;
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
    const user : IUser = content.data;
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

  const addComponent = (component: ReactNode) => {
    dispatch({ type: 'SET_COMPONENT', payload: component });
  };

  const removeComponent = () => {
    dispatch({ type: 'REMOVE_COMPONENT', payload: null });
  };

  return (
    <StoreDispatchContext.Provider
      value={{
        performLogin,
        performLogout,
        performSignup,
        performAccountConfirmation,
        setMessage,
        removeMessage,
        addComponent,
        removeComponent,
      }}
    >
      <StoreStateContext.Provider value={state}>
        {children}
      </StoreStateContext.Provider>
    </StoreDispatchContext.Provider>
  );
}

function useStoreDispatch() {
  const context = useContext(StoreDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useStoreDispatch is not working, use it within an StoreProvider',
    );
  }
  return context;
}

function useStoreState() {
  const context = useContext(StoreStateContext);

  if (context === undefined) {
    throw new Error(
      'useStoreDispatch is not working, use it within an StoreProvider',
    );
  }
  return context;
}

export { StoreProvider, useStoreDispatch, useStoreState };
