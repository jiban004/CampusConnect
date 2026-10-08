import {
  GraduationCap,
  TrendingUp,
  BookOpen,
  CalendarDays,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const semesterData = [
  {
    semester: "Sem 1",
    cgpa: 8.1,
  },
  {
    semester: "Sem 2",
    cgpa: 7.6,
  },
  {
    semester: "Sem 3",
    cgpa: 7.8,
  },
  {
    semester: "Sem 4",
    cgpa: 8.0,
  },
  {
    semester: "Sem 5",
    cgpa: 8.2,
  },
  {
    semester: "Sem 6",
    cgpa: 8.4,
  },
  {
    semester: "Sem 7",
    cgpa: 8.7,
  },
];

const subjects = [
  {
    name: "Data Structures",
    code: "CS401",
    marks: 88,
    grade: "A",
    attendance: 92,
  },
  {
    name: "Database Management",
    code: "CS402",
    marks: 84,
    grade: "A",
    attendance: 87,
  },
  {
    name: "Java Full Stack",
    code: "CS403",
    marks: 91,
    grade: "A+",
    attendance: 95,
  },
  {
    name: "Computer Networks",
    code: "CS404",
    marks: 79,
    grade: "B+",
    attendance: 82,
  },
  {
    name: "Software Engineering",
    code: "CS405",
    marks: 86,
    grade: "A",
    attendance: 89,
  },
];

function Academics() {
  return (
    <div className="academics-page">

      {/* Page Header */}

      <section className="page-heading">
        <div>
          <p className="page-eyebrow">
            ACADEMIC PERFORMANCE
          </p>

          <h1>
            Academics
          </h1>

          <p>
            Track your academic performance, subjects,
            grades, and attendance.
          </p>
        </div>

        <div className="semester-selector">
          <CalendarDays size={15} />
          <span>Semester 7</span>
        </div>
      </section>


      {/* Summary Cards */}

      <section className="academic-stats">

        <div className="academic-stat-card">
          <div className="academic-stat-icon purple">
            <GraduationCap size={21} />
          </div>

          <div>
            <span>Current CGPA</span>
            <strong>8.70</strong>
            <small>Out of 10.0</small>
          </div>
        </div>


        <div className="academic-stat-card">
          <div className="academic-stat-icon green">
            <TrendingUp size={21} />
          </div>

          <div>
            <span>Semester Growth</span>
            <strong>+0.30</strong>
            <small>Compared to last semester</small>
          </div>
        </div>


        <div className="academic-stat-card">
          <div className="academic-stat-icon blue">
            <BookOpen size={21} />
          </div>

          <div>
            <span>Total Subjects</span>
            <strong>5</strong>
            <small>Current semester</small>
          </div>
        </div>


        <div className="academic-stat-card">
          <div className="academic-stat-icon orange">
            <CalendarDays size={21} />
          </div>

          <div>
            <span>Average Attendance</span>
            <strong>89%</strong>
            <small>Across all subjects</small>
          </div>
        </div>

      </section>


      {/* Chart + Overview */}

      <section className="academic-main-grid">

        <div className="academic-chart-card">

          <div className="academic-card-header">
            <div>
              <p className="card-eyebrow">
                PERFORMANCE
              </p>

              <h2>
                Semester Performance
              </h2>

              <p>
                Your CGPA progression across semesters.
              </p>
            </div>
          </div>


          <div className="academic-chart">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={semesterData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#eef0f5"
                />

                <XAxis
                  dataKey="semester"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "#9ca3af",
                  }}
                />

                <YAxis
                  domain={[6, 10]}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "#9ca3af",
                  }}
                />

                <Tooltip
                  contentStyle={{
                    border: "1px solid #e8ebf2",
                    borderRadius: "10px",
                    boxShadow:
                      "0 10px 30px rgba(15, 23, 42, 0.08)",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [
                    `${value}`,
                    "CGPA",
                  ]}
                />

                <Bar
                  dataKey="cgpa"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  barSize={30}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>


        {/* Current Semester */}

        <div className="semester-overview-card">

          <div className="academic-card-header">
            <div>
              <p className="card-eyebrow">
                CURRENT SEMESTER
              </p>

              <h2>
                Semester 7
              </h2>
            </div>
          </div>


          <div className="semester-score">
            <strong>8.70</strong>
            <span>CGPA</span>
          </div>


          <div className="semester-progress">

            <div className="semester-progress-label">
              <span>Semester Progress</span>
              <strong>78%</strong>
            </div>

            <div className="semester-progress-track">
              <div
                className="semester-progress-fill"
                style={{ width: "78%" }}
              ></div>
            </div>

          </div>


          <div className="semester-info">

            <div>
              <span>Credits</span>
              <strong>22</strong>
            </div>

            <div>
              <span>Subjects</span>
              <strong>5</strong>
            </div>

            <div>
              <span>Attendance</span>
              <strong>89%</strong>
            </div>

          </div>

        </div>

      </section>


      {/* Subjects */}

      <section className="subjects-card">

        <div className="subjects-header">

          <div>
            <p className="card-eyebrow">
              SUBJECT PERFORMANCE
            </p>

            <h2>
              Current Subjects
            </h2>

            <p>
              Your marks and attendance for this semester.
            </p>
          </div>

        </div>


        <div className="subjects-table-wrapper">

          <table className="subjects-table">

            <thead>
              <tr>
                <th>Subject</th>
                <th>Code</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Attendance</th>
              </tr>
            </thead>

            <tbody>

              {subjects.map((subject) => (
                <tr key={subject.code}>

                  <td>
                    <div className="subject-name">
                      <div className="subject-dot"></div>

                      <strong>
                        {subject.name}
                      </strong>
                    </div>
                  </td>

                  <td>
                    {subject.code}
                  </td>

                  <td>
                    <strong>
                      {subject.marks}%
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`grade grade-${subject.grade
                        .replace("+", "plus")
                        .toLowerCase()}`}
                    >
                      {subject.grade}
                    </span>
                  </td>

                  <td>

                    <div className="attendance-cell">

                      <div className="attendance-label">
                        <span>{subject.attendance}%</span>
                      </div>

                      <div className="attendance-track">
                        <div
                          className="attendance-fill"
                          style={{
                            width: `${subject.attendance}%`,
                          }}
                        ></div>
                      </div>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

export default Academics;