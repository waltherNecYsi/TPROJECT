import React, { useState } from "react";
import { Box } from "@mui/material";
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

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCeUx0THxbf1x0ZFRHal9ZTnZZUj0eQnxTdEFjX31XcndWTmBbV0d1WQ=="
);

const dayEventTemplate = (props) => {
  console.log(props);
  const { Stylist } = props;
  return <div className="e-subject">Estilista: {Stylist}</div>;
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
        <ViewsDirective>
          <ViewDirective
            option="Day"
            startHour="07:00"
            endHour="18:00"
            eventTemplate={dayEventTemplate}
          />
          {/* <ViewDirective option='Week' startHour='09:00' endHour='19:00' showWeekend={false} timeScale={{ interval: 60, slotCount: 4 }}/>
              <ViewDirective option='Month' group={{ resources: ['Owners'] }} eventTemplate={monthEventTemplate}/>
              <ViewDirective option='Agenda' eventTemplate={agendaTemplate}/> */}
        </ViewsDirective>
        <Inject services={[Day, Week, Month, Agenda]} />
      </ScheduleComponent>
    </FormProvider>
  );
}
