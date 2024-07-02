import React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Close from "@mui/icons-material/Close";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Create from "@mui/icons-material/Create";
import LocationOn from "@mui/icons-material/LocationOn";
import Notes from "@mui/icons-material/Notes";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import { StyledDiv, classes } from "./StyledComponents";

export class AppointmentFormContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      appointmentChanges: {},
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === "deleted") {
      commitChanges({ [type]: appointment.id });
    } else if (type === "changed") {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {},
    });
  }

  render() {
    const {
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
    } = this.props;
    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment("added")
      : () => this.commitAppointment("changed");

    const textEditorProps = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) =>
        this.changeAppointment({
          field: [field],
          changes: change.value,
        }),
      value: displayAppointmentData[field] || "",
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });

    const pickerEditorProps = (field) => ({
      value: displayAppointmentData[field],
      onChange: (date) =>
        this.changeAppointment({
          field: [field],
          changes: date
            ? date.toDate()
            : new Date(displayAppointmentData[field]),
        }),
      ampm: false,
      inputFormat: "DD/MM/YYYY HH:mm",
      onError: () => null,
    });

    const startDatePickerProps = pickerEditorProps("startDate");
    const endDatePickerProps = pickerEditorProps("endDate");
    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };

    return (
      <StyledDiv>
        <AppointmentForm.Overlay
          visible={visible}
          target={target}
          // fullSize
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
                  <TextField {...textEditorProps("title")} size="small" />
                </div>
                <div className={classes.wrapper}>
                  <Create className={classes.icon} color="action" />
                  <TextField {...textEditorProps("estilista")} size="small" />
                </div>
                <div className={classes.wrapper}>
                  <CalendarToday className={classes.icon} color="action" />
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                      label="Start Date"
                      renderInput={(props) => (
                        <TextField
                          className={classes.picker}
                          {...props}
                          size="small"
                        />
                      )}
                      {...startDatePickerProps}
                    />
                    <DateTimePicker
                      label="End Date"
                      renderInput={(props) => (
                        <TextField
                          className={classes.picker}
                          {...props}
                          size="small"
                        />
                      )}
                      {...endDatePickerProps}
                    />
                  </LocalizationProvider>
                </div>
                <div className={classes.wrapper}>
                  <LocationOn className={classes.icon} color="action" />
                  <TextField {...textEditorProps("location")} size="small" />
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
                      this.commitAppointment("deleted");
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
                    applyChanges();
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
  }
}

AppointmentFormContainer.propTypes = {
  appointmentData: PropTypes.object,
  commitChanges: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  visibleChange: PropTypes.func.isRequired,
  cancelAppointment: PropTypes.func.isRequired,
  target: PropTypes.any,
  onHide: PropTypes.func.isRequired,
};
