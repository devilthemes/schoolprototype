interface Exam {
  examName: string;
  date: string;
  score: number;
  totalMarks: number;
  grade: string;
  remarks: string;
}

export async function generateStaticParams() {
  const studentIds = [1, 2, 3, 4, 5];
  const examIds = [1, 2, 3, 4, 5];

  const params = [];
  for (const studentid of studentIds) {
    for (const examid of examIds) {
      params.push({
        studentid: studentid.toString(),
        examid: examid.toString(),
      });
    }
  }
  return params;
}

const examData: Record<string, Exam> = {
  "1-1": {
    examName: "Mid Term Exam",
    date: "2026-10-15",
    score: 85,
    totalMarks: 100,
    grade: "A",
    remarks: "Excellent performance",
  },
  "1-2": {
    examName: "Unit Test 1",
    date: "2026-09-20",
    score: 78,
    totalMarks: 100,
    grade: "B+",
    remarks: "Good effort",
  },
  "2-1": {
    examName: "Mid Term Exam",
    date: "2026-10-15",
    score: 92,
    totalMarks: 100,
    grade: "A+",
    remarks: "Outstanding performance",
  },
  "2-2": {
    examName: "Unit Test 1",
    date: "2026-09-20",
    score: 88,
    totalMarks: 100,
    grade: "A",
    remarks: "Very good",
  },
};

export default function ExamDetail({
  params,
}: {
  params: { studentid: string; examid: string };
}) {
  const studentId = Number(params.studentid);
  const examId = Number(params.examid);
  const exam = examData[`${studentId}-${examId}`];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>{exam?.examName || "Exam not found"}</h1>
      {exam && (
        <div style={{ marginTop: "20px", lineHeight: "1.8" }}>
          <p>
            <strong>Student ID:</strong> {studentId}
          </p>
          <p>
            <strong>Date:</strong> {exam.date}
          </p>
          <p>
            <strong>Score:</strong> {exam.score}/{exam.totalMarks}
          </p>
          <p>
            <strong>Grade:</strong> {exam.grade}
          </p>
          <p>
            <strong>Remarks:</strong> {exam.remarks}
          </p>
        </div>
      )}
    </div>
  );
}
