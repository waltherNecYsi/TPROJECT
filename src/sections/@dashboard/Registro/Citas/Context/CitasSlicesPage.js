import { useReducer } from "react";

export const IVCitas = {
  filterToolbar: {
    servicio: {},
    fecha: new Date(),
    estilista: {},
  },
  infoToolbar: {
    cliente: {},
    servicios: [],
    tiempo: {},
    estilista: {},
  },
  cita: {},
  citaticket: {},
};

console.log(IVCitas);

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
    // case "CalculoOperaciones": {
    //   const {
    //     TotalAfect,
    //     getTotalProdNoAfect,
    //     getTotalProdISC,
    //     TotalIGV,
    //     TotalOpe,
    //     ven_per,
    //   } = action.payload;

    //   return {
    //     ...state,
    //     TotalAfect,
    //     ven_per,
    //     getTotalProdNoAfect,
    //     getTotalProdISC,
    //     TotalIGV,
    //     TotalOpe,
    //   };
    // }
    // case "resetValues":
    //   return ISProducts.calcOperaciones;
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
