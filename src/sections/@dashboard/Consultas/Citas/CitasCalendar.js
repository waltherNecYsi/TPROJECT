import React, { useState } from "react";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";


import useResponsive from "../../../../hooks/useResponsive";

import { useSettingsContext } from "../../../../components/settings";

import FormProvider from "../../../../components/hook-form/FormProvider";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCeUx0THxbf1x0ZFRHal9ZTnZZUj0eQnxTdEFjX31XcndWTmBbV0d1WQ=="
);

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
      Location: "Space Center USA",
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
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </FormProvider>
  );
}
