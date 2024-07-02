import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  LinearProgress,
  styled,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import propTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  MonthView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";

import { registerLicense } from "@syncfusion/ej2-base";

import useResponsive from "../../../../hooks/useResponsive";

import { useSettingsContext } from "../../../../components/settings";

import { useEditorTemplate, dayEventTemplate } from "./CitasCalendarTemplate";

const PREFIX = "Demo";

const classes = {
  toolbarRoot: `${PREFIX}-toolbarRoot`,
  progress: `${PREFIX}-progress`,
};

const StyledDiv = styled("div")({
  [`&.${classes.toolbarRoot}`]: {
    position: "relative",
  },
});

const StyledLinearProgress = styled(LinearProgress)(() => ({
  [`&.${classes.progress}`]: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
  },
}));

const PUBLIC_KEY = "AIzaSyBnNAISIUKe6xdhq1_rjor2rxoI3UlMY7k";
const CALENDAR_ID = "f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com";

const getData = (setData, setLoading) => {
  const dataUrl = [
    "https://www.googleapis.com/calendar/v3/calendars/",
    CALENDAR_ID,
    "/events?key=",
    PUBLIC_KEY,
  ].join("");
  setLoading(true);

  return fetch(dataUrl)
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        setData(data.items);
        setLoading(false);
      }, 600);
    });
};

const ToolbarWithLoading = ({ children, ...restProps }) => (
  <StyledDiv className={classes.toolbarRoot}>
    <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
    <StyledLinearProgress className={classes.progress} />
  </StyledDiv>
);

ToolbarWithLoading.propTypes = {
  children: propTypes.node.isRequired,
};

const usaTime = (date) =>
  new Date(date).toLocaleString("en-US", { timeZone: "America/Los_Angeles" });

const mapAppointmentData = (appointment) => ({
  id: appointment.id,
  startDate: usaTime(appointment.start.dateTime),
  endDate: usaTime(appointment.end.dateTime),
  title: appointment.summary,
});

const initialState = {
  data: [],
  loading: false,
  currentDate: new Date(),
  currentViewName: "Day",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setData":
      return { ...state, data: action.payload.map(mapAppointmentData) };
    case "setCurrentViewName":
      return { ...state, currentViewName: action.payload };
    case "setCurrentDate":
      return { ...state, currentDate: action.payload };
    default:
      return state;
  }
};

export default function CitasCalendar() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, currentViewName, currentDate } = state;
  
  const setCurrentViewName = useCallback(
    (nextViewName) =>
      dispatch({
        type: "setCurrentViewName",
        payload: nextViewName,
      }),
    [dispatch]
  );
  const setData = useCallback(
    (nextData) =>
      dispatch({
        type: "setData",
        payload: nextData,
      }),
    [dispatch]
  );
  const setCurrentDate = useCallback(
    (nextDate) =>
      dispatch({
        type: "setCurrentDate",
        payload: nextDate,
      }),
    [dispatch]
  );
  const setLoading = useCallback(
    (nextLoading) =>
      dispatch({
        type: "setLoading",
        payload: nextLoading,
      }),
    [dispatch]
  );

  useEffect(() => {
    getData(setData, setLoading);
  }, [setData, currentViewName, currentDate, setLoading]);


  return (
    <>
      <Paper>
        <Scheduler data={data} height={660}>
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={setCurrentViewName}
            onCurrentDateChange={setCurrentDate}
          />
          <DayView startDayHour={7.5} endDayHour={17.5} />
          <WeekView startDayHour={7.5} endDayHour={17.5} />
          <MonthView />
          <Appointments />
          <Toolbar
            {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
          />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <AppointmentTooltip showOpenButton showCloseButton />
          {/* <AppointmentForm readOnly /> */}
          <AppointmentForm
            // overlayComponent={this.appointmentForm}
            // visible={editingFormVisible}
            // onVisibilityChange={this.toggleEditingFormVisibility}
          />
        </Scheduler>
      </Paper>
    </>
  );
}
