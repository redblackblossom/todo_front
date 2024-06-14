import { Grid } from "@mui/material";
import { useState } from "react";
import "./calendar.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import classNames from "classnames";
import { specificDate } from "../formatting/date";

const isDateInRange = (date, startDate, endDate) => {
  const targetDate = new Date(date);
  targetDate.setHours(9);
  const start = new Date(startDate);
  const end = new Date(endDate);
  return targetDate >= start && targetDate <= end;
};

async function fetchEvents(startDate, endDate) {
  const response = await fetch("/api/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startDate: startDate, endDate: endDate }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export default function TodoCalendar({ updateViewDate, viewDate, todoList }) {
  const initialDate = new Date(viewDate);
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());

  const handleDateChange = (date) => {
    updateViewDate(specificDate(date));
  };

  const handleMonthChange = ({ activeStartDate }) => {
    const newMonth = activeStartDate.getMonth();
    const newYear = activeStartDate.getFullYear();
    setCurrentMonth(newMonth + 1);
    setCurrentYear(newYear);
    fetchEvents;
  };

  const tileContent = ({ date, view }) => {
    let cnt = 0;
    let done = 0;
    for (let i = 0; i < todoList.length; ++i) {
      if (
        isDateInRange(date, todoList[i]["startDate"], todoList[i]["endDate"])
      ) {
        cnt++;
        if (todoList[i]["done"]) done++;
      }
    }
    const bg_color = done === cnt ? "bg-blue-400" : "bg-red-400";
    if (view === "month" && cnt != 0) {
      return (
        <div className="relative">
          <span
            className={`absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-400 bg-opacity-75 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-50 ${bg_color}`}
          >
            {cnt}
          </span>
        </div>
      );
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const day = date.getDay();
      const isCurrentMonth =
        date.getMonth() === currentMonth - 1 &&
        date.getFullYear() === currentYear;
      const isSaturday = day === 6;
      const isSunday = day === 0;
      const isSelected =
        date.toDateString() === new Date(viewDate).toDateString();

      return classNames({
        "react-calendar__tile--current-month-saturday":
          isSaturday && isCurrentMonth,
        "react-calendar__tile--current-month-sunday":
          isSunday && isCurrentMonth,
        "react-calendar__tile--next-month-saturday":
          isSaturday && !isCurrentMonth,
        "react-calendar__tile--next-month-sunday": isSunday && !isCurrentMonth,
        "react-calendar__tile--selected": isSelected,
      });
    }
    return null;
  };
  return (
    <Grid item>
      <Calendar
        onChange={handleDateChange}
        value={new Date(viewDate)}
        onActiveStartDateChange={handleMonthChange}
        tileContent={tileContent}
        tileClassName={tileClassName}
        className="mt-2 rounded-md shadow-lg"
      />
    </Grid>
  );
}
