import React, { useState, useEffect, useCallback } from "react";
import {
  ViewState,
  EditingState,
  Resources,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Toolbar,
  DateNavigator,
  TodayButton,
  DayView,
  WeekView,
  MonthView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import { connectProps } from "@devexpress/dx-react-core";
import {
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { appointments } from "../demo-data/appointments";
import AppointmentFormContainer from "./AppointmentFormContainer";
import { StyledFab, classes } from "./StyledComponents";
import Content from "./CustomAptTooltip";
import { useCitasContext } from "../Context/CitasContextPage";
import { setInfoToolbar } from "../Context/CitasActionspage";

import axios from "../../../../../utils/axios";

import ModalCita from "./ModalCita";

const estilista = [
  { id: 1, text: "Andrew Glover" },
  { id: 2, text: "Arnie Schwartz" },
  { id: 3, text: "John Heart" },
  { id: 4, text: "Taylor Riley" },
  { id: 5, text: "Brad Farkus" },
];

const CitasCalendarV2 = () => {
  const [data, setData] = useState(appointments);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [editingFormVisible, setEditingFormVisible] = useState(false);
  const [deletedAppointmentId, setDeletedAppointmentId] = useState(undefined);
  const [editingAppointments, setEditingAppointments] = useState(undefined);
  const [previousAppointment, setPreviousAppointment] = useState(undefined);
  const [addedAppointments, setAddedAppointments] = useState({});
  const [startDayHour] = useState(7);
  const [endDayHour] = useState(20);
  const [isNewAppointment, setIsNewAppointment] = useState(false);

  const [modalCitaOpen, setModalCitaOpen] = useState(false);

  const [id_Cita, setId_Cita] = useState(0);

  const { state, dispatch } = useCitasContext();

  const [calendarData, setCalendarData] = useState([]);

  // const [resources] = useState([
  //   {
  //     fieldName: "estilista",
  //     title: "Estilista",
  //     // allowMultiple: true,
  //     instances: estilista,
  //   },
  // ]);

  const fetchDataFromAPI = useCallback(async () => {
    try {
      const response = await axios.get(`/api/citas_v`);
      setCalendarData(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchDataFromAPI();
  }, [fetchDataFromAPI]);

  const handleOpenModalCita = () => {
    setModalCitaOpen(true);
  };

  const handleCloseModalCita = () => {
    setModalCitaOpen(false);
  };

  const toggleConfirmationVisible = () => {
    setConfirmationVisible((prev) => !prev);
  };

  const commitDeletedAppointment = () => {
    setData((states) => {
      const nextData = states.filter(
        (appointment) => appointment.id !== deletedAppointmentId
      );
      return nextData;
    });
    toggleConfirmationVisible();
  };

  const commitChanges = ({ added, changed, deleted }) => {
    setData((states) => {
      let updatedData = [...states];
      console.log(updatedData);

      if (added) {
        const startingAddedId =
          updatedData.length > 0
            ? updatedData[updatedData.length - 1].id + 1
            : 0;
        updatedData.push({ id: startingAddedId, ...added });

        const values = {
          tiempo: updatedData.map((item) => item.endDate),
          estilista: updatedData.map((item) => item.estilista),
          servicios: updatedData.map((item) => item.servicio),
        };
        // console.log(values);
        // setInfoToolbar(dispatch, values);
        // console.log(startingAddedId);
        fetchDataFromAPI();
      }
      if (changed) {
        updatedData = updatedData.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        setDeletedAppointmentId(deleted);
        toggleConfirmationVisible();
      }
      return updatedData;
    });
    setAddedAppointments({});
  };

  const [IFoptions, setIFoptions] = useState([]);

  const appointmentForm = connectProps(AppointmentFormContainer, () => {
    const currentAppointment =
      data.find(
        (appointment) =>
          editingAppointments && appointment.id === editingAppointments.id
      ) || addedAppointments;

    const cancelAppointment = () => {
      if (isNewAppointment) {
        setEditingAppointments(previousAppointment);
        setIsNewAppointment(false);
      }
    };

    return {
      visible: editingFormVisible,
      appointmentData: currentAppointment,
      commitChanges,
      visibleChange: setEditingFormVisible,
      onEditingAppointmentChange: setEditingAppointments,
      cancelAppointment,
      IFoptions,
      handleOpenModalCita,
      setId_Cita,
    };
  });

  // Cuando se edita una cita, se guarda el objeto en estado
  const handleEditingAppointmentChange = (editingAppointment) => {
    setEditingAppointments(editingAppointment);
  };

  const handleAddedAppointmentChange = async (addedAppointment) => {
    if (addedAppointment !== undefined) {
      // console.log(addedAppointment);
      const listaEst = await axios.get(`/api/estilistas`);
      const busquedaEst = await axios.post(`/api/buscar_disponibilidad`, {
        fecha_inicio: addedAppointment.endDate,
        fecha_final: addedAppointment.startDate,
      });
      const listaEstFiltrada = listaEst?.data?.data?.filter(
        (estilistas) =>
          !busquedaEst?.data?.some(
            (busqEst) => busqEst?.EstilistaID === estilistas?.EstilistaID
          )
      );
      setIFoptions(listaEstFiltrada);
    }
    setAddedAppointments(addedAppointment);
    if (editingAppointments !== undefined) {
      setPreviousAppointment(editingAppointments);
    }
    setEditingAppointments(undefined);
    setIsNewAppointment(true);
  };

  // Cuando se borra una cita, se guarda el id de la cita en estado
  const handleDeleteAppointment = () => {
    setDeletedAppointmentId(deletedAppointmentId);
    toggleConfirmationVisible();
  };

  // botton +
  const handleAddAppointment = () => {
    setEditingFormVisible(true);
    setEditingAppointments(undefined);
    setAddedAppointments({
      startDate: new Date(currentDate).setHours(startDayHour),
      endDate: new Date(currentDate).setHours(startDayHour + 1),
    });
  };

  return (
    <Paper>
      <Scheduler data={calendarData} height={660}>
        <ViewState />
        {/* <ViewState currentDate={currentDate} /> */}
        <EditingState
          onCommitChanges={commitChanges}
          onEditingAppointmentChange={handleEditingAppointmentChange}
          onAddedAppointmentChange={handleAddedAppointmentChange}
        />
        <DayView startDayHour={startDayHour} endDayHour={endDayHour} />
        <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
        <MonthView />
        <AllDayPanel />
        {/* <EditRecurrenceMenu /> */}
        <Appointments />
        <AppointmentTooltip
          showOpenButton
          showCloseButton
          showDeleteButton
          contentComponent={Content}
          // headerComponent={() => null}
          // layoutComponent={() => null}
        />
        {/* <Resources
          data={resources}
          mainResourceName="estilista"
          palette={[
            "#009688",
            "#00695C",
            "#D32F2F",
            "#7B1FA2",
            "#8E24AA",
            "#EB8834",
            "#F57C00",
            "#FF9800",
            "#607D8B",
          ]}
        /> */}
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <AppointmentForm
          overlayComponent={appointmentForm}
          // visible={editingFormVisible}
          onVisibilityChange={setEditingFormVisible}
        />
        {/* <DragDropProvider /> */}
      </Scheduler>

      <Dialog open={confirmationVisible} onClose={() => {}}>
        <DialogTitle>Delete Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={toggleConfirmationVisible}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={commitDeletedAppointment}
            color="secondary"
            variant="outlined"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <StyledFab
        color="primary"
        className={classes.addButton}
        onClick={handleAddAppointment}
      >
        <AddIcon />
      </StyledFab>

      <ModalCita
        open={modalCitaOpen}
        onClose={handleCloseModalCita}
        id_Cita={id_Cita}
      />
    </Paper>
  );
};

export default CitasCalendarV2;
