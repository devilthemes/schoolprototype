"use client";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SubjectPage = () => {
  const [data, setData] = useState([
    { subject: "Math", classes: ["1", "2", "3"] },
    { subject: "Science", classes: ["4", "5", "6"] },
    { subject: "History", classes: ["7", "8", "9"] },
    { subject: "English", classes: ["10", "11", "12"] },
  ]);

  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <main className="form-signin w-100 m-auto">
              <h1>Subjects</h1>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Classes</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.subject}</td>
                      <td>{item.classes.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </main>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SubjectPage;
