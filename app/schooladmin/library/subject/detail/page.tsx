"use client";

import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Breadcrumb, ListGroup, Modal, Form } from "react-bootstrap";
import { 
  FileText, 
  FileSpreadsheet, 
  FileImage, 
  FileArchive, 
  File,
  Download,
  Upload,
  Bookmark,
  ExternalLink,
  Plus
} from "lucide-react";

interface FileItem {
  id: number;
  name: string;
  type: "pdf" | "doc" | "image" | "excel" | "zip" | "other";
  size: string;
  url: string;
  updatedAt: string;
}

interface BookmarkItem {
  id: number;
  title: string;
  url: string;
}

const initialFiles: FileItem[] = [
  {
    id: 1,
    name: "Mathematics Syllabus.pdf",
    type: "pdf",
    size: "1.2 MB",
    url: "/assets/files/test.pdf",
    updatedAt: "2024-05-10",
  },
  {
    id: 2,
    name: "Final Exam Prep.docx",
    type: "doc",
    size: "850 KB",
    url: "/assets/files/test.txt",
    updatedAt: "2024-05-12",
  },
  {
    id: 3,
    name: "Geometry Diagrams.jpg",
    type: "image",
    size: "3.4 MB",
    url: "/assets/img/image.jpg",
    updatedAt: "2024-05-15",
  },
  {
    id: 4,
    name: "Student Marks Q1.xlsx",
    type: "excel",
    size: "450 KB",
    url: "#",
    updatedAt: "2024-05-18",
  },
  {
    id: 5,
    name: "Resource Bundle.zip",
    type: "zip",
    size: "15.7 MB",
    url: "#",
    updatedAt: "2024-05-20",
  },
  {
    id: 6,
    name: "Lecture Notes.pdf",
    type: "pdf",
    size: "2.1 MB",
    url: "/assets/files/test.pdf",
    updatedAt: "2024-05-22",
  },
  { id: 7, name: "Algebra Worksheet 1.pdf", type: "pdf", size: "500 KB", url: "#", updatedAt: "2024-05-23" },
  { id: 8, name: "Calculus Formulas.docx", type: "doc", size: "120 KB", url: "#", updatedAt: "2024-05-24" },
  { id: 9, name: "Trigonometry Chart.png", type: "image", size: "2.5 MB", url: "#", updatedAt: "2024-05-25" },
  { id: 10, name: "Class 10 Attendance.xlsx", type: "excel", size: "310 KB", url: "#", updatedAt: "2024-05-26" },
  { id: 11, name: "Historical Math Proofs.zip", type: "zip", size: "45.2 MB", url: "#", updatedAt: "2024-05-27" },
  { id: 12, name: "Mock Test Set A.pdf", type: "pdf", size: "1.8 MB", url: "#", updatedAt: "2024-05-28" },
  { id: 13, name: "Teacher Guide.doc", type: "doc", size: "2.2 MB", url: "#", updatedAt: "2024-05-29" },
  { id: 14, name: "Graph Paper Template.pdf", type: "pdf", size: "50 KB", url: "#", updatedAt: "2024-05-30" },
  { id: 15, name: "Statistics Presentation.pptx", type: "doc", size: "5.6 MB", url: "#", updatedAt: "2024-05-31" },
  { id: 16, name: "Lab Report Sample.pdf", type: "pdf", size: "950 KB", url: "#", updatedAt: "2024-06-01" },
  { id: 17, name: "Summer Assignment.docx", type: "doc", size: "400 KB", url: "#", updatedAt: "2024-06-02" },
  { id: 18, name: "Class Photo 2024.jpg", type: "image", size: "8.1 MB", url: "#", updatedAt: "2024-06-03" },
  { id: 19, name: "Budget Analysis.xlsx", type: "excel", size: "1.1 MB", url: "#", updatedAt: "2024-06-04" },
  { id: 20, name: "Old Archives.zip", type: "zip", size: "120 MB", url: "#", updatedAt: "2024-06-05" },
  { id: 21, name: "Complex Numbers.pdf", type: "pdf", size: "2.4 MB", url: "#", updatedAt: "2024-06-06" },
  { id: 22, name: "Meeting Minutes.docx", type: "doc", size: "150 KB", url: "#", updatedAt: "2024-06-07" },
  { id: 23, name: "Integration Rules.pdf", type: "pdf", size: "600 KB", url: "#", updatedAt: "2024-06-08" },
  { id: 24, name: "Reference Books List.doc", type: "doc", size: "300 KB", url: "#", updatedAt: "2024-06-09" },
  { id: 25, name: "Vector Analysis Diagrams.png", type: "image", size: "4.2 MB", url: "#", updatedAt: "2024-06-10" },
  { id: 26, name: "Grade Sheet Final.xlsx", type: "excel", size: "880 KB", url: "#", updatedAt: "2024-06-11" },
];

const initialBookmarks: BookmarkItem[] = [
  { id: 1, title: "Khan Academy - Algebra", url: "https://www.khanacademy.org/math/algebra" },
  { id: 2, title: "Wolfram Alpha", url: "https://www.wolframalpha.com/" },
  { id: 3, title: "MathWorld", url: "https://mathworld.wolfram.com/" },
  { id: 4, title: "Brilliant.org", url: "https://brilliant.org/" },
  { id: 5, title: "MIT OpenCourseWare - Math", url: "https://ocw.mit.edu/courses/mathematics/" },
  { id: 6, title: "Geogebra Classic", url: "https://www.geogebra.org/classic" },
];

const FileIcon = ({ type }: { type: FileItem["type"] }) => {
  const size = 48;
  switch (type) {
    case "pdf":
      return <FileText size={size} color="#e74c3c" />;
    case "doc":
      return <FileText size={size} color="#2980b9" />;
    case "excel":
      return <FileSpreadsheet size={size} color="#27ae60" />;
    case "image":
      return <FileImage size={size} color="#f39c12" />;
    case "zip":
      return <FileArchive size={size} color="#8e44ad" />;
    default:
      return <File size={size} color="#95a5a6" />;
  }
};

const LibraryDetailPage = () => {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(initialBookmarks);
  
  // Modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);

  // Form states
  const [newBookmark, setNewBookmark] = useState({ title: "", url: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAddBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBookmark.title && newBookmark.url) {
      const bookmark: BookmarkItem = {
        id: bookmarks.length + 1,
        title: newBookmark.title,
        url: newBookmark.url.startsWith("http") ? newBookmark.url : `https://${newBookmark.url}`,
      };
      setBookmarks([...bookmarks, bookmark]);
      setShowBookmarkModal(false);
      setNewBookmark({ title: "", url: "" });
    }
  };

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      // Simulate file upload
      const fileType = selectedFile.name.split(".").pop()?.toLowerCase();
      let type: FileItem["type"] = "other";
      if (fileType === "pdf") type = "pdf";
      else if (["doc", "docx"].includes(fileType || "")) type = "doc";
      else if (["xls", "xlsx"].includes(fileType || "")) type = "excel";
      else if (["jpg", "jpeg", "png", "gif"].includes(fileType || "")) type = "image";
      else if (["zip", "rar", "7z"].includes(fileType || "")) type = "zip";

      const newFile: FileItem = {
        id: files.length + 1,
        name: selectedFile.name,
        type: type,
        size: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
        url: "#",
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setFiles([newFile, ...files]);
      setShowUploadModal(false);
      setSelectedFile(null);
    }
  };

  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <style jsx>{`
        .file-card {
          transition: all 0.2s ease-in-out;
          cursor: pointer;
          border: 1px solid transparent;
          background: transparent;
        }
        .file-card:hover {
          background-color: rgba(0, 120, 215, 0.1);
          border: 1px solid rgba(0, 120, 215, 0.3);
        }
        .file-name {
          font-size: 0.85rem;
          color: #333;
          margin-top: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-align: center;
          height: 2.6rem;
        }
        .file-size {
          font-size: 0.75rem;
          color: #666;
          text-align: center;
        }
        .explorer-header {
          background: white;
          padding: 10px 15px;
          border-bottom: 1px solid #dee2e6;
          margin-bottom: 20px;
        }
        .bookmark-item {
          transition: background-color 0.2s;
        }
        .bookmark-item:hover {
          background-color: #f8f9fa;
        }
      `}</style>

      <div className="explorer-header rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="mb-0">Subject Resources</h4>
          <div className="d-flex gap-2">
            <Button 
              variant="outline-success" 
              size="sm" 
              className="d-flex align-items-center gap-2"
              onClick={() => setShowBookmarkModal(true)}
            >
              <Bookmark size={16} />
              Add Bookmark
            </Button>
            <Button 
              variant="outline-primary" 
              size="sm" 
              className="d-flex align-items-center gap-2"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload size={16} />
              Upload New File
            </Button>
          </div>
        </div>
        <Breadcrumb className="mb-0">
          <Breadcrumb.Item href="/schooladmin">Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item href="/schooladmin/library">Library</Breadcrumb.Item>
          <Breadcrumb.Item active>Mathematics</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Row>
        <Col lg={9}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <Row className="g-4">
                {files.map((file) => (
                  <Col key={file.id} xs={6} sm={4} md={3} lg={2}>
                    <div className="file-card p-3 rounded d-flex flex-column align-items-center">
                      <div className="mb-2">
                        <FileIcon type={file.type} />
                      </div>
                      <div className="file-name fw-semibold" title={file.name}>
                        {file.name}
                      </div>
                      <div className="file-size mb-2">{file.size}</div>
                      <div className="d-flex gap-2">
                        <Button 
                          as="a" 
                          href={file.url} 
                          download={file.name} 
                          variant="link" 
                          size="sm" 
                          className="p-0 text-decoration-none d-flex align-items-center gap-1"
                        >
                          <Download size={14} />
                          Download
                        </Button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3 border-bottom d-flex align-items-center gap-2">
              <Bookmark size={20} className="text-primary" />
              <h5 className="mb-0">Bookmarks</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {bookmarks.map((bookmark) => (
                  <ListGroup.Item 
                    key={bookmark.id} 
                    action 
                    as="a" 
                    href={bookmark.url} 
                    target="_blank"
                    className="bookmark-item border-0 py-3 px-4 d-flex justify-content-between align-items-center"
                  >
                    <div className="text-truncate mr-2">
                      <div className="fw-semibold text-dark">{bookmark.title}</div>
                      <small className="text-muted text-truncate d-block">{bookmark.url}</small>
                    </div>
                    <ExternalLink size={16} className="text-muted flex-shrink-0" />
                  </ListGroup.Item>
                ))}
                {bookmarks.length === 0 && (
                  <ListGroup.Item className="text-center py-4 text-muted">
                    No bookmarks added.
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Upload File Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload New File</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFileUpload}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Select File</Form.Label>
              <Form.Control 
                type="file" 
                onChange={(e: any) => setSelectedFile(e.target.files[0])}
                required
              />
              <Form.Text className="text-muted">
                Supported formats: PDF, Word, Excel, Images, Zip
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={!selectedFile}>
              Upload
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Add Bookmark Modal */}
      <Modal show={showBookmarkModal} onHide={() => setShowBookmarkModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Bookmark</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddBookmark}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Bookmark Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="e.g. Khan Academy"
                value={newBookmark.title}
                onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="https://example.com"
                value={newBookmark.url}
                onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowBookmarkModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Bookmark
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default LibraryDetailPage;
