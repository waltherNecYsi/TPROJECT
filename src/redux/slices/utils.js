import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
    typesDocumentsIdentity: [],
    typesDocumentsIdentityError: null,
};

const slice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        // GET initial
        setTypesDocumentsIdentity(state, action) {
            state.typesDocumentsIdentity = action.payload
        },
        setTypesDocumentsIdentityError(state, action) {
            state.typesDocumentsIdentityError = action.payload
        }
    },
});

// Reducer
export default slice.reducer;

// Obtener Tipos de Documentos de Identidad
export function getTypesDocumentsIdentity() {
    return async (dispatch) => {
        try {
            const response = await axios.get('/api/type-document-identity');
            dispatch(slice.actions.setTypesDocumentsIdentity(response.data.data));
            dispatch(slice.actions.setTypesDocumentsIdentityError(null));
        } catch (error) {
            dispatch(slice.actions.setTypesDocumentsIdentityError(error));
        }
    };
}

// ----------------------------------------------------------------------

