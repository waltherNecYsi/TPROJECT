import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextField, MenuItem, IconButton, Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { format } from "date-fns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";

import esLocale from "date-fns/locale/es";

import {
  Close,
  CalendarToday,
  Create,
  LocationOn,
  Notes,
} from "@mui/icons-material";

import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import { StyledDiv, classes } from "./StyledComponents";

import axios from "../../../../../utils/axios";

import { useCitasContext } from "../Context/CitasContextPage";

const AppointmentFormContainer = ({
  appointmentData,
  commitChanges,
  visible,
  visibleChange,
  cancelAppointment,
  target,
  onHide,
  IFoptions,
  handleOpenModalCita,
  setId_Cita,
}) => {
  const [appointmentChanges, setAppointmentChanges] = useState({});

  const { state, dispatch } = useCitasContext();

  const { infoToolbar } = state;

  const [stilistOption, setStylistOption] = useState(IFoptions);
  const [locale, setLocale] = useState('es');

  const [services, setServices] = useState([]);

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const getClientes = async () => {
      try {
        const clientesData = await axios.get(`/api/cliente`);
        setClientes(clientesData.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    getClientes();
  }, []);

  useEffect(() => {
    const getServices = async () => {
      try {
        const servicesData = await axios.get(`/api/servicio`);
        setServices(servicesData.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    getServices();
  }, [infoToolbar]);

  const getAppointmentData = () => appointmentData;
  const getAppointmentChanges = () => appointmentChanges;
  const changeAppointment = async ({ field, changes }) => {
    const nextChanges = {
      ...getAppointmentChanges(),
      [field]: changes,
    };

    const nextChangesModified = {
      ...nextChanges,
      servicio:
        typeof nextChanges.servicio === "string"
          ? JSON.parse(nextChanges.servicio)
          : nextChanges.servicio,
      estilista:
        typeof nextChanges.estilista === "string"
          ? JSON.parse(nextChanges.estilista)
          : nextChanges.estilista,
    };

    setAppointmentChanges(nextChanges);
  };

  const commitAppointment = async (type) => {
    const getAppointmentMod = {
      ...getAppointmentChanges(),
      // cliente: infoToolbar?.cliente,
      // cliente: {
      //   ClienteID: 4,
      //   Nomb_Clt: "cliente",
      //   Apell_Clt: "cliente1",
      //   Apell_Pater: "cliente2",
      //   Telef_Clt: 312312,
      //   Email_Clt: "siea39521@gmail.com",
      //   FechaReg_Clt: "2024-07-09",
      //   idEstado: 1,
      //   created_at: "2024-07-09 04:52:44",
      //   updated_at: null,
      // },

      estilista:
        typeof getAppointmentChanges().estilista === "string"
          ? JSON.parse(getAppointmentChanges().estilista)
          : getAppointmentChanges().estilista,
    };

    // const appointment = {
    //   ...getAppointmentData(),
    //   ...getAppointmentChanges(),
    // };
    const appointment = {
      ...getAppointmentData(),
      ...getAppointmentMod,
    };

    console.log(appointment);

    const detalle = [];
    const newAppointment = appointment.servicio.forEach((servicio) => {
      const nuevoDetalle = {
        FechaInicio: format(appointment.startDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        FechaFin: format(appointment.endDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        ServicioID: servicio.ServicioID,
        EstilistaID: appointment.estilista.id,
      };
      detalle.push(nuevoDetalle);
    });

    const sendAppointment = {
      detalle,
      ClienteID: appointment.cliente.ClienteID,
    };

    console.log(sendAppointment);

    const sendCita = await axios.post(`/api/cita`, sendAppointment);

    if (sendCita.status === 200) {
      console.log(sendCita.data.cita_id);
      setId_Cita(sendCita.data.cita_id);
      handleOpenModalCita();
    }

    if (type === "deleted") {
      commitChanges({ [type]: appointment.id });
    } else if (type === "changed") {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    setAppointmentChanges({});
  };

  const displayAppointmentData = {
    ...appointmentData,
    ...appointmentChanges,
  };

  const isNewAppointment = appointmentData.id === undefined;

  const textEditorProps = (field) => ({
    variant: "outlined",
    onChange: (event) => {
      changeAppointment({
        field,
        changes: event.target.value,
      });
    },
    value: displayAppointmentData[field] || "",
    label: field.charAt(0).toUpperCase() + field.slice(1),
    className: classes.textField,
    size: "small",
  });

  const autocompleteEditorProps = (field) => ({
    value: displayAppointmentData[field],
    size: "small",
    onChange: (event, newValue) =>
      changeAppointment({
        field: [field],
        changes: newValue,
      }),
    renderInput: (params) => (
      <TextField
        {...params}
        size="small"
        label={field[0].toUpperCase() + field.slice(1)}
        placeholder=""
        {...textEditorProps(field)}
      />
    ),
  });

  const autocompleteModalEditorProps = (field) => ({
    value: displayAppointmentData[field],
    size: "small",
    onChange: (event, newValue) =>
      changeAppointment({
        field: [field],
        changes: newValue,
      }),
    renderInput: (params) => (
      <TextField
        {...params}
        size="small"
        label={field[0].toUpperCase() + field.slice(1)}
        placeholder=""
        {...textEditorProps(field)}
      />
    ),
  });

  const pickerEditorProps = (field) => ({
    value: displayAppointmentData[field],
    onChange: (date) => {
      console.log(date);
      changeAppointment({
        field,
        changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
      });
      handleSearchStylist();
    },
    ampm: true,
    inputFormat: "DD/MM/YYYY HH:mm",
    onError: () => null,
  });

  const startDatePickerProps = pickerEditorProps("startDate");
  const endDatePickerProps = pickerEditorProps("endDate");

  const cancelChanges = () => {
    setAppointmentChanges({});
    visibleChange();
    cancelAppointment();
  };

  const handleSearchStylist = async () => {
    try {
      const valuesSearch = getAppointmentData();
      const listaEst = await axios.get(`/api/estilistas`);
      const busquedaEst = await axios.post(`/api/buscar_disponibilidad`, {
        fecha_inicio: displayAppointmentData.endDate,
        fecha_final: displayAppointmentData.startDate,
      });
      const listaEstFiltrada = listaEst?.data?.data?.filter(
        (estilista) =>
          !busquedaEst?.data?.some(
            (busqEst) => busqEst?.EstilistaID === estilista?.EstilistaID
          )
      );
      console.log(listaEstFiltrada);

      setStylistOption(listaEstFiltrada);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  return (
    <StyledDiv>
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        onHide={onHide}
      >
        <StyledDiv style={{ width: "fit-content" }}>
          <div className={classes.container}>
            <div className={classes.header}>
              <IconButton
                className={classes.closeButton}
                onClick={cancelChanges}
                size="large"
              >
                <Close color="action" />
              </IconButton>
            </div>
            <div className={classes.content}>
              <div className={classes.wrapper}>
                <Create className={classes.icon} color="action" />
                <TextField {...textEditorProps("title")} label="Titulo" />
              </div>
              <div className={classes.wrapper}>
                <LocationOn className={classes.icon} color="action" />
                <Autocomplete
                  fullWidth
                  id="tags-outlined"
                  options={clientes ?? []}
                  getOptionLabel={(option) => option?.Nomb_Clt}
                  {...autocompleteModalEditorProps("cliente")}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} label="Cliente" placeholder="" />
                  )}
                />
              </div>
              <div className={classes.wrapper}>
                <LocationOn className={classes.icon} color="action" />
                <Autocomplete
                  multiple
                  fullWidth
                  id="tags-outlined"
                  options={services ?? []}
                  getOptionLabel={(option) => option?.Nomb_Serv}
                  {...autocompleteEditorProps("servicio")}
                  // defaultValue={[services[0]]}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} label="Servicios" placeholder="" />
                  )}
                />
              </div>
              <div className={classes.wrapper}>
                <Create className={classes.icon} color="action" />
                <TextField {...textEditorProps("estilista")} select>
                  {stilistOption.map((option) => (
                    <MenuItem
                      key={option.EstilistaID}
                      value={JSON.stringify({
                        id: option.EstilistaID,
                        text: option.Nombr_Est,
                      })}
                      inputvalue={option.Nombr_Est}
                    >
                      {option.Nombr_Est}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className={classes.wrapper}>
                <CalendarToday className={classes.icon} color="action" />
                {/* <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={esLocale}> */}
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                  <DateTimePicker
                    adapterLocale={esLocale}  
                    label="Cita Inicio"
                    renderInput={(props) => (
                      <TextField {...props} className={classes.picker} />
                    )}
                    {...startDatePickerProps}
                  />
                  <DateTimePicker
                    adapterLocale={esLocale}
                    label="Cita Fin"
                    renderInput={(props) => (
                      <TextField {...props} className={classes.picker} />
                    )}
                    {...endDatePickerProps}
                  />
                </LocalizationProvider>
              </div>

              <div className={classes.wrapper}>
                <Notes className={classes.icon} color="action"  />
                <TextField {...textEditorProps("notes")} multiline rows="6" label="Detalles" />
              </div>
            </div>
            <div className={classes.buttonGroup}>
              {!isNewAppointment && (
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  onClick={() => {
                    visibleChange();
                    commitAppointment("deleted");
                  }}
                >
                  Delete
                </Button>
              )}
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  if (isNewAppointment) {
                    commitAppointment("added");
                  } else {
                    commitAppointment("changed");
                  }
                }}
              >
                {isNewAppointment ? "Create" : "Save"}
              </Button>
            </div>
          </div>
        </StyledDiv>
      </AppointmentForm.Overlay>
    </StyledDiv>
  );
};

AppointmentFormContainer.propTypes = {
  appointmentData: PropTypes.object,
  commitChanges: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  visibleChange: PropTypes.func.isRequired,
  cancelAppointment: PropTypes.func.isRequired,
  target: PropTypes.any,
  onHide: PropTypes.func.isRequired,
  handleOpenModalCita: PropTypes.func.isRequired,
  setId_Cita: PropTypes.func.isRequired,
  IFoptions: PropTypes.array.isRequired,
};

export default AppointmentFormContainer;
