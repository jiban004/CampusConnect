import { useEffect, useMemo, useState } from "react";

import {
  Megaphone,
  Search,
  BellRing,
  CalendarDays,
  ArrowUpRight,
  CheckCheck,
  CircleAlert,
  BriefcaseBusiness,
  GraduationCap,
  Sparkles,
  Clock3,
  ChevronRight,
} from "lucide-react";

const defaultAnnouncements = [
  {
    id: 1,
    title: "Placement Drive Registration Open",
    category: "Placement",
    date: "September 26, 2026",
    time: "10:00 AM",
    description:
      "Registration is now open for upcoming campus placement drives. Eligible students can submit their applications before the deadline.",
    important: true,
    unread: true,
    author: "Training & Placement Cell",
    color: "purple",
  },
  {
    id: 2,
    title: "Semester Examination Schedule Released",
    category: "College",
    date: "September 24, 2026",
    time: "02:30 PM",
    description:
      "The university has published the upcoming semester examination schedule. Students are advised to review their examination dates.",
    important: true,
    unread: true,
    author: "Academic Administration",
    color: "blue",
  },
  {
    id: 3,
    title: "Hackathon Team Registration",
    category: "Event",
    date: "September 23, 2026",
    time: "11:00 AM",
    description:
      "Students can now register their teams for the upcoming campus hackathon. Team registrations are open until September 28.",
    important: false,
    unread: true,
    author: "Innovation Cell",
    color: "orange",
  },
  {
    id: 4,
    title: "Computer Science Department Seminar",
    category: "Department",
    date: "September 22, 2026",
    time: "09:45 AM",
    description:
      "The Computer Science Department is organizing a technical seminar on modern software development practices.",
    important: false,
    unread: false,
    author: "Department of CSE",
    color: "green",
  },
  {
    id: 5,
    title: "Campus Library Extended Hours",
    category: "College",
    date: "September 20, 2026",
    time: "04:15 PM",
    description:
      "The central library will remain open until 10 PM during the examination preparation period.",
    important: false,
    unread: false,
    author: "Central Library",
    color: "cyan",
  },
  {
    id: 6,
    title: "Industry Expert Workshop on AI",
    category: "Event",
    date: "September 19, 2026",
    time: "01:00 PM",
    description:
      "An industry expert workshop covering practical applications of artificial intelligence will be conducted this week.",
    important: false,
    unread: false,
    author: "Technology Club",
    color: "pink",
  },
  {
    id: 7,
    title: "Placement Preparation Sessions",
    category: "Placement",
    date: "September 18, 2026",
    time: "10:30 AM",
    description:
      "Weekly aptitude, coding, and interview preparation sessions are available for final-year students.",
    important: false,
    unread: false,
    author: "Training & Placement Cell",
    color: "indigo",
  },
  {
    id: 8,
    title: "Student Feedback Form Available",
    category: "College",
    date: "September 17, 2026",
    time: "03:00 PM",
    description:
      "Students can submit feedback regarding academic services and campus facilities through the student portal.",
    important: false,
    unread: false,
    author: "Student Affairs",
    color: "teal",
  },
];

const categoryOptions = [
  "All",
  "College",
  "Department",
  "Event",
  "Placement",
  "Important",
];

function Announcements() {
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem("campusconnect_announcements");

    return saved ? JSON.parse(saved) : defaultAnnouncements;
  });

  const [readAnnouncements, setReadAnnouncements] = useState(() => {
    const saved = localStorage.getItem("campusconnect_read_announcements");

    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem(
      "campusconnect_announcements",
      JSON.stringify(announcements)
    );
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(
      "campusconnect_read_announcements",
      JSON.stringify(readAnnouncements)
    );
  }, [readAnnouncements]);

  const isRead = (id) => readAnnouncements.includes(id);

  const markAsRead = (id) => {
    if (!readAnnouncements.includes(id)) {
      setReadAnnouncements((prev) => [...prev, id]);
    }
  };

  const markAllAsRead = () => {
    setReadAnnouncements(announcements.map((item) => item.id));
  };

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((announcement) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        announcement.title.toLowerCase().includes(searchText) ||
        announcement.description.toLowerCase().includes(searchText) ||
        announcement.category.toLowerCase().includes(searchText) ||
        announcement.author.toLowerCase().includes(searchText);

      const matchesCategory =
        activeCategory === "All" ||
        (activeCategory === "Important"
          ? announcement.important
          : announcement.category === activeCategory);

      return matchesSearch && matchesCategory;
    });
  }, [announcements, search, activeCategory]);

  const unreadCount = announcements.filter(
    (item) => !isRead(item.id)
  ).length;

  const importantCount = announcements.filter(
    (item) => item.important
  ).length;

  const placementCount = announcements.filter(
    (item) => item.category === "Placement"
  ).length;

  const featuredAnnouncement =
    announcements.find((item) => item.important) || announcements[0];

  const categoryIcon = (category) => {
    if (category === "Placement") return BriefcaseBusiness;
    if (category === "Department") return GraduationCap;
    if (category === "Event") return Sparkles;
    return Megaphone;
  };

  return (
    <div className="announcements-page">
      {/* HERO */}
      <section className="announcements-hero">
        <div className="announcement-hero-content">
          <div className="announcement-hero-badge">
            <BellRing size={14} />
            <span>Campus Communication Center</span>
          </div>

          <h1>
            Stay in the
            <span> loop.</span>
          </h1>

          <p>
            Important campus updates, academic notices, placement alerts,
            events and everything happening around your college.
          </p>

          <div className="announcement-hero-actions">
            <div className="announcement-live">
              <span className="live-dot"></span>
              <span>Live campus updates</span>
            </div>

            {unreadCount > 0 && (
              <button
                className="mark-all-button"
                onClick={markAllAsRead}
              >
                <CheckCheck size={16} />
                Mark all as read
              </button>
            )}
          </div>
        </div>

        <div className="announcement-hero-visual">
          <div className="announcement-orb orb-one"></div>
          <div className="announcement-orb orb-two"></div>

          <div className="announcement-floating-card main-notice">
            <div className="floating-notice-icon">
              <Megaphone size={24} />
            </div>

            <div>
              <span>Latest update</span>
              <strong>{featuredAnnouncement.title}</strong>
            </div>

            <ArrowUpRight size={19} />
          </div>

          <div className="announcement-floating-card mini-notice">
            <div className="mini-bell">
              <BellRing size={17} />
            </div>
            <div>
              <strong>{unreadCount}</strong>
              <span>Unread notices</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="announcement-stats">
        <div className="announcement-stat stat-purple">
          <div className="announcement-stat-icon">
            <Megaphone size={20} />
          </div>
          <div>
            <span>Total Notices</span>
            <strong>{announcements.length}</strong>
            <small>Campus updates</small>
          </div>
        </div>

        <div className="announcement-stat stat-orange">
          <div className="announcement-stat-icon">
            <BellRing size={20} />
          </div>
          <div>
            <span>Unread</span>
            <strong>{unreadCount}</strong>
            <small>Need your attention</small>
          </div>
        </div>

        <div className="announcement-stat stat-red">
          <div className="announcement-stat-icon">
            <CircleAlert size={20} />
          </div>
          <div>
            <span>Important</span>
            <strong>{importantCount}</strong>
            <small>Priority updates</small>
          </div>
        </div>

        <div className="announcement-stat stat-blue">
          <div className="announcement-stat-icon">
            <BriefcaseBusiness size={20} />
          </div>
          <div>
            <span>Placement</span>
            <strong>{placementCount}</strong>
            <small>Career updates</small>
          </div>
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="announcements-toolbar">
        <div className="announcement-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search announcements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button onClick={() => setSearch("")}>
              ×
            </button>
          )}
        </div>

        <div className="announcement-filter-scroll">
          {categoryOptions.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "announcement-filter active"
                  : "announcement-filter"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <section className="announcement-content-section">
        <div className="announcement-section-heading">
          <div>
            <p className="page-eyebrow">LATEST UPDATES</p>
            <h2>Campus Announcements</h2>
            <p>
              Important information from your college community.
            </p>
          </div>

          <span className="announcement-result-count">
            {filteredAnnouncements.length}{" "}
            {filteredAnnouncements.length === 1 ? "notice" : "notices"}
          </span>
        </div>

        {filteredAnnouncements.length === 0 ? (
          <div className="announcement-empty">
            <div className="empty-announcement-icon">
              <Search size={28} />
            </div>
            <h3>No announcements found</h3>
            <p>
              Try changing your search or selecting another category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="announcement-feed">
            {filteredAnnouncements.map((announcement, index) => {
              const Icon = categoryIcon(announcement.category);
              const read = isRead(announcement.id);

              return (
                <article
                  key={announcement.id}
                  className={`premium-announcement-card ${
                    read ? "is-read" : "is-unread"
                  }`}
                  style={{
                    animationDelay: `${index * 0.06}s`,
                  }}
                  onClick={() => markAsRead(announcement.id)}
                >
                  <div
                    className={`announcement-color-bar color-${announcement.color}`}
                  ></div>

                  <div className="announcement-card-icon">
                    <Icon size={21} />
                  </div>

                  <div className="premium-announcement-main">
                    <div className="premium-announcement-meta">
                      <span className="announcement-category-pill">
                        {announcement.category}
                      </span>

                      {announcement.important && (
                        <span className="important-pill">
                          <CircleAlert size={12} />
                          Important
                        </span>
                      )}

                      {!read && (
                        <span className="new-pill">
                          <span></span>
                          New
                        </span>
                      )}
                    </div>

                    <h3>{announcement.title}</h3>

                    <p>{announcement.description}</p>

                    <div className="premium-announcement-footer">
                      <div className="announcement-author">
                        <div className="author-avatar">
                          {announcement.author.charAt(0)}
                        </div>
                        <span>{announcement.author}</span>
                      </div>

                      <div className="announcement-date">
                        <CalendarDays size={14} />
                        <span>{announcement.date}</span>
                        <span className="announcement-divider">•</span>
                        <Clock3 size={14} />
                        <span>{announcement.time}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="announcement-open-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(announcement.id);
                    }}
                    aria-label={`Read ${announcement.title}`}
                  >
                    <ChevronRight size={19} />
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Announcements;