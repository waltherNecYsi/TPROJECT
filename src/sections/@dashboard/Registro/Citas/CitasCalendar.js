import React, { useState, useRef } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { useForm, Controller } from "react-hook-form";

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

import { useEditorTemplate, dayEventTemplate } from "./CitasCalendarTemplate";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCeUx0THxbf1x0ZFRHal9ZTnZZUj0eQnxTdEFjX31XcndWTmBbV0d1WQ=="
);

export default function CitasCalendar() {
  // const { themeStretch } = useSettingsContext();

  // const upMd = useResponsive("up", "md");
  const scheduleRef = useRef(null);

  const handlePopupOpen = (args) => {
    console.log(args);
    if (args.type === "Editor" && !args.data.Subject) {
      args.element.querySelector(".e-title-text").innerHTML = "Nuevo Evento";
    } else if (args.type === "Editor" && args.data.Subject) {
      args.element.querySelector(".e-title-text").innerHTML = "Editar Evento";
    }
  };

  const handleActionBegin = (args) => {
    if (args.requestType === "eventCreate") {
      console.log("a");
      console.log(data);
    } else if (args.requestType === "eventChange") {
      console.log("b");
    } else if (args.requestType === "eventDelete") {
      console.log("c");
    }
  };

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
    <>
      <ScheduleComponent
        height="60vh"
        selectedDate={new Date()}
        ref={scheduleRef}
        popupOpen={handlePopupOpen}
          actionBegin={handleActionBegin}
        editorTemplate={useEditorTemplate}
        eventSettings={{
          dataSource: data,
          editDialogTitle: "Editar Evento",
        }}
      >
        <ViewsDirective>
          <ViewDirective
            option="Day"
            // startHour="07:00"
            // endHour="24:00"
            eventTemplate={dayEventTemplate}
          />
          <ViewDirective
            option="Week"
            // startHour="09:00"
            // endHour="19:00"
            showWeekend={false}
            timeScale={{ interval: 60, slotCount: 4 }}
          />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
        <Inject services={[Day, Week, Month, Agenda]} />
      </ScheduleComponent>
    </>
  );
}
