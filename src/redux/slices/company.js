import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    hasError: null,
    company: {
        name: '',
        trade_name: '',
        identify_document_type_id: '',
        number: '',
        logo: '',
        about: '',
        soap_type_id: '',
        soap_username: '',
        soap_password: '',
        certificate: '',
    },
};

const slice = createSlice({
    name: 'company',
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
            state.hasError = action.payload;
        },

        // GET initial
        getCompanyInitial(state, action) {
            // console.log(action.payload);
            state.isLoading = false;
            state.company = { ...action.payload };
        },

        // GET initial
        setCompany(state, action) {

            state.isLoading = false;
            state.company = action.payload;
        },

    },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------


export function updateCompany(data) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post(`/api/company/update`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            dispatch(slice.actions.setCompany(response.data.data));
            dispatch(slice.actions.endLoading());
            dispatch(slice.actions.hasError(null));
            return response.data;
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            return error;
        }
    };
}

export function getCompany() {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(`/api/company`);
            dispatch(slice.actions.getCompanyInitial(response.data.data));
            dispatch(slice.actions.hasError(null));
            return response.data;
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            return error;
        }
    };
}

