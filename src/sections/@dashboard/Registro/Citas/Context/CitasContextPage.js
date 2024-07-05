import PropTypes from "prop-types";
import {
  createContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  useContext,
} from "react";

import {
  filterToolbarReducer,
  infoToolbarReducer,
  citaReducer,
  citaticketReducer,
  IVCitas,
} from "./CitasSlicesPage";

export const CTContext = createContext(null);

export function CTReducer(state, action) {
  return {
    ...state,
    filterToolbar: filterToolbarReducer(state.filterToolbar, action),
    infoToolbar: infoToolbarReducer(state.infoToolbar, action),
    cita: citaReducer(state.cita, action),
    citaticket: citaticketReducer(state.citaticket, action),
  };
}

export default function CitasContextPage({ children }) {
  const [state, dispatch] = useReducer(CTReducer, IVCitas);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <CTContext.Provider value={contextValue}>
      {children}
    </CTContext.Provider>
  );
}

export const useCitasContext = () => {
  const context = useContext(CTContext);

  if (!context)
    throw new Error("usePVContext context must be use inside CitasContextPage");

  return context;
};

CitasContextPage.propTypes = {
  children: PropTypes.node,
};
