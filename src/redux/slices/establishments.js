import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  openModalCreateEdit: false,
  isEdit: false,
  isLoading: false,
  error: null,
  establishment: {
    country_id: 'PE',
    department_id: '',
    province_id: '',
    district_id: '',
    address: '',
    description: '',
    email: '',
    telephone: '',
    code: '0001',
  },
  establishments: [],
  myEstablishments: [],
};

const slice = createSlice({
  name: 'establishment',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    endLoading(state) {
      state.isLoading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    openDialog(state) {
      state.openModalCreateEdit = !state.openModalCreateEdit;

      if (state.isEdit) {
        state.isEdit = false;
      }
    },

    // GET Establishments
    pushNewEstablishmentsSuccess(state, action) {
      state.isLoading = false;
      const arr = state.myEstablishments;
      arr.push(action.payload);
      state.myEstablishments = arr;
    },

    // GET initial
    getMyEstablishmentsInitial(state, action) {
      state.isLoading = false;
      state.myEstablishments = action.payload;
    },

    // rellenar el formulario para editar
    setEstablishmentForEdition(state, action) {
      state.isEdit = true;
      state.establishment = action.payload;
    },
    //
    replaceUpdateEstablishmentsSuccess(state, action) {
      state.isEdit = false;
      let arr = state.myEstablishments;
      arr = arr.map((establishment, k) => {
        if (establishment.id === action.payload.id) {
          return action.payload;
        }
        return establishment;
      });
      state.myEstablishments = arr;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function createEstablishment(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/establishments', data);
      // console.log(response);
      dispatch(slice.actions.pushNewEstablishmentsSuccess(response.data.establishment));
      // dispatch(slice.actions.openDialog());
      dispatch(slice.actions.hasError(null));
      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}

export function updateEstablishment(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/api/establishments/${data.id}`, data);
      dispatch(slice.actions.replaceUpdateEstablishmentsSuccess(response.data.data));
      dispatch(slice.actions.hasError(null));
      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}

export function editEstablishment(data) {
  return (dispatch) => {
    dispatch(slice.actions.setEstablishmentForEdition(data));
  };
}

export function openCloseDialog() {
  return (dispatch) => {
    dispatch(slice.actions.openDialog());
  };
}

export function getMyEstablishments() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/establishments/assign');
      dispatch(slice.actions.getMyEstablishmentsInitial(response.data.data));
      dispatch(slice.actions.endLoading());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getEstablishments(name) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/products/product', {
        params: { name },
      });
      dispatch(slice.actions.getProductSuccess(response.data.product));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
