interface ClassDetail {
  id: number;
  name: string;
  section: string;
  students: { id: number; name: string }[];
}

export async function generateStaticParams() {
  return [
    { classid: "1" },
    { classid: "2" },
    { classid: "3" },
    { classid: "4" },
    { classid: "5" },
  ];
}

export const dynamicParams = false;

export default function ClassDetailPage() {
  const classId = 1;

  const classData: Record<number, ClassDetail> = {
    1: {
      id: 1,
      name: "Class 10-A",
      section: "A",
      students: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ],
    },
    2: {
      id: 2,
      name: "Class 9-B",
      section: "B",
      students: [
        { id: 3, name: "Bob Johnson" },
        { id: 4, name: "Alice Williams" },
      ],
    },
    3: {
      id: 3,
      name: "Class 8-C",
      section: "C",
      students: [{ id: 5, name: "Charlie Brown" }],
    },
    4: {
      id: 4,
      name: "Class 7-D",
      section: "D",
      students: [],
    },
    5: {
      id: 5,
      name: "Class 6-E",
      section: "E",
      students: [],
    },
  };

  const classDetail = classData[classId];

  if (!classDetail) {
    return (
      <div style={{ padding: "20px" }}>
        <h3>Class not found</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{classDetail.name}</h1>
      <p>
        <strong>Section:</strong> {classDetail.section}
      </p>
      <h3>Students</h3>
      {classDetail.students.length > 0 ? (
        <ul>
          {classDetail.students.map((student) => (
            <li key={student.id}>{student.name}</li>
          ))}
        </ul>
      ) : (
        <p>No students in this class</p>
      )}
    </div>
  );
}
