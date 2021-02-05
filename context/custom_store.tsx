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
  initiatePasswordReset,
  login,
  logout,
  register,
  resetPassword,
} from '../util/api';

interface IState {
  user: IUser | null,
  isAuthenticated: boolean,
  moderation_state: 'blocked' | 'approved' | 'pending_moderation' | null;
  message: IMessage | null,
  component: ReactNode,
}

const StoreDispatchContext = createContext(({} as any));
const StoreStateContext = createContext(({} as any));

const usePersistedStoreState = createPersistedState('brickboard-user');

const initialState: IState = {
  isAuthenticated: false,
  user: null,
  moderation_state: null,
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
        moderation_state: null,
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
        component: null,
      };
    case 'UPDATE_AVATAR':
      return {
        ...state,
        user: payload,
      };
    default:
      throw new Error(`Unhandled action type ${type}`);
  }
}

function StoreProvider({
  children,
}: { children: ReactNode }) {
  const savedInitialState = {
    user: initialState.user,
    isAuthenticated: initialState.isAuthenticated,
    moderation_state: initialState.moderation_state,
  };
  const [brickboardUser, saveBrickboardUser] = usePersistedStoreState(
    JSON.stringify(savedInitialState),
  );
  const [state, dispatch] = useReducer(reducer, { ...JSON.parse(brickboardUser), message: null });

  const performLogin = async (email, password) => {
    const { content, error } = await login(email, password);
    let user = {};
    let moderation_state = 'pending';
    if (error) {
      throw new Error(error);
    }
    if (content) {
      user = content.data;
      moderation_state = content.included[0].attributes.moderation_state;
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, moderation_state } });
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
    const user: IUser = content.data;
    return user;
  };

  const performPasswordResetStart = async (email: string) => {
    const { error } = await initiatePasswordReset(email);
    if (error) {
      throw new Error(error);
    }
  };

  const performPasswordReset = async (email: string, password: string, confirmation: string) => {
    const { error } = await resetPassword(email, password, confirmation);
    if (error) {
      throw new Error(error);
    }
  };

  const updateUserAvatar = (avatarUrl: string) => {
    const newUser = {
      ...state.user,
      attributes: {
        ...state.user.attributes,
        avatar: avatarUrl,
      },
    };
    dispatch({ type: 'UPDATE_AVATAR', payload: newUser });
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
    dispatch({ type: 'ADD_COMPONENT', payload: component });
  };

  const removeComponent = () => {
    dispatch({ type: 'REMOVE_COMPONENT', payload: null });
  };

  useEffect(() => {
    const savedstate = {
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      moderation_state: state.moderation_state,
    };
    saveBrickboardUser(JSON.stringify(savedstate));
  }, [performLogin, performLogout, updateUserAvatar]);

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
        performPasswordResetStart,
        performPasswordReset,
        updateUserAvatar,
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
