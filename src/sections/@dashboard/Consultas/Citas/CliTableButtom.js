import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Grow, Dialog, DialogContent, DialogTitle } from '@mui/material';

import PropTypes from 'prop-types';
import Iconify from '../../../../components/iconify';
import CliTableForm from './CliTableForm';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function CliTableButtom({
  rowId,
  modal1Inputs,
  modal1Request,
  fetchDataFromAPI,
}) {
  const [currentModal, setCurrentModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const Transition = React.forwardRef((props, ref) => (
  //   <Grow timeout={{ enter: 5000, exit: 500 }} ref={ref} {...props} />
  // ));

  const openAddModal = () => {
    setCurrentModal({
      inputs: modal1Inputs,
      request: modal1Request,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentModal(null);
    setIsModalOpen(false);
  };

    return (
    <>
      <Button variant="contained" onClick={openAddModal}>
        Añadir
      </Button>
      {currentModal && (
        <CliTableForm
          inputs={currentModal.inputs}
          request={currentModal.request}
          closeModal={closeModal}
          fetchDataFromAPI={fetchDataFromAPI}
        />
      )}
    </>
  );
}

CliTableButtom.propTypes = {
  rowId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  modal1Inputs: PropTypes.arrayOf(PropTypes.object),
  modal1Request: PropTypes.func,
  fetchDataFromAPI: PropTypes.func,
};

