import React, { createContext, useContext, useEffect, useReducer } from "react";
import createPersistedState from "use-persisted-state";

const AuthDispatchContext = createContext();
const AuthStateContext = createContext();

const usePersistedAuthState = createPersistedState("brickboard-user");

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state, { payload, type }) {
  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      throw new Error("Unhandled action type " + type);
  }
}

function AuthProvider({ children }) {
  const [brickboardUser, saveBrickboardUser] = usePersistedAuthState(
    JSON.stringify(initialState)
  );
  const [state, dispatch] = useReducer(reducer, JSON.parse(brickboardUser));

  useEffect(() => {
    saveBrickboardUser(JSON.stringify(state));
  }, [state, saveBrickboardUser]);

  const login = async (email, password) => {
    let data = {
      user: {
        email,
        password,
      },
    };

    const result = await fetch("https://brickboard.herokuapp.com/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Falsche Email oder Passwort!");
      }
      return response.json();
    });
    console.log("THE RESULT:");
    console.log(result);
    let user = {
      name: result.data.attributes.display_name,
      email: result.data.attributes.email,
      admin: result.data.attributes.admin,
      avatar: result.data.attributes.avatar,
    };
    dispatch({ type: "LOGIN_SUCCESS", payload: { user } });
  };
  const logout = async () => {
    const result = await fetch("https://brickboard.herokuapp.com/logout", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("THE LOGOUT RESPONSE");
    console.log(result);
    if (result.ok) {
      dispatch({ type: "LOGOUT" });
    }
  };

  const signup = async (email, displayName, password) => {
    let data = {
      user: {
        email,
        display_name: displayName,
        password,
      },
    };

    const result = await fetch("https://brickboard.herokuapp.com/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        // throw new Error("Registrierung momentan nicht möglich!");
      }
      return response.json();
    });
    if(result.errors){
        if(result.errors.email){
            throw new Error("Es gibt bereits ein Konto mit dieser E-Mail.");
        }
    }else{
        let user = {
            name: result.data.attributes.display_name,
            email: result.data.attributes.email,
            admin: result.data.attributes.admin,
            avatar: result.data.attributes.avatar,
          };
          dispatch({ type: "LOGIN_SUCCESS", payload: { user } });
    }
  };

  return (
    <AuthDispatchContext.Provider value={{ login, logout, signup }}>
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
      "useAuthDispatch is not working, use it within an AuthProvider"
    );
  }
  return context;
}

function useAuthState() {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error(
      "useAuthDispatch is not working, use it within an AuthProvider"
    );
  }
  return context;
}

export { AuthProvider, useAuthDispatch, useAuthState };
