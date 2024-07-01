import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  Month,
  Agenda,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";

import { registerLicense } from "@syncfusion/ej2-base";

import useResponsive from "../../../../hooks/useResponsive";

import { useSettingsContext } from "../../../../components/settings";

import FormProvider from "../../../../components/hook-form/FormProvider";

import formatTimeAP from "../../../../utils/formatTimeAP";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCeUx0THxbf1x0ZFRHal9ZTnZZUj0eQnxTdEFjX31XcndWTmBbV0d1WQ=="
);

const dayEventTemplate = (props) => {
  console.log(props);
  const { Stylist, StartTime, EndTime } = props;
  return (
    <div className="e-subject">
      <Typography variant="h6" gutterBottom>
        Cita
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Estilista: {Stylist}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Horario: {formatTimeAP(StartTime)} - {formatTimeAP(EndTime)}
      </Typography>
    </div>
  );
};

dayEventTemplate.propTypes = {
  Stylist: PropTypes.string,
};

export default function CitasCalendar() {
  const defaultValues = {
    cliente: "",
  };
  const { themeStretch } = useSettingsContext();

  const upMd = useResponsive("up", "md");
  const methods = useForm({ defaultValues });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const data = [
    {
      Id: 1,
      Subject: "Cita",
      Stylist: "Roxanne",

      StartTime: new Date(2024, 5, 30, 10, 0),
      EndTime: new Date(2024, 5, 30, 12, 30),
    },
  ];

  return (
    <FormProvider methods={methods}>
      <ScheduleComponent
        height="60vh"
        selectedDate={new Date()}
        eventSettings={{
          dataSource: data,
        }}
      >
        <ViewsDirective>
          <ViewDirective
            option="Day"
            startHour="07:00"
            endHour="24:00"
            eventTemplate={dayEventTemplate}
          />
          <ViewDirective
            option="Week"
            startHour="09:00"
            endHour="19:00"
            showWeekend={false}
            timeScale={{ interval: 60, slotCount: 4 }}
          />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
        <Inject services={[Day, Week, Month, Agenda]} />
      </ScheduleComponent>
    </FormProvider>
  );
}
