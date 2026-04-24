"use client";

import React, { useState } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";

interface CalendarEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  type: "event" | "holiday";
}

const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    date: "2024-05-01",
    title: "Labor Day",
    description: "International Workers' Day - Public Holiday",
    type: "holiday",
  },
  {
    id: 2,
    date: "2024-05-15",
    title: "Annual Sports Day",
    description: "School annual sports competition at the main stadium.",
    type: "event",
  },
  {
    id: 3,
    date: "2024-06-10",
    title: "Final Term Exams",
    description: "Final examination for all classes starts.",
    type: "event",
  },
  {
    id: 4,
    date: "2024-07-04",
    title: "Independence Day",
    description: "National Holiday",
    type: "holiday",
  },
];

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [currentEvent, setCurrentEvent] = useState<CalendarEvent | null>(null);
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    date: "",
    title: "",
    description: "",
    type: "event",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: CalendarEvent = {
      id: events.length + 1,
      date: formData.date || "",
      title: formData.title || "",
      description: formData.description || "",
      type: (formData.type as "event" | "holiday") || "event",
    };
    setEvents([...events, newEvent]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentEvent) {
      const updatedEvents = events.map((ev) =>
        ev.id === currentEvent.id ? { ...ev, ...formData } : ev
      );
      setEvents(updatedEvents as CalendarEvent[]);
      setShowEditModal(false);
      resetForm();
    }
  };

  const handleDeleteEvent = () => {
    if (currentEvent) {
      setEvents(events.filter((ev) => ev.id !== currentEvent.id));
      setShowDeleteConfirm(false);
      setCurrentEvent(null);
    }
  };

  const openEditModal = (event: CalendarEvent) => {
    setCurrentEvent(event);
    setFormData(event);
    setShowEditModal(true);
  };

  const openDetailModal = (event: CalendarEvent) => {
    setCurrentEvent(event);
    setShowDetailModal(true);
  };

  const openDeleteConfirm = (event: CalendarEvent) => {
    setCurrentEvent(event);
    setShowDeleteConfirm(true);
  };

  const resetForm = () => {
    setFormData({
      date: "",
      title: "",
      description: "",
      type: "event",
    });
    setCurrentEvent(null);
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">School Calendar</h1>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add Event
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event) => (
                <tr key={event.id}>
                  <td>{event.date}</td>
                  <td>{event.title}</td>
                  <td>
                    <Badge bg={event.type === "holiday" ? "danger" : "info"}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-info" 
                        size="sm" 
                        onClick={() => openDetailModal(event)}
                      >
                        Detail
                      </Button>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        onClick={() => openEditModal(event)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => openDeleteConfirm(event)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4">No events found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => { setShowAddModal(false); resetForm(); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddEvent}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title" 
                required 
                onChange={handleInputChange}
                placeholder="Event Title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control 
                type="date" 
                name="date" 
                required 
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" onChange={handleInputChange}>
                <option value="event">Event</option>
                <option value="holiday">Holiday</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="description" 
                onChange={handleInputChange}
                placeholder="Short description..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowAddModal(false); resetForm(); }}>Cancel</Button>
            <Button variant="primary" type="submit">Add to Calendar</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => { setShowEditModal(false); resetForm(); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditEvent}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title" 
                value={formData.title} 
                required 
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control 
                type="date" 
                name="date" 
                value={formData.date} 
                required 
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" value={formData.type} onChange={handleInputChange}>
                <option value="event">Event</option>
                <option value="holiday">Holiday</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowEditModal(false); resetForm(); }}>Cancel</Button>
            <Button variant="primary" type="submit">Update Event</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal show={showDetailModal} onHide={() => { setShowDetailModal(false); resetForm(); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentEvent && (
            <div>
              <h5>{currentEvent.title}</h5>
              <p><strong>Date:</strong> {currentEvent.date}</p>
              <p><strong>Type:</strong> <Badge bg={currentEvent.type === "holiday" ? "danger" : "info"}>{currentEvent.type.toUpperCase()}</Badge></p>
              <hr />
              <h6>Description:</h6>
              <p>{currentEvent.description || "No description provided."}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowDetailModal(false); resetForm(); }}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this event?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteEvent}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
