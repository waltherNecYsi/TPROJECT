import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TextField, MenuItem, IconButton, Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

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
}) => {
  const [appointmentChanges, setAppointmentChanges] = useState({});

  const { state, dispatch } = useCitasContext();

  const { infoToolbar } = state;

  // useEffect(() => {
  //   console.log(appointmentChanges);
  // }, [appointmentChanges]);

  const [stilistOption, setStylistOption] = useState([]);

  // const estylist = [
  //   { id: 1, name: "Andrew Glover" },
  //   { id: 2, name: "Arnie Schwartz" },
  //   { id: 3, name: "John Heart" },
  //   { id: 4, name: "Taylor Riley" },
  //   { id: 5, name: "Brad Farkus" },
  // ];

  const services = [
    { id: 1, name: "Blow Dry" },
    { id: 2, name: "Haircuts" },
    { id: 3, name: " Makeup" },
    { id: 4, name: " Waxing" },
    { id: 5, name: " Skincare" },
  ];

  const getAppointmentData = () => appointmentData;
  const getAppointmentChanges = () => appointmentChanges;
  const changeAppointment = ({ field, changes }) => {
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

    console.log(nextChanges);

    setAppointmentChanges(nextChanges);
  };

  const commitAppointment = (type) => {
    const getAppointmentMod = {
      ...getAppointmentChanges(),
      cliente: infoToolbar.cliente,

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
    onChange: ({ target: change }) =>
      changeAppointment({
        field: [field],
        changes: change.value,
      }),
    value: displayAppointmentData[field] || "",
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField,
    size: "small",
  });

  const autocompleteEditorProps = (field) => ({
    value: displayAppointmentData[field],
    onChange: (event, newValue) =>
      changeAppointment({
        field: [field],
        changes: newValue,
      }),
    renderInput: (params) => (
      <TextField
        {...params}
        label={field[0].toUpperCase() + field.slice(1)}
        placeholder=""
        {...textEditorProps(field)}
      />
    ),
  });

  const pickerEditorProps = (field) => ({
    value: displayAppointmentData[field],
    onChange: (date) =>
      changeAppointment({
        field: [field],
        changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
      }),
    ampm: false,
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
    console.log(getAppointmentData());
    try {
      const valuesSearch = getAppointmentData();
      const cita_dominio = await axios.get(`/api/cita_dominio`);
      const listaEst = await axios.get(`/api/estilistas`);
      const busquedaEst = await axios.post(`/api/buscar_disponibilidad`, {
        FechaInicio: valuesSearch.endDate,
        FechaFin: valuesSearch.startDate,
      });
      const listaEstFiltrada = listaEst.data.filter(
        (estilista) =>
          !busquedaEst.data.some((busqEst) => busqEst.EstilistaID === estilista.EstilistaID)
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
                <TextField {...textEditorProps("title")} />
              </div>
              <div className={classes.wrapper}>
                <LocationOn className={classes.icon} color="action" />
                {/* <TextField {...textEditorProps("servicio")} select >
                  {services.map((option) => (
                    <MenuItem
                      key={option.name}
                      value={JSON.stringify({
                        id: option.id,
                        text: option.name,
                      })}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField> */}
                <Autocomplete
                  multiple
                  fullWidth
                  id="tags-outlined"
                  options={services}
                  getOptionLabel={(option) => option?.name}
                  {...autocompleteEditorProps("servicio")}
                  defaultValue={[services[0]]}
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
                      key={option.name}
                      value={JSON.stringify({
                        id: option.id,
                        text: option.name,
                      })}
                      inputvalue={option.name}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className={classes.wrapper}>
                <CalendarToday className={classes.icon} color="action" />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DateTimePicker
                    label="Start Date"
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        className={classes.picker}
                        onChange={(date) => {
                          handleSearchStylist();
                        }}
                      />
                    )}
                    {...startDatePickerProps}
                  />
                  <DateTimePicker
                    label="End Date"
                    renderInput={(props) => (
                      <TextField {...props} className={classes.picker} />
                    )}
                    {...endDatePickerProps}
                  />
                </LocalizationProvider>
              </div>

              <div className={classes.wrapper}>
                <Notes className={classes.icon} color="action" />
                <TextField {...textEditorProps("notes")} multiline rows="6" />
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
};

export default AppointmentFormContainer;
