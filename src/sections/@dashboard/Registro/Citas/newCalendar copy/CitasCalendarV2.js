import React, { useState, useEffect, useCallback } from "react";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
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
import {
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { appointments as initialAppointments } from "../demo-data/appointments";
import AppointmentFormContainer from "./AppointmentFormContainer";
import { StyledFab, classes } from "./StyledComponents";

const CitasCalendarV2 = () => {
  const [data, setData] = useState(initialAppointments);
  const [currentDate, setCurrentDate] = useState("2018-06-27");
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [editingFormVisible, setEditingFormVisible] = useState(false);
  const [deletedAppointmentId, setDeletedAppointmentId] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [previousAppointment, setPreviousAppointment] = useState(null);
  const [addedAppointment, setAddedAppointment] = useState({});
  const [isNewAppointment, setIsNewAppointment] = useState(false);
  const [startDayHour, setStartDayHour] = useState(9);
  const [endDayHour, setEndDayHour] = useState(19);

  const toggleEditingFormVisibility = useCallback(() => {
    setEditingFormVisible(!editingFormVisible);
  }, [editingFormVisible]);

  const toggleConfirmationVisible = useCallback(() => {
    setConfirmationVisible(!confirmationVisible);
  }, [confirmationVisible]);

  const commitChanges = useCallback(
    ({ added, changed, deleted }) => {
      let updatedData = data;

      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        updatedData = [...data, { id: startingAddedId, ...added }];
      }

      if (changed) {
        updatedData = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }

      if (deleted !== undefined) {
        setDeletedAppointmentId(deleted);
        toggleConfirmationVisible();
      }

      setData(updatedData);
      setAddedAppointment({});
    },
    [data, toggleConfirmationVisible]
  );

  const appointmentForm = {
    visible: editingFormVisible,
    appointmentData: editingAppointment || addedAppointment,
    commitChanges,
    visibleChange: toggleEditingFormVisibility,
    onEditingAppointmentChange: setEditingAppointment,
    cancelAppointment: () => {
      if (isNewAppointment) {
        setEditingAppointment(previousAppointment);
        setIsNewAppointment(false);
      }
    },
  };

  const onEditingAppointmentChange = useCallback((appointment) => {
    setEditingAppointment(appointment);
  }, []);

  const onAddedAppointmentChange = useCallback((appointment) => {
    setAddedAppointment(appointment);
    if (editingAppointment) {
      setPreviousAppointment(editingAppointment);
    }
    setEditingAppointment(undefined);
    setIsNewAppointment(true);
  }, [editingAppointment]);

  const commitDeletedAppointment = useCallback(() => {
    setData(data.filter((appointment) => appointment.id !== deletedAppointmentId));
    toggleConfirmationVisible();
  }, [data, deletedAppointmentId, toggleConfirmationVisible]);

  return (
    <Paper>
      <Scheduler data={data} height={660}>
        <ViewState currentDate={currentDate} />
        <EditingState
          onCommitChanges={commitChanges}
          onEditingAppointmentChange={onEditingAppointmentChange}
          onAddedAppointmentChange={onAddedAppointmentChange}
        />
        <IntegratedEditing />
        <DayView startDayHour={startDayHour} endDayHour={endDayHour} />
        <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
        <MonthView />
        <AllDayPanel />
        <EditRecurrenceMenu />
        <Appointments />
        <AppointmentTooltip showOpenButton showCloseButton showDeleteButton />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <AppointmentForm
          overlayComponent={appointmentForm}
          visible={editingFormVisible}
          onVisibilityChange={toggleEditingFormVisibility}
        />
        <DragDropProvider />
      </Scheduler>

      <Dialog open={confirmationVisible} onClose={toggleConfirmationVisible}>
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
        color="secondary"
        className={classes.addButton}
        onClick={() => {
          setEditingFormVisible(true);
          onEditingAppointmentChange(undefined);
          onAddedAppointmentChange({
            startDate: new Date(currentDate).setHours(startDayHour),
            endDate: new Date(currentDate).setHours(startDayHour + 1),
          });
        }}
      >
        <AddIcon />
      </StyledFab>
    </Paper>
  );
};

export default CitasCalendarV2;
