import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import FormModalNubefa from './FormModalNubefa';

const ButtonModalNubefa = ({ rowId, modal1Inputs, modal1Request, modal2Inputs, modal2Request, isEdit }) => {
  const [currentModal, setCurrentModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (name, props) => {
    setCurrentModal({ name, props });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentModal(null);
    setIsModalOpen(false);
  };

  const buttonLabel = isEdit ? 'Editar' : 'Añadir'; // Usamos isEdit para determinar el texto del botón

  return (
    <m.div className='tableUsers-buttons'>
      <m.div className='tableUsers-butcont'>
        <Button variant="contained" onClick={() => openModal(buttonLabel, { inputs: isEdit ? modal2Inputs : modal1Inputs, request: isEdit ? modal2Request : modal1Request })}>
          {buttonLabel}
        </Button>
      </m.div>
      {currentModal && (
        <Modal show={isModalOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{currentModal.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormModalNubefa inputs={currentModal.props.inputs} request={currentModal.props.request} />
          </Modal.Body>
        </Modal>
      )}
    </m.div>
  );
};

ButtonModalNubefa.propTypes = {
  rowId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  modal1Inputs: PropTypes.arrayOf(PropTypes.object),
  modal1Request: PropTypes.func,
  modal2Inputs: PropTypes.arrayOf(PropTypes.object),
  modal2Request: PropTypes.func,
  isEdit: PropTypes.bool,
};


export default ButtonModalNubefa;
