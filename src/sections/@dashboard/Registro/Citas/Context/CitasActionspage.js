// Products TableD

export const setFilterToolbar = (dispatch, payload) => {
    const action = {
      type: 'setFilterToolbar',
      payload,
    };
    console.log(payload)
    dispatch(action);
  };
  
//   export const changeProduct = (dispatch, payload, index) => {
//     const action = {
//       type: 'changeProduct',
//       payload,
//       index,
//     };
//     dispatch(action);
//   };
  
//   export const deleteProduct = (dispatch, index) => {
//     const action = {
//       type: 'deleteProduct',
//       index,
//     };
//     dispatch(action);
//   };
  
//   export const CalculoOperaciones = (dispatch, payload) => {
//     const action = {
//       type: 'CalculoOperaciones',
//       payload,
//     };
//     dispatch(action);
//   };
  
//   export const updateUsuarioOpe = (dispatch, payload) => {
//     const action = {
//       type: 'updateUsuarioOpe',
//       payload,
//     };
//     dispatch(action);
//   };
  
//   export const updatePago = (dispatch, payload) => {
//     const action = {
//       type: 'updatePago',
//       payload,
//     };
//     dispatch(action);
//   };
  
//   export const resetValues = (dispatch, payload) => {
//     console.log('hola');
//     const action = {
//       type: 'resetValues',
//     };
//     dispatch(action);
//   };
  