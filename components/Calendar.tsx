"use client";

import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

export interface CalendarEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  type: "event" | "holiday";
}

interface CalendarProps {
  events: CalendarEvent[];
  initialDate?: Date;
  onEventClick?: (event: CalendarEvent) => void;
}

export default function Calendar({ events, initialDate, onEventClick }: CalendarProps) {
  const [viewDate, setViewDate] = useState(initialDate || new Date(2024, 4, 1)); // Default to May 2024 as per current data

  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const monthName = viewDate.toLocaleString("default", { month: "long" });

  const days = [];
  // Empty slots for days before the 1st of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<Col key={`empty-${i}`} className="p-2 border bg-light d-none d-md-block" style={{ minHeight: "100px" }}></Col>);
  }

  // Days of the month
  for (let day = 1; day <= totalDays; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayEvents = events.filter((e) => e.date === dateStr);
    const dayOfWeek = new Date(year, month, day).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // 0 is Sunday, 6 is Saturday

    let cellClass = "p-2 border d-flex flex-column align-items-center justify-content-center text-center ";
    let cellStyle: React.CSSProperties = { minHeight: "100px", width: "14.28%" };

    if (isWeekend) {
      cellClass += "text-danger ";
      cellStyle.backgroundColor = "rgba(220, 53, 69, 0.1)";
    } else if (dayEvents.length > 0) {
      cellClass += "bg-light ";
    }

    days.push(
      <Col 
        key={day} 
        className={cellClass} 
        style={cellStyle}
      >
        <span className="fs-2">{day}</span>
        <div className="w-100 px-1 mt-1">
          {dayEvents.map((e) => (
            <div 
              key={e.id} 
              className={`p-1 mb-1 rounded small text-truncate ${e.type === "holiday" ? "bg-danger text-white" : "bg-primary text-white"}`}
              title={e.title}
              onClick={(ev) => {
                ev.stopPropagation();
                if (onEventClick) onEventClick(e);
              }}
              style={{ cursor: "pointer", fontSize: "0.7rem" }}
            >
              {e.title}
            </div>
          ))}
        </div>
      </Col>
    );
  }

  // Fill remaining days to complete the last row
  const totalSlots = days.length;
  const remainingSlots = (7 - (totalSlots % 7)) % 7;
  for (let i = 0; i < remainingSlots; i++) {
    days.push(<Col key={`empty-end-${i}`} className="p-2 border bg-light d-none d-md-block" style={{ minHeight: "100px" }}></Col>);
  }

  const rows = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(
      <Row key={`row-${i}`} className="g-0">
        {days.slice(i, i + 7)}
      </Row>
    );
  }

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="bg-white py-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{monthName} {year}</h5>
          <div className="btn-group">
            <Button variant="outline-secondary" size="sm" onClick={prevMonth}>&lt; Prev</Button>
            <Button variant="outline-secondary" size="sm" onClick={() => setViewDate(new Date())}>Today</Button>
            <Button variant="outline-secondary" size="sm" onClick={nextMonth}>Next &gt;</Button>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <Row className="g-0 text-center fw-bold bg-light border-bottom">
          <Col className="p-2 border-end">Sun</Col>
          <Col className="p-2 border-end">Mon</Col>
          <Col className="p-2 border-end">Tue</Col>
          <Col className="p-2 border-end">Wed</Col>
          <Col className="p-2 border-end">Thu</Col>
          <Col className="p-2 border-end">Fri</Col>
          <Col className="p-2">Sat</Col>
        </Row>
        {rows}
      </Card.Body>
    </Card>
  );
}
