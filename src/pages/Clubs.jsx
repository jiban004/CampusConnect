import { useMemo, useState } from "react";
import {
  Search,
  Users,
  ArrowUpRight,
  Check,
  UserPlus,
  Sparkles,
  Code2,
  Music2,
  Camera,
  Trophy,
  BookOpen,
  Lightbulb,
  X,
  Star,
} from "lucide-react";

const defaultClubs = [
  {
    id: 1,
    name: "Coding Club",
    category: "Technical",
    description:
      "A community for students who love programming, competitive coding, development and building real-world projects.",
    members: 248,
    tags: ["Programming", "DSA", "Development"],
    accent: "purple",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Tech & Innovation",
    category: "Technical",
    description:
      "Explore emerging technologies, AI, robotics and innovative ideas while collaborating with curious minds.",
    members: 186,
    tags: ["AI", "Robotics", "Innovation"],
    accent: "blue",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Music Club",
    category: "Cultural",
    description:
      "Sing, perform, compose and connect with fellow music lovers through campus performances and events.",
    members: 142,
    tags: ["Music", "Performance", "Events"],
    accent: "pink",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    name: "Photography Club",
    category: "Creative",
    description:
      "Capture campus life, learn photography techniques and showcase your creative perspective.",
    members: 119,
    tags: ["Photography", "Creative", "Media"],
    accent: "orange",
    image:
      "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    name: "Sports Club",
    category: "Sports",
    description:
      "Stay active, represent your college and compete with students across a variety of sports.",
    members: 305,
    tags: ["Football", "Cricket", "Fitness"],
    accent: "green",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    name: "Literary Club",
    category: "Creative",
    description:
      "A space for readers, writers, poets and speakers to exchange ideas and express themselves.",
    members: 91,
    tags: ["Writing", "Debate", "Poetry"],
    accent: "cyan",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80",
  },
];

const categories = [
  "All",
  "Technical",
  "Cultural",
  "Creative",
  "Sports",
];

const categoryIcons = {
  Technical: Code2,
  Cultural: Music2,
  Creative: Camera,
  Sports: Trophy,
};

function Clubs() {
  const [clubs] = useState(defaultClubs);

  const [joinedClubs, setJoinedClubs] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "campusconnect_joined_clubs"
      );

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const toggleClub = (clubId) => {
    setJoinedClubs((previous) => {
      const next = previous.includes(clubId)
        ? previous.filter((id) => id !== clubId)
        : [...previous, clubId];

      localStorage.setItem(
        "campusconnect_joined_clubs",
        JSON.stringify(next)
      );

      return next;
    });
  };

  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const query = search.toLowerCase();

      const matchesSearch =
        club.name.toLowerCase().includes(query) ||
        club.description.toLowerCase().includes(query) ||
        club.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );

      const matchesCategory =
        category === "All" || club.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [clubs, search, category]);

  const totalMembers = clubs.reduce(
    (sum, club) => sum + club.members,
    0
  );

  const joinedMembers = clubs
    .filter((club) => joinedClubs.includes(club.id))
    .reduce((sum, club) => sum + club.members, 0);

  return (
    <div className="clubs-page premium-page">

      {/* HERO */}

      <section className="clubs-hero">

        <div className="clubs-hero-content">

          <div className="clubs-hero-badge">
            <Sparkles size={14} />
            CAMPUS COMMUNITY
          </div>

          <h1>
            Find your people.
            <span>Build your community.</span>
          </h1>

          <p>
            Join student communities, discover shared interests,
            and make your campus experience more meaningful.
          </p>

          <div className="clubs-hero-actions">

            <button
              className="clubs-hero-button"
              onClick={() =>
                document
                  .getElementById("club-library")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Users size={17} />
              Explore clubs
            </button>

            <div className="clubs-hero-members">
              <div className="club-avatar-stack">
                <span>J</span>
                <span>A</span>
                <span>R</span>
                <span>+</span>
              </div>

              <span>
                Join <strong>{totalMembers}+</strong> students
              </span>
            </div>

          </div>

        </div>

        <div className="clubs-hero-visual">

          <div className="club-glow purple"></div>
          <div className="club-glow blue"></div>

          <div className="club-visual-card visual-main">

            <img
              src={clubs[0].image}
              alt="Coding Club"
            />

            <div className="club-visual-overlay"></div>

            <div className="club-visual-info">
              <span>POPULAR COMMUNITY</span>
              <strong>Coding Club</strong>

              <div>
                <Users size={13} />
                248 members
              </div>
            </div>

          </div>

          <div className="club-floating-card floating-club-one">
            <Code2 size={17} />
            <div>
              <strong>Technical</strong>
              <span>2 communities</span>
            </div>
          </div>

          <div className="club-floating-card floating-club-two">
            <Star size={16} />
            <div>
              <strong>4.9 / 5</strong>
              <span>Community rating</span>
            </div>
          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="clubs-stat-grid">

        <div className="club-stat-card purple">
          <div className="club-stat-icon">
            <Users size={20} />
          </div>

          <div>
            <strong>{clubs.length}</strong>
            <span>Student communities</span>
          </div>
        </div>

        <div className="club-stat-card blue">
          <div className="club-stat-icon">
            <UserPlus size={20} />
          </div>

          <div>
            <strong>{joinedClubs.length}</strong>
            <span>My clubs</span>
          </div>
        </div>

        <div className="club-stat-card green">
          <div className="club-stat-icon">
            <Users size={20} />
          </div>

          <div>
            <strong>{totalMembers}+</strong>
            <span>Total members</span>
          </div>
        </div>

        <div className="club-stat-card orange">
          <div className="club-stat-icon">
            <Lightbulb size={20} />
          </div>

          <div>
            <strong>{joinedMembers}+</strong>
            <span>Community reach</span>
          </div>
        </div>

      </section>

      {/* LIBRARY */}

      <section
        className="club-library"
        id="club-library"
      >

        <div className="club-library-heading">

          <div>
            <span className="panel-eyebrow">
              EXPLORE COMMUNITIES
            </span>

            <h2>Find a club that feels like you.</h2>

            <p>
              Discover communities based on your interests,
              creativity and passions.
            </p>
          </div>

          <div className="club-heading-decoration">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>

        {/* SEARCH */}

        <div className="clubs-toolbar">

          <div className="clubs-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search clubs, interests, activities..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button onClick={() => setSearch("")}>
                <X size={15} />
              </button>
            )}

          </div>

          <div className="clubs-category-filter">

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

        </div>

        {/* CARDS */}

        <div className="clubs-grid">

          {filteredClubs.length === 0 ? (
            <div className="clubs-empty-state">

              <div>
                <Users size={38} />
              </div>

              <h3>No clubs found</h3>

              <p>
                Try another search term or category.
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
            filteredClubs.map((club) => {

              const Icon =
                categoryIcons[club.category] ||
                Users;

              const joined = joinedClubs.includes(club.id);

              return (
                <article
                  className={`premium-club-card club-${club.accent}`}
                  key={club.id}
                >

                  {/* IMAGE */}

                  <div className="premium-club-image">

                    <img
                      src={club.image}
                      alt={club.name}
                    />

                    <div className="premium-club-overlay"></div>

                    <div className="club-category-badge">
                      <Icon size={12} />
                      {club.category}
                    </div>

                    {joined && (
                      <div className="club-joined-badge">
                        <Check size={12} />
                        Joined
                      </div>
                    )}

                    <button
                      className="club-card-arrow"
                      title="View club"
                    >
                      <ArrowUpRight size={17} />
                    </button>

                  </div>

                  {/* BODY */}

                  <div className="premium-club-body">

                    <div className="club-title-row">

                      <div>
                        <span>STUDENT COMMUNITY</span>
                        <h3>{club.name}</h3>
                      </div>

                    </div>

                    <p>{club.description}</p>

                    {/* TAGS */}

                    <div className="club-tags">

                      {club.tags.map((tag) => (
                        <span key={tag}>
                          {tag}
                        </span>
                      ))}

                    </div>

                    {/* FOOTER */}

                    <div className="premium-club-footer">

                      <div className="club-member-info">

                        <div className="small-avatar-stack">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>

                        <div>
                          <strong>
                            {club.members}+
                          </strong>

                          <small>
                            active members
                          </small>
                        </div>

                      </div>

                      <button
                        className={`club-join-btn ${
                          joined ? "joined" : ""
                        }`}
                        onClick={() =>
                          toggleClub(club.id)
                        }
                      >
                        {joined ? (
                          <>
                            <Check size={15} />
                            Joined
                          </>
                        ) : (
                          <>
                            <UserPlus size={15} />
                            Join Club
                          </>
                        )}
                      </button>

                    </div>

                  </div>

                </article>
              );
            })
          )}

        </div>

      </section>

      {/* BOTTOM CTA */}

      <section className="clubs-bottom-banner">

        <div className="clubs-bottom-icon">
          <BookOpen size={23} />
        </div>

        <div>
          <span>MAKE CAMPUS COUNT</span>

          <h2>
            Your next great connection could be one club away.
          </h2>

          <p>
            Explore communities, participate in activities and
            build experiences beyond the classroom.
          </p>
        </div>

        <div className="clubs-bottom-decoration">
          <div></div>
          <div></div>
          <div></div>
        </div>

      </section>

    </div>
  );
}

export default Clubs;