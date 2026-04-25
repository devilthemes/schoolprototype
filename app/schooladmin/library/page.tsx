"use client";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const LibraryPage = () => {
  const [data, setData] = useState([
    { class: "1", files: 20, bookmarks: 5 },
    { class: "2", files: 35, bookmarks: 7 },
    { class: "3", files: 40, bookmarks: 6 },
    { class: "4", files: 50, bookmarks: 8 },
    { class: "5", files: 60, bookmarks: 9 },
    { class: "6", files: 70, bookmarks: 10 },
    { class: "7", files: 80, bookmarks: 11 },
    { class: "8", files: 90, bookmarks: 12 },
    { class: "9", files: 100, bookmarks: 13 },
    { class: "10", files: 110, bookmarks: 14 },
  ]);

  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <main className="form-signin w-100 m-auto">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Files</th>
                    <th>Bookmarks</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.class}</td>
                      <td>{item.files}</td>
                      <td>{item.bookmarks}</td>
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

export default LibraryPage;
