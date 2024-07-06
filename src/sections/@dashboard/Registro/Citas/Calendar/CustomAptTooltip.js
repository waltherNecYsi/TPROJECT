// Content.js
import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import { AppointmentTooltip as DxAppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";

// Define los estilos personalizados
const ContentContainer = styled("div")({
  padding: "16px",
});

const Title = styled("div")({
  fontWeight: "bold",
});

const Text = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

// Crea un componente personalizado para el contenido del tooltip
const Content = ({ children, appointmentData, ...restProps }) => {
    console.log(appointmentData)
    console.log(restProps)
  return (
    <DxAppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <ContentContainer>
        <Title>Cliente</Title>
        <Text>{appointmentData?.cliente?.Nomb_Clt}</Text>
        <Title>Estilista</Title>
        <Text>{appointmentData?.estilista?.text}</Text>
      </ContentContainer>
    </DxAppointmentTooltip.Content>
  );
};

Content.propTypes = {
  children: PropTypes.node,
  appointmentData: PropTypes.object.isRequired
};

export default Content;
