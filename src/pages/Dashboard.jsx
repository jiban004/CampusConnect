import {
  CalendarCheck,
  ClipboardList,
  CalendarDays,
  Target,
  ArrowRight,
} from "lucide-react";

import StatCard from "../components/StatCard";
import ProgressCard from "../components/ProgressCard";
import ClassCard from "../components/ClassCard";
import AssignmentCard from "../components/AssignmentCard";
import EventCard from "../components/EventCard";
import AnnouncementCard from "../components/AnnouncementCard";

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* Welcome */}

      <section className="dashboard-welcome">
        <div>
          <p className="dashboard-eyebrow">
            STUDENT DASHBOARD
          </p>

          <h1>
            Good morning, Alex <span>👋</span>
          </h1>

          <p className="dashboard-description">
            Here's what's happening with your campus life today.
          </p>
        </div>

        <div className="dashboard-date">
          <span>Today</span>
          <strong>September 26, 2026</strong>
        </div>
      </section>


      {/* Statistics */}

      <section className="stats-grid">

        <StatCard
          title="Attendance"
          value="87%"
          trend="+4.2%"
          trendLabel="vs last semester"
          icon={CalendarCheck}
        />

        <StatCard
          title="Pending Assignments"
          value="4"
          trend="2 urgent"
          trendLabel="due this week"
          icon={ClipboardList}
        />

        <StatCard
          title="Upcoming Events"
          value="3"
          trend="2 registered"
          trendLabel="this week"
          icon={CalendarDays}
        />

        <StatCard
          title="Campus Progress"
          value="82/100"
          trend="+8 pts"
          trendLabel="this month"
          icon={Target}
        />

      </section>


      {/* Progress + Classes */}

      <section className="dashboard-main-grid">

        <ProgressCard />

        <div className="classes-card">

          <div className="classes-header">

            <div>
              <p className="card-eyebrow">
                TODAY
              </p>

              <h2>
                Today's Classes
              </h2>

              <p>
                Your schedule for today.
              </p>
            </div>

            <button className="classes-view-all">
              View All
              <ArrowRight size={13} />
            </button>

          </div>

          <div className="classes-list">

            <ClassCard
              subject="Data Structures"
              time="09:00 AM – 10:00 AM"
              room="Room 204"
              faculty="Dr. Priya Sharma"
              type="Completed"
              accent="purple"
            />

            <ClassCard
              subject="Database Management"
              time="11:00 AM – 12:00 PM"
              room="Lab 3"
              faculty="Prof. Rahul Mehta"
              type="Upcoming"
              accent="blue"
            />

            <ClassCard
              subject="Java Full Stack"
              time="02:00 PM – 04:00 PM"
              room="Lab 5"
              faculty="Prof. Arjun Rao"
              type="Upcoming"
              accent="green"
            />

          </div>

        </div>

      </section>


      {/* Upcoming Assignments */}

      <section className="assignments-card">

        <div className="assignments-header">

          <div>
            <p className="card-eyebrow">
              DEADLINES
            </p>

            <h2>
              Upcoming Assignments
            </h2>

            <p>
              Keep track of your upcoming academic work.
            </p>
          </div>

          <button className="assignments-view-all">
            View All
            <ArrowRight size={13} />
          </button>

        </div>

        <div className="assignments-list">

          <AssignmentCard
            title="Binary Search Tree Implementation"
            subject="Data Structures & Algorithms"
            dueDate="Sep 27"
            priority="High"
            status="Pending"
          />

          <AssignmentCard
            title="Database Normalization Report"
            subject="Database Management Systems"
            dueDate="Sep 29"
            priority="Medium"
            status="In Progress"
          />

          <AssignmentCard
            title="Spring Boot REST API"
            subject="Java Full Stack Development"
            dueDate="Oct 01"
            priority="Low"
            status="Pending"
          />

        </div>

      </section>


      {/* Upcoming Events */}

      <section className="events-card">

        <div className="events-header">

          <div>
            <p className="card-eyebrow">
              CAMPUS LIFE
            </p>

            <h2>
              Upcoming Events
            </h2>

            <p>
              Discover what's happening around campus.
            </p>
          </div>

          <button className="events-view-all">
            View All
            <ArrowRight size={13} />
          </button>

        </div>

        <div className="events-list">

          <EventCard
            title="Campus Tech Hackathon"
            category="Hackathon"
            date="SEP 28"
            time="10:00 AM"
            location="Innovation Lab"
            description="Build innovative solutions with fellow students."
            accent="purple"
          />

          <EventCard
            title="Annual Cultural Festival"
            category="Cultural"
            date="OCT 02"
            time="05:00 PM"
            location="Main Auditorium"
            description="Music, dance, theatre and cultural performances."
            accent="orange"
          />

          <EventCard
            title="AI & Future Technology"
            category="Workshop"
            date="OCT 05"
            time="02:00 PM"
            location="Seminar Hall"
            description="Explore emerging technologies and modern AI."
            accent="blue"
          />

        </div>

      </section>


      {/* Announcements */}

      <section className="announcements-card">

        <div className="announcements-header">

          <div>
            <p className="card-eyebrow">
              CAMPUS UPDATES
            </p>

            <h2>
              Recent Announcements
            </h2>

            <p>
              Stay updated with important campus information.
            </p>
          </div>

          <button className="announcements-view-all">
            View All
            <ArrowRight size={13} />
          </button>

        </div>

        <div className="announcements-list">

          <AnnouncementCard
            title="Placement Drive Registration Open"
            category="Placement"
            date="September 26, 2026"
            description="Registration is now open for upcoming campus placement drives."
            important={true}
          />

          <AnnouncementCard
            title="Semester Examination Schedule Released"
            category="College"
            date="September 24, 2026"
            description="The university has published the upcoming semester examination schedule."
          />

          <AnnouncementCard
            title="Hackathon Team Registration"
            category="Event"
            date="September 23, 2026"
            description="Students can now register their teams for the upcoming campus hackathon."
          />

        </div>

      </section>

    </div>
  );
}

export default Dashboard;