import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createPortal } from "react-dom";

import { useGenerateTicket } from "../../../../../hooks/useGenerateTicket";

export default function ModalCita({ id_Cita, open, onClose }) {
  const MySwal = withReactContent(Swal);
  const [showGenerateConfirmation, setShowGenerateConfirmation] =
    useState(false);

  const { onGenerateTicket } = useGenerateTicket(id_Cita);

  if (open && !showGenerateConfirmation) {
    MySwal.fire({
      icon: "success",
      html: (
        <div>
          <h2 style={{ fontSize: "large" }}>Cita Creada con éxito</h2>
          <h2 style={{ fontSize: "large" }}>¿Desea generar el ticket?</h2>
          <Button
            onClick={() => onGenerateTicket()}
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Generar Ticket
          </Button>
        </div>
      ),
      showConfirmButton: false,
      didClose: () => {
        setShowGenerateConfirmation(false);
        onClose();
      },
      didOpen: () => {
        const swalContainer = document.querySelector(".swal2-container");
        if (swalContainer) {
          swalContainer.style.zIndex = "9999";
        }
      },
    });
  }

  return null;
}

ModalCita.propTypes = {
  id_Cita: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
