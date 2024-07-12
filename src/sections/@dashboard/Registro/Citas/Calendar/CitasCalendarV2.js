import React, { useState, useEffect, useCallback } from "react";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
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
import axios from "../../../../../utils/axios";

import { appointments } from "../demo-data/appointments";
import AppointmentFormContainer from "./AppointmentFormContainer";
import { StyledFab, classes } from "./StyledComponents";
import Content from "./CustomAptTooltip";
import { useCitasContext } from "../Context/CitasContextPage";
import { setDataCreation } from "../Context/CitasActionspage";
import ModalCita from "./ModalCita";

const estilistas = [
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
  const [deletedAppointmentId, setDeletedAppointmentId] = useState(null);
  const [editingAppointments, setEditingAppointments] = useState(null);
  const [previousAppointment, setPreviousAppointment] = useState(null);
  const [addedAppointments, setAddedAppointments] = useState({});
  const [isNewAppointment, setIsNewAppointment] = useState(false);
  const [startDayHour] = useState(7);
  const [endDayHour] = useState(20);
  const [modalCitaOpen, setModalCitaOpen] = useState(false);
  const [id_Cita, setId_Cita] = useState(0);
  const { state, dispatch } = useCitasContext();
  const [calendarData, setCalendarData] = useState([]);
  const [IFoptions, setIFoptions] = useState([]);

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

  const toggleConfirmationVisible = useCallback(() => {
    setConfirmationVisible((prev) => !prev);
  }, []);

  const handleOpenModalCita = () => {
    setModalCitaOpen(true);
  };

  const handleCloseModalCita = () => {
    setModalCitaOpen(false);
  };

  const commitDeletedAppointment = useCallback(() => {
    setData((prevData) =>
      prevData.filter((appointment) => appointment.id !== deletedAppointmentId)
    );
    toggleConfirmationVisible();
  }, [deletedAppointmentId, toggleConfirmationVisible]);

  const commitChanges = useCallback(
    ({ added, changed, deleted }) => {
      setData((prevData) => {
        let updatedData = [...prevData];

        if (added) {
          const startingAddedId =
            updatedData.length > 0
              ? updatedData[updatedData.length - 1].id + 1
              : 0;
          updatedData.push({ id: startingAddedId, ...added });
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
    },
    [fetchDataFromAPI, toggleConfirmationVisible]
  );

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

  const handleEditingAppointmentChange = useCallback((editingAppointment) => {
    setEditingAppointments(editingAppointment);
  }, []);

  const handleAddedAppointmentChange = useCallback(
    async (addedAppointment) => {
      if (addedAppointment !== undefined) {
        const listaEst = await axios.get(`/api/estilistas`);
        const busquedaEst = await axios.post(`/api/buscar_disponibilidad`, {
          fecha_inicio: addedAppointment.endDate,
          fecha_final: addedAppointment.startDate,
        });
        const listaEstFiltrada = listaEst?.data?.data?.filter(
          (estilista) =>
            !busquedaEst?.data?.some(
              (busqEst) => busqEst?.EstilistaID === estilista?.EstilistaID
            )
        );
        // setDataCreation(dispatch, { estilistasD: listaEstFiltrada });
        setIFoptions(listaEstFiltrada);
      }
      setAddedAppointments(addedAppointment);
      if (editingAppointments !== undefined) {
        setPreviousAppointment(editingAppointments);
      }
      setEditingAppointments(null);
      setIsNewAppointment(true);
    },
    [editingAppointments]
  );

  const handleDeleteAppointment = useCallback(() => {
    setDeletedAppointmentId(deletedAppointmentId);
    toggleConfirmationVisible();
  }, [deletedAppointmentId, toggleConfirmationVisible]);

  const handleAddAppointment = useCallback(() => {
    setEditingFormVisible(true);
    setEditingAppointments(null);
    setAddedAppointments({
      startDate: new Date(currentDate).setHours(startDayHour),
      endDate: new Date(currentDate).setHours(startDayHour + 1),
    });
  }, [currentDate, startDayHour]);

  return (
    <Paper>
      <Scheduler data={calendarData} height={660}>
        <ViewState />
        <EditingState
          onCommitChanges={commitChanges}
          onEditingAppointmentChange={handleEditingAppointmentChange}
          onAddedAppointmentChange={handleAddedAppointmentChange}
        />
        <DayView startDayHour={startDayHour} endDayHour={endDayHour} />
        <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
        <MonthView />
        <AllDayPanel />
        <Appointments />
        <AppointmentTooltip
          showOpenButton={false}
          showCloseButton
          showDeleteButton={false}
          contentComponent={Content}
        />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <AppointmentForm
          overlayComponent={appointmentForm}
          onVisibilityChange={setEditingFormVisible}
        />
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
