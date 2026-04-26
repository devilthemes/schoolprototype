"use client";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
const SubjectPage = () => {
  const [data, setData] = useState([
    { class: "Science", files: 20, bookmarks: 5 },
    { class: "English", files: 35, bookmarks: 7 },
    { class: "Mathematics", files: 40, bookmarks: 6 },
    { class: "Social Studies", files: 50, bookmarks: 8 },
    { class: "History", files: 60, bookmarks: 9 },
    { class: "Geography", files: 70, bookmarks: 10 },
    { class: "Physics", files: 80, bookmarks: 11 },
  ]);
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();
  const handleAdd = () => {
    // Add student logic here
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Subjects</h1>
      </div>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
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
                      onClick={() =>
                        router.push(`/teacher/library/subject/detail`)
                      }
                    >
                      Detail
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

export default SubjectPage;
