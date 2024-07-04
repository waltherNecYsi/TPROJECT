import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Grow, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

import PropTypes from 'prop-types';
import ServiciosTableForm from './ServiciosTableForm';

export default function EstilistasTableEdit({
  modal2Inputs,
  modal2Request,
  id,
  fetchDataFromAPI,
  isModalOpen,
  setIsModalOpen,
  rowData,
}) {

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <ServiciosTableForm
          inputs={modal2Inputs}
          request={modal2Request}
          id={id}
          closeModal={handleCloseModal}
          fetchDataFromAPI={fetchDataFromAPI}
          rowData={rowData}
        />
      )}
    </>
  );
}

EstilistasTableEdit.propTypes = {
  modal2Inputs: PropTypes.arrayOf(PropTypes.object),
  modal2Request: PropTypes.func,
  id: PropTypes.string,
  fetchDataFromAPI: PropTypes.func,
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  rowData: PropTypes.object,

};
