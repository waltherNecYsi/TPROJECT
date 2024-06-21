import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  departments: null,
  provinces: null,
  districts: null,
};

const slice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET DEPARTMENTS
    getDepartmentsSuccess(state, action) {
      console.log(action.payload);
      state.departments = action.payload;
    },

    // GET PROVINCES
    getProvincesSuccess(state, action) {
      state.provinces = action.payload;
    },

    // GET Districts
    getDistrictsSuccess(state, action) {
      state.districts = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getDepartments() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/departments');
      dispatch(slice.actions.getDepartmentsSuccess(response.data.departments));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProvinces() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/provinces');
      //   const provinces = response.data.provinces.map((province) => {
      //     province.department_id = province.department_id);
      //   return province;
      // });

      dispatch(slice.actions.getProvincesSuccess(response.data.provinces));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDistricts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/districts');
      // const districts = response.data.districts.map((district) => {

      // return district;
      // } catch (error) {
      //   dispatch(slice.actions.hasError(error));
      // }

      dispatch(slice.actions.getDistrictsSuccess(response.data.districts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
