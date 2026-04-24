"use client";

import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  ListGroup,
  Image,
} from "react-bootstrap";
import { useRouter } from "next/navigation";

interface Message {
  id: number;
  sender: "teacher" | "student";
  text: string;
  timestamp: string;
  files?: Array<{ name: string; type: string }>;
}

export default function Message() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "student",
      text: "Hello teacher, I have completed the assignment. Please find the attached files.",
      timestamp: "2024-10-25 10:30 AM",
      files: [{ name: "math_homework.pdf", type: "pdf" }],
    },
    {
      id: 2,
      sender: "teacher",
      text: "Great job! Let me review it and I'll get back to you.",
      timestamp: "2024-10-25 11:15 AM",
    },
    {
      id: 3,
      sender: "student",
      text: "I also have a question about the third exercise. Is it okay if I used the alternative formula?",
      timestamp: "2024-10-25 11:20 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const msg: Message = {
        id: messages.length + 1,
        sender: "teacher",
        text: newMessage,
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, msg]);
      setNewMessage("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const uploadedFiles = Array.from(files).map((file) => ({
        name: file.name,
        type: file.name.split(".").pop() || "",
      }));

      const msg: Message = {
        id: messages.length + 1,
        sender: "teacher",
        text: "Sent files:",
        timestamp: new Date().toLocaleString(),
        files: uploadedFiles,
      };
      setMessages([...messages, msg]);
    }
  };

  const allowedFileTypes =
    ".mp4,.mp3,.txt,.jpg,.jpeg,.png,.pptx,.doc,.docx,.xls,.ppt,.pdf";

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Math Homework</h2>
          <p className="text-muted">Complete exercises 1-10 on page 23 ...</p>
        </div>
        <Button
          variant="outline-secondary"
          onClick={() =>
            router.push("/schooladmin/teachers/teacher/assignment")
          }
        >
          Back to Assignments
        </Button>
      </div>

      <Row>
        <Col lg={3}>
          <Card className="mb-4">
            <Card.Body className="text-center flex column flex-column justify-content-center">
              <div className="flex column  justify-content-center">
                <img
                  src="/assets/img/user.png"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "15px",
                    backgroundColor: "#f8f9fa",
                  }}
                  alt="Student Avatar"
                />
              </div>
              <h4>John Doe</h4>
              <p className="text-muted">Class 10 - Section A</p>
              <hr />
              <div className="text-start">
                <p>
                  <strong>Assignment:</strong> Math Homework 1
                </p>
                <p>
                  <strong>Due Date:</strong> Oct 30, 2024
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="badge bg-warning text-dark">In Review</span>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9}>
          <Card
            style={{
              height: "600px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card.Header className="bg-light d-flex align-items-center">
              <Image
                src="/assets/img/user.png"
                roundedCircle
                style={{ width: "40px", height: "40px", marginRight: "10px" }}
                alt="Teacher Avatar"
              />
              <h5 className="mb-0">Chat with John Doe</h5>
            </Card.Header>

            <Card.Body
              className="overflow-auto p-4"
              style={{ flex: 1, backgroundColor: "#f0f2f5" }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`d-flex mb-3 ${msg.sender === "teacher" ? "justify-content-end" : "justify-content-start"}`}
                >
                  {msg.sender === "student" && (
                    <Image
                      src="/assets/img/user.png"
                      roundedCircle
                      style={{
                        width: "35px",
                        height: "35px",
                        marginRight: "10px",
                      }}
                      alt="Student"
                    />
                  )}
                  <div
                    style={{
                      maxWidth: "75%",
                      padding: "10px 15px",
                      borderRadius: "15px",
                      backgroundColor:
                        msg.sender === "teacher" ? "#007bff" : "#ffffff",
                      color: msg.sender === "teacher" ? "#ffffff" : "#333333",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div className="small mb-1" style={{ opacity: 0.8 }}>
                      {msg.sender === "teacher" ? "You" : "John Doe"} •{" "}
                      {msg.timestamp}
                    </div>
                    <div>{msg.text}</div>
                    {msg.files && msg.files.length > 0 && (
                      <div className="mt-2 pt-2 border-top border-light">
                        {msg.files.map((file, idx) => (
                          <div
                            key={idx}
                            className="d-flex align-items-center mb-1"
                          >
                            <span className="me-2">📄</span>
                            <a
                              href="#"
                              className={
                                msg.sender === "teacher"
                                  ? "text-white"
                                  : "text-primary"
                              }
                              style={{
                                textDecoration: "none",
                                fontSize: "0.9rem",
                              }}
                            >
                              {file.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {msg.sender === "teacher" && (
                    <Image
                      src="/assets/img/user.png"
                      roundedCircle
                      style={{
                        width: "35px",
                        height: "35px",
                        marginLeft: "10px",
                      }}
                      alt="Teacher"
                    />
                  )}
                </div>
              ))}
            </Card.Body>

            {/* <Card.Footer className="bg-white p-3">
              <Form onSubmit={handleSendMessage}>
                <InputGroup>
                  <Button
                    variant="outline-secondary"
                    onClick={() => fileInputRef.current?.click()}
                    title="Attach Files"
                  >
                    📎
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    multiple
                    accept={allowedFileTypes}
                    onChange={handleFileUpload}
                  />
                  <Form.Control
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                </InputGroup>
                <div className="small text-muted mt-2">
                  Allowed files: .mp4, .mp3, .txt, .jpg, .jpeg, .png, .pptx,
                  .doc, .docx, .xls, .ppt, .pdf
                </div>
              </Form>
            </Card.Footer> */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
