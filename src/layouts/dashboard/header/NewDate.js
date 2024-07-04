import React from "react";
import { Button } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { PATH_AUTH, PATH_DASHBOARD } from "../../../routes/paths";

export default function NewDate() {
  const navigate = useNavigate();

  const handleNewDate = () => {
    navigate(PATH_DASHBOARD.registro.regCitas);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleNewDate}
        sx={{ textWrap: "nowrap" }}
      >
        Nueva Cita +
      </Button>
    </div>
  );
}
