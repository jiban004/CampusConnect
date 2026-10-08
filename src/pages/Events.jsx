import { useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  MapPin,
  Clock3,
  Users,
  ArrowUpRight,
  Check,
  Ticket,
  Sparkles,
  Trophy,
  Code2,
  Music2,
  Dumbbell,
  Presentation,
  X,
  ChevronDown,
} from "lucide-react";

const defaultEvents = [
  {
    id: 1,
    title: "Campus Tech Hackathon",
    category: "Hackathon",
    date: "2026-10-08",
    time: "10:00 AM",
    location: "Innovation Lab",
    description:
      "Build innovative solutions, collaborate with talented students, and turn your ideas into working prototypes.",
    participants: 126,
    accent: "purple",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Annual Cultural Festival",
    category: "Cultural",
    date: "2026-10-12",
    time: "05:00 PM",
    location: "Main Auditorium",
    description:
      "Experience music, dance, theatre and creative performances from students across campus.",
    participants: 340,
    accent: "orange",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "AI & Future Technology",
    category: "Workshop",
    date: "2026-10-15",
    time: "02:00 PM",
    location: "Seminar Hall",
    description:
      "Explore artificial intelligence, emerging technologies and the future of software development.",
    participants: 184,
    accent: "blue",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Inter-College Football Cup",
    category: "Sports",
    date: "2026-10-18",
    time: "08:30 AM",
    location: "University Ground",
    description:
      "Cheer for your college teams as they compete for the annual inter-college championship.",
    participants: 220,
    accent: "green",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Web Development Bootcamp",
    category: "Technical",
    date: "2026-10-20",
    time: "11:00 AM",
    location: "Computer Lab 2",
    description:
      "A hands-on session covering modern frontend development, React and professional UI practices.",
    participants: 96,
    accent: "cyan",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Photography Walk",
    category: "Other",
    date: "2026-10-22",
    time: "04:00 PM",
    location: "Campus Gate",
    description:
      "Explore the campus through a creative lens and capture architecture, people and everyday moments.",
    participants: 58,
    accent: "pink",
    image:
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1200&q=80",
  },
];

const categories = [
  "All",
  "Technical",
  "Cultural",
  "Workshop",
  "Hackathon",
  "Sports",
  "Other",
];

const categoryIcons = {
  Technical: Code2,
  Cultural: Music2,
  Workshop: Presentation,
  Hackathon: Trophy,
  Sports: Dumbbell,
  Other: Sparkles,
};

function Events() {
  const [events] = useState(defaultEvents);

  const [registeredEvents, setRegisteredEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "campusconnect_registered_events"
      );

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const toggleRegistration = (eventId) => {
    setRegisteredEvents((previous) => {
      const next = previous.includes(eventId)
        ? previous.filter((id) => id !== eventId)
        : [...previous, eventId];

      localStorage.setItem(
        "campusconnect_registered_events",
        JSON.stringify(next)
      );

      return next;
    });
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || event.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [events, search, category]);

  const registeredCount = registeredEvents.length;

  const totalParticipants = events.reduce(
    (sum, event) => sum + event.participants,
    0
  );

  const formatDate = (date) => {
    const value = new Date(`${date}T00:00:00`);

    return {
      day: value.toLocaleDateString("en-US", {
        day: "2-digit",
      }),
      month: value.toLocaleDateString("en-US", {
        month: "short",
      }),
      weekday: value.toLocaleDateString("en-US", {
        weekday: "short",
      }),
    };
  };

  const featuredEvent = events[0];

  return (
    <div className="events-page premium-page">

      {/* HERO */}

      <section className="events-hero">
        <div className="events-hero-image">
          <img
            src={featuredEvent.image}
            alt={featuredEvent.title}
          />
        </div>

        <div className="events-hero-overlay"></div>

        <div className="events-hero-content">
          <div className="events-hero-badge">
            <Sparkles size={14} />
            <span>CAMPUS EXPERIENCES</span>
          </div>

          <span className="featured-label">FEATURED EVENT</span>

          <h1>{featuredEvent.title}</h1>

          <p>{featuredEvent.description}</p>

          <div className="featured-event-meta">
            <span>
              <CalendarDays size={15} />
              Oct 08, 2026
            </span>

            <span>
              <Clock3 size={15} />
              {featuredEvent.time}
            </span>

            <span>
              <MapPin size={15} />
              {featuredEvent.location}
            </span>
          </div>

          <button
            className="event-hero-button"
            onClick={() => toggleRegistration(featuredEvent.id)}
          >
            {registeredEvents.includes(featuredEvent.id) ? (
              <>
                <Check size={17} />
                Registered
              </>
            ) : (
              <>
                <Ticket size={17} />
                Register Now
              </>
            )}
          </button>
        </div>

        <div className="events-hero-floating">
          <div className="floating-event-icon">
            <Trophy size={18} />
          </div>

          <div>
            <strong>126+</strong>
            <span>participants</span>
          </div>
        </div>
      </section>

      {/* PAGE INTRO */}

      <section className="events-heading">
        <div>
          <span className="panel-eyebrow">DISCOVER</span>
          <h2>What's happening on campus?</h2>
          <p>
            Find workshops, hackathons, cultural programs and activities
            happening around you.
          </p>
        </div>

        <div className="events-heading-decoration">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>

      {/* STATS */}

      <section className="events-stat-grid">

        <div className="event-stat-card purple">
          <div className="event-stat-icon">
            <CalendarDays size={20} />
          </div>

          <div>
            <strong>{events.length}</strong>
            <span>Upcoming events</span>
          </div>
        </div>

        <div className="event-stat-card blue">
          <div className="event-stat-icon">
            <Users size={20} />
          </div>

          <div>
            <strong>{totalParticipants}+</strong>
            <span>Expected participants</span>
          </div>
        </div>

        <div className="event-stat-card green">
          <div className="event-stat-icon">
            <Ticket size={20} />
          </div>

          <div>
            <strong>{registeredCount}</strong>
            <span>My registrations</span>
          </div>
        </div>

        <div className="event-stat-card orange">
          <div className="event-stat-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <strong>{categories.length - 1}</strong>
            <span>Event categories</span>
          </div>
        </div>

      </section>

      {/* FILTERS */}

      <section className="events-toolbar">

        <div className="events-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search events, workshops, hackathons..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button onClick={() => setSearch("")}>
              <X size={15} />
            </button>
          )}
        </div>

        <div className="events-category-filter">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

      </section>

      {/* EVENT GRID */}

      <section className="events-grid">

        {filteredEvents.length === 0 ? (
          <div className="events-empty-state">
            <div>
              <CalendarDays size={38} />
            </div>

            <h3>No events found</h3>

            <p>
              Try a different search term or select another category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const Icon =
              categoryIcons[event.category] || Sparkles;

            const date = formatDate(event.date);

            const registered = registeredEvents.includes(event.id);

            return (
              <article
                className={`premium-event-card event-card-${event.accent}`}
                key={event.id}
              >

                <div className="premium-event-image">

                  <img
                    src={event.image}
                    alt={event.title}
                  />

                  <div className="premium-event-image-overlay"></div>

                  <div className="premium-event-category">
                    <Icon size={13} />
                    {event.category}
                  </div>

                  <div className="premium-event-date">
                    <span>{date.month}</span>
                    <strong>{date.day}</strong>
                    <small>{date.weekday}</small>
                  </div>

                </div>

                <div className="premium-event-body">

                  <div className="premium-event-title-row">

                    <div>
                      <span className="event-small-label">
                        CAMPUS EVENT
                      </span>

                      <h3>{event.title}</h3>
                    </div>

                    <button
                      className="event-arrow"
                      title="View event"
                    >
                      <ArrowUpRight size={17} />
                    </button>

                  </div>

                  <p>{event.description}</p>

                  <div className="premium-event-details">

                    <span>
                      <Clock3 size={14} />
                      {event.time}
                    </span>

                    <span>
                      <MapPin size={14} />
                      {event.location}
                    </span>

                  </div>

                  <div className="premium-event-footer">

                    <div className="event-participants">

                      <div className="participant-stack">
                        <span>A</span>
                        <span>R</span>
                        <span>P</span>
                      </div>

                      <small>
                        {event.participants}+ students
                      </small>

                    </div>

                    <button
                      className={`event-register-btn ${
                        registered ? "registered" : ""
                      }`}
                      onClick={() =>
                        toggleRegistration(event.id)
                      }
                    >
                      {registered ? (
                        <>
                          <Check size={15} />
                          Registered
                        </>
                      ) : (
                        <>
                          Register
                          <ArrowUpRight size={15} />
                        </>
                      )}
                    </button>

                  </div>

                </div>

              </article>
            );
          })
        )}

      </section>

    </div>
  );
}

export default Events;