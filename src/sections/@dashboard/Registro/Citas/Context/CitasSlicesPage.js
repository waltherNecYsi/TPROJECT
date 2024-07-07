import { useReducer } from "react";

export const IVCitas = {
  filterToolbar: {
    servicio: {},
    fecha: new Date(),
    estilista: {},
  },
  infoToolbar: {
    cliente: null,
    servicios: [],
    tiempo: [],
    estilista: [],
  },
  cita: {},
  citaticket: {},
};

export function filterToolbarReducer(state, action) {
  switch (action.type) {
    case "setFilterToolbar": {
      console.log(action.payload);
      const { fechas, estilista, servicio } = action.payload;
      return { ...state, fechas, estilista, servicio };
    }
    default:
      return state;
  }
}

export function infoToolbarReducer(state, action) {
  switch (action.type) {
    case "setInfoToolbar": {
      console.log(action.payload);
      const { cliente, servicios, tiempo, estilista } = action.payload;
      return { ...state, cliente, servicios, tiempo, estilista };
    }
    default:
      return state;
  }
}

export function citaReducer(state, action) {
  switch (action.type) {
    // case "updateUsuarioOpe": {
    //   const { almacen, cliente, documento, emision, moneda } = action.payload;

    //   return {
    //     ...state,
    //     almacen,
    //     cliente,
    //     documento,
    //     emision,
    //     moneda,
    //   };
    // }
    // case "resetValues":
    //   return ISProducts.OpeUsuario;
    default:
      return state;
  }
}

export function citaticketReducer(state, action) {
  switch (action.type) {
    // case "updatePago": {
    //   const { pago_efect, tarjetas, transferencias } = action.payload;

    //   return {
    //     ...state,
    //     pago_efect,
    //     tarjetas,
    //     transferencias,
    //   };
    // }
    // case "resetValues":
    //   return ISProducts.Pago;
    default:
      return state;
  }
}
