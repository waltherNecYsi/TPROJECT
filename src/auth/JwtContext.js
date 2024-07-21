import PropTypes from "prop-types";
import {
  createContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PATH_DASHBOARD, PATH_AUTH } from "../routes/paths";
import useCustomSWR, { fetcher, fetchget } from "./useCustomSWR";
import { HOST_API_KEY } from "../config-global";

// utils
// import { createHmac } from 'crypto';
// import axios from '../utils/axios';

import localStorageAvailable from "../utils/localStorageAvailable";
//
import { setSession, setEstablishment } from "./utils";

// const { createHmac } = require('node:crypto');

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  isEstablishment: false,
  isRegistered: false,
  user: null,
};

const reducer = (state, action) => {
  // console.log({ old: state });
  // console.log(action.type);
  // console.log(action.payload);
  if (action.type === "INITIAL") {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      isEstablishment: action.payload.isEstablishment,
      isRegistered: action.payload.isRegistered,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGIN") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "REGISTER") {
    return {
      ...state,
      isRegistered: true,
      isAuthenticated: false,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      isAuthenticated: false,
      isEstablishment: null,
      user: null,
    };
  }
  if (action.type === "ESTABLISHMENT") {
    return {
      ...state,
      isEstablishment: action.payload.isEstablishment,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const handleAuthentication = useCallback(async () => {
    try {
      const accessToken = storageAvailable
        ? localStorage.getItem("accessToken")
        : "";

      const tokenData = await fetchget(
        `http://${HOST_API_KEY}/api/verifyToken`,
        accessToken
      );

      const { access_token, user } = tokenData;

      setSession(accessToken, user);

      dispatch({
        type: "INITIAL",
        payload: {
          isAuthenticated: true,
          isRegistered: true,
          // isEstablishment: establishmentId,
          user: {
            ...user,
            displayName: user?.name ?? "Logan",
            // photoURL: user?.empresa.imagen,
            role: user?.rol ?? "estilista",
          },
        },
      });

      // return { data, error, isLoading };
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      dispatch({
        type: "INITIAL",
        payload: {
          isAuthenticated: false,
          isEstablishment: null,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = storageAvailable
          ? localStorage.getItem("accessToken")
          : "";
        const usuario = accessToken ? localStorage.getItem("username") : "";

        if (accessToken) {
          setSession(accessToken, usuario);
          const establishmentId = storageAvailable
            ? localStorage.getItem("establishment_id")
            : "";
          setEstablishment(establishmentId);

          handleAuthentication();
        } else {
          console.log("No hay token al Inicio");
          dispatch({
            type: "INITIAL",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        console.error(error);
        console.log("error");
        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: false,
            isEstablishment: null,
            user: null,
          },
        });
      }
    };

    initialize();
  }, [handleAuthentication, storageAvailable]);

  // LOGIN

  const login = useCallback(async (email, password) => {
    try {
      const loginData = await fetcher(`http://${HOST_API_KEY}/api/login`, {
        email,
        password,
      });

      if (!loginData?.error) {
        const { access_token, user } = loginData;

        setSession(access_token, user);

        dispatch({
          type: "LOGIN",
          payload: {
            user: {
              isAuthenticated: true,
              isEstablishment: "1",
              displayName: user?.name ?? "Nombre",
              role: user?.rol ?? "Rol",
            },
          },
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      dispatch({
        type: "LOGIN",
        payload: {
          user: {
            isAuthenticated: false,
            isRegistered: false,
            isEstablishment: null,
            displayName: "",
            role: "",
          },
        },
      });
    }
  }, []);

  // const Mainregister = async (
  //   name,
  //   email,
  //   ruc,
  //   phone,
  //   password,
  //   reppassword
  // ) => {
  //   try {
  //     const { data, error, isLoading } = await fetcher(
  //       `http://${HOST_API_KEY}/api/main`,
  //       {
  //         email,
  //         password,
  //         name,
  //         ruc,
  //         phone,
  //         reppassword,
  //       }
  //     );

  //     if (!error) {
  //       const { accessToken, user } = data;

  //       if (accessToken && user) {
  //         console.log("La solicitud de registro fue exitosa");
  //         console.log(data);
  //       } else {
  //         console.error("La respuesta exitosa no contiene accessToken o user");
  //       }
  //     } else {
  //       console.error(`Error en la solicitud: ${error}`);
  //     }
  //   } catch (error) {
  //     console.error("Error en la solicitud:", error);
  //   }
  // };

  // REGISTER

  const register = useCallback(async (email, password, name, DNI) => {
    try {
      const { data, error, isLoading } = await fetcher(
        `http://${HOST_API_KEY}/api/register`,
        {
          email,
          password,
          name,
          DNI,
        }
      );

      if (!error) {
        if (data && data.user) {
          console.log("La solicitud fue exitosa");
          console.log(data);

          const { user } = data;

          dispatch({
            type: "REGISTER",
            payload: {
              user,
            },
          });
        } else {
          console.log("No se encontró ningún usuario en la respuesta.");
          dispatch({
            type: "REGISTER",
            payload: {
              user: "",
            },
          });
        }
      } else {
        console.error(`Error en la solicitud: ${error}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }, []);

  // LOGOUT

  const logout = useCallback(async () => {
    try {
      const storedToken = localStorage.getItem("accessToken");

      if (storedToken) {
        const { data, error, isLoading } = await fetcher(
          `http://${HOST_API_KEY}/api/logout`,
          {
            token: storedToken,
          }
        );

        if (!error) {
          console.log("Sesión cerrada exitosamente en el servidor");
        } else {
          console.error("Error al cerrar sesión en el servidor:", error);
        }
      }

      setSession(null);
      setEstablishment(null);
      dispatch({
        type: "LOGOUT",
      });
    } catch (error) {
      console.log("Error en la solicitud", error);
    }
  }, []);

  // ESTABLISHMENT
  const establishment = useCallback(async (establishment_id) => {
    setEstablishment(establishment_id);

    dispatch({
      type: "ESTABLISHMENT",
      payload: {
        isEstablishment: establishment_id,
        isAuthenticated: false,
      },
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isEstablishment: state.isEstablishment,
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      isRegistered: state.isRegistered,
      user: state.user,
      method: "jwt",
      login,
      register,
      logout,
      establishment,
    }),
    [
      state.isEstablishment,
      state.isAuthenticated,
      state.isInitialized,
      state.isRegistered,
      state.user,
      login,
      logout,
      register,
      establishment,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
