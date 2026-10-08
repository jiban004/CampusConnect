import { useMemo, useState } from "react";

import {
  CalendarDays,
  Search,
  Clock3,
  MapPin,
  UserRound,
  BookOpen,
  ChevronRight,
  LayoutGrid,
  Sparkles,
} from "lucide-react";

const timetable = [
  {
    id: 1,
    day: "Monday",
    shortDay: "Mon",
    time: "09:00 AM",
    endTime: "10:00 AM",
    subject: "Data Structures",
    code: "CS401",
    room: "Room 204",
    faculty: "Dr. Priya Sharma",
    type: "Lecture",
    color: "purple",
  },
  {
    id: 2,
    day: "Monday",
    shortDay: "Mon",
    time: "11:00 AM",
    endTime: "12:00 PM",
    subject: "Database Management",
    code: "CS402",
    room: "Lab 3",
    faculty: "Prof. Rahul Mehta",
    type: "Lab",
    color: "blue",
  },
  {
    id: 3,
    day: "Monday",
    shortDay: "Mon",
    time: "02:00 PM",
    endTime: "04:00 PM",
    subject: "Java Full Stack",
    code: "CS403",
    room: "Lab 5",
    faculty: "Prof. Arjun Rao",
    type: "Practical",
    color: "green",
  },

  {
    id: 4,
    day: "Tuesday",
    shortDay: "Tue",
    time: "09:00 AM",
    endTime: "10:00 AM",
    subject: "Computer Networks",
    code: "CS404",
    room: "Room 301",
    faculty: "Dr. Neha Kapoor",
    type: "Lecture",
    color: "orange",
  },
  {
    id: 5,
    day: "Tuesday",
    shortDay: "Tue",
    time: "11:00 AM",
    endTime: "12:00 PM",
    subject: "Software Engineering",
    code: "CS405",
    room: "Room 205",
    faculty: "Prof. Vikram Singh",
    type: "Lecture",
    color: "pink",
  },
  {
    id: 6,
    day: "Tuesday",
    shortDay: "Tue",
    time: "02:00 PM",
    endTime: "04:00 PM",
    subject: "Web Technologies",
    code: "CS406",
    room: "Lab 2",
    faculty: "Dr. Ananya Das",
    type: "Practical",
    color: "cyan",
  },

  {
    id: 7,
    day: "Wednesday",
    shortDay: "Wed",
    time: "10:00 AM",
    endTime: "11:00 AM",
    subject: "Data Structures",
    code: "CS401",
    room: "Room 204",
    faculty: "Dr. Priya Sharma",
    type: "Lecture",
    color: "purple",
  },
  {
    id: 8,
    day: "Wednesday",
    shortDay: "Wed",
    time: "12:00 PM",
    endTime: "01:00 PM",
    subject: "Operating Systems",
    code: "CS407",
    room: "Room 302",
    faculty: "Prof. Suresh Patnaik",
    type: "Lecture",
    color: "red",
  },
  {
    id: 9,
    day: "Wednesday",
    shortDay: "Wed",
    time: "02:00 PM",
    endTime: "04:00 PM",
    subject: "Database Management",
    code: "CS402",
    room: "Lab 3",
    faculty: "Prof. Rahul Mehta",
    type: "Practical",
    color: "blue",
  },

  {
    id: 10,
    day: "Thursday",
    shortDay: "Thu",
    time: "09:00 AM",
    endTime: "10:00 AM",
    subject: "Java Full Stack",
    code: "CS403",
    room: "Room 205",
    faculty: "Prof. Arjun Rao",
    type: "Lecture",
    color: "green",
  },
  {
    id: 11,
    day: "Thursday",
    shortDay: "Thu",
    time: "11:00 AM",
    endTime: "12:00 PM",
    subject: "Computer Networks",
    code: "CS404",
    room: "Room 301",
    faculty: "Dr. Neha Kapoor",
    type: "Lecture",
    color: "orange",
  },
  {
    id: 12,
    day: "Thursday",
    shortDay: "Thu",
    time: "02:00 PM",
    endTime: "04:00 PM",
    subject: "Mini Project",
    code: "CS408",
    room: "Innovation Lab",
    faculty: "Prof. Arjun Rao",
    type: "Project",
    color: "indigo",
  },

  {
    id: 13,
    day: "Friday",
    shortDay: "Fri",
    time: "09:00 AM",
    endTime: "10:00 AM",
    subject: "Software Engineering",
    code: "CS405",
    room: "Room 205",
    faculty: "Prof. Vikram Singh",
    type: "Lecture",
    color: "pink",
  },
  {
    id: 14,
    day: "Friday",
    shortDay: "Fri",
    time: "11:00 AM",
    endTime: "01:00 PM",
    subject: "Web Technologies",
    code: "CS406",
    room: "Lab 2",
    faculty: "Dr. Ananya Das",
    type: "Practical",
    color: "cyan",
  },
  {
    id: 15,
    day: "Friday",
    shortDay: "Fri",
    time: "02:00 PM",
    endTime: "03:00 PM",
    subject: "Career Development",
    code: "CC401",
    room: "Seminar Hall",
    faculty: "Training & Placement Cell",
    type: "Workshop",
    color: "yellow",
  },

  {
    id: 16,
    day: "Saturday",
    shortDay: "Sat",
    time: "10:00 AM",
    endTime: "12:00 PM",
    subject: "Project Development",
    code: "CS409",
    room: "Innovation Lab",
    faculty: "Prof. Arjun Rao",
    type: "Project",
    color: "indigo",
  },
  {
    id: 17,
    day: "Saturday",
    shortDay: "Sat",
    time: "01:00 PM",
    endTime: "02:00 PM",
    subject: "Placement Preparation",
    code: "CC402",
    room: "Seminar Hall",
    faculty: "Placement Cell",
    type: "Training",
    color: "yellow",
  },
];

const days = [
  { label: "All", short: "ALL" },
  { label: "Monday", short: "MON" },
  { label: "Tuesday", short: "TUE" },
  { label: "Wednesday", short: "WED" },
  { label: "Thursday", short: "THU" },
  { label: "Friday", short: "FRI" },
  { label: "Saturday", short: "SAT" },
];

function Timetable() {
  const [activeDay, setActiveDay] = useState("All");
  const [search, setSearch] = useState("");

  const filteredClasses = useMemo(() => {
    const query = search.toLowerCase().trim();

    return timetable.filter((item) => {
      const matchesDay =
        activeDay === "All" || item.day === activeDay;

      const matchesSearch =
        !query ||
        item.subject.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query) ||
        item.faculty.toLowerCase().includes(query) ||
        item.room.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query);

      return matchesDay && matchesSearch;
    });
  }, [activeDay, search]);

  const weeklyClasses = timetable.length;
  const rooms = new Set(timetable.map((item) => item.room)).size;
  const faculty = new Set(timetable.map((item) => item.faculty)).size;
  const busiestDay = days
    .slice(1)
    .map((day) => ({
      day: day.label,
      count: timetable.filter((item) => item.day === day.label).length,
    }))
    .sort((a, b) => b.count - a.count)[0];

  const groupedClasses = days
    .slice(1)
    .map((day) => ({
      ...day,
      classes: filteredClasses.filter(
        (item) => item.day === day.label
      ),
    }))
    .filter((day) => day.classes.length > 0);

  return (
    <div className="timetable-page">
      {/* HERO */}
      <section className="timetable-hero">
        <div className="timetable-hero-content">
          <div className="timetable-badge">
            <Sparkles size={14} />
            <span>Weekly Academic Schedule</span>
          </div>

          <h1>
            Your week,
            <span> organized.</span>
          </h1>

          <p>
            See your lectures, labs, projects and training sessions
            at a glance. Never miss your next class.
          </p>

          <div className="timetable-hero-meta">
            <div>
              <CalendarDays size={16} />
              <span>Semester 7</span>
            </div>

            <div>
              <Clock3 size={16} />
              <span>{weeklyClasses} classes this week</span>
            </div>
          </div>
        </div>

        <div className="timetable-hero-visual">
          <div className="schedule-orb orb-purple"></div>
          <div className="schedule-orb orb-blue"></div>

          <div className="floating-schedule-card">
            <div className="floating-clock">
              <Clock3 size={21} />
            </div>

            <div>
              <span>UP NEXT</span>
              <strong>Java Full Stack</strong>
              <small>02:00 PM · Lab 5</small>
            </div>

            <ChevronRight size={18} />
          </div>

          <div className="floating-week-card">
            <LayoutGrid size={17} />
            <div>
              <strong>7</strong>
              <span>days planned</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="timetable-stats">
        <div className="timetable-stat purple">
          <div className="timetable-stat-icon">
            <BookOpen size={20} />
          </div>

          <div>
            <span>Weekly Classes</span>
            <strong>{weeklyClasses}</strong>
            <small>Across all subjects</small>
          </div>
        </div>

        <div className="timetable-stat blue">
          <div className="timetable-stat-icon">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Daily Average</span>
            <strong>{(weeklyClasses / 6).toFixed(1)}</strong>
            <small>Classes per day</small>
          </div>
        </div>

        <div className="timetable-stat green">
          <div className="timetable-stat-icon">
            <MapPin size={20} />
          </div>

          <div>
            <span>Classrooms</span>
            <strong>{rooms}</strong>
            <small>Rooms & labs</small>
          </div>
        </div>

        <div className="timetable-stat orange">
          <div className="timetable-stat-icon">
            <UserRound size={20} />
          </div>

          <div>
            <span>Faculty</span>
            <strong>{faculty}</strong>
            <small>Teaching staff</small>
          </div>
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="timetable-toolbar">
        <div className="timetable-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search subject, faculty, room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button onClick={() => setSearch("")}>
              ×
            </button>
          )}
        </div>

        <div className="day-selector">
          {days.map((day) => (
            <button
              key={day.label}
              className={
                activeDay === day.label
                  ? "day-button active"
                  : "day-button"
              }
              onClick={() => setActiveDay(day.label)}
            >
              <span className="day-full">{day.label}</span>
              <span className="day-short">{day.short}</span>
            </button>
          ))}
        </div>
      </section>

      {/* WEEKLY OVERVIEW */}
      <section className="weekly-overview">
        <div className="weekly-overview-heading">
          <div>
            <p className="page-eyebrow">WEEKLY VIEW</p>
            <h2>
              {activeDay === "All"
                ? "Your Class Schedule"
                : `${activeDay}'s Schedule`}
            </h2>
            <p>
              {filteredClasses.length}{" "}
              {filteredClasses.length === 1 ? "class" : "classes"} found
            </p>
          </div>

          <div className="busiest-day">
            <span>Busiest day</span>
            <strong>
              {busiestDay.day.slice(0, 3)} · {busiestDay.count} classes
            </strong>
          </div>
        </div>

        {filteredClasses.length === 0 ? (
          <div className="timetable-empty">
            <div>
              <Search size={28} />
            </div>
            <h3>No classes found</h3>
            <p>
              Try a different day or search for another subject.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveDay("All");
              }}
            >
              Reset timetable
            </button>
          </div>
        ) : (
          <div className="weekly-grid">
            {groupedClasses.map((day) => (
              <div className="day-column" key={day.label}>
                <div className="day-column-header">
                  <div>
                    <span>{day.short}</span>
                    <strong>{day.label}</strong>
                  </div>

                  <em>{day.classes.length}</em>
                </div>

                <div className="day-classes">
                  {day.classes.map((item) => (
                    <article
                      className={`schedule-card schedule-${item.color}`}
                      key={item.id}
                    >
                      <div className="schedule-top">
                        <div className="schedule-time">
                          <Clock3 size={13} />
                          <span>
                            {item.time} – {item.endTime}
                          </span>
                        </div>

                        <span className="schedule-type">
                          {item.type}
                        </span>
                      </div>

                      <div className="schedule-main">
                        <div className="schedule-icon">
                          <BookOpen size={17} />
                        </div>

                        <div>
                          <h3>{item.subject}</h3>
                          <span>{item.code}</span>
                        </div>
                      </div>

                      <div className="schedule-details">
                        <div>
                          <MapPin size={13} />
                          <span>{item.room}</span>
                        </div>

                        <div>
                          <UserRound size={13} />
                          <span>{item.faculty}</span>
                        </div>
                      </div>

                      <button className="schedule-arrow">
                        <ChevronRight size={15} />
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Timetable;