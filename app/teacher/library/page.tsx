"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
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
  const [showFilter, setShowFilter] = useState(false);

  const handleAdd = () => {
    // Add student logic here
  };
  const router = useRouter();
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Library</h1>
      </div>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Class</th>
                <th>Files</th>
                <th>Bookmarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.class}</td>
                  <td>{item.files}</td>
                  <td>{item.bookmarks}</td>
                  <td>
                    <Button
                      onClick={() => router.push(`/teacher/library/subject`)}
                    >
                      Show Subjects
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default LibraryPage;
