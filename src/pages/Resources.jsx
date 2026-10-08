import { useMemo, useState } from "react";

import {
  Search,
  BookOpen,
  FileText,
  Code2,
  Link2,
  Bookmark,
  BookmarkCheck,
  Download,
  ArrowUpRight,
  Sparkles,
  Layers3,
  GraduationCap,
  ExternalLink,
  Clock3,
} from "lucide-react";

const defaultResources = [
  {
    id: 1,
    title: "Data Structures Complete Notes",
    subject: "Data Structures",
    type: "Notes",
    date: "Sep 24, 2026",
    size: "4.2 MB",
    description:
      "Complete unit-wise notes covering arrays, linked lists, trees, graphs and algorithms.",
    color: "purple",
    featured: true,
  },
  {
    id: 2,
    title: "DBMS Important Questions",
    subject: "Database Management",
    type: "PDF",
    date: "Sep 22, 2026",
    size: "2.8 MB",
    description:
      "Important examination questions covering SQL, normalization, transactions and indexing.",
    color: "blue",
  },
  {
    id: 3,
    title: "Semester 6 Question Paper",
    subject: "Computer Science",
    type: "Previous Year Papers",
    date: "Sep 20, 2026",
    size: "1.6 MB",
    description:
      "Previous semester examination paper for revision and practice.",
    color: "orange",
  },
  {
    id: 4,
    title: "Java OOP Interview Guide",
    subject: "Java",
    type: "Programming",
    date: "Sep 18, 2026",
    size: "3.1 MB",
    description:
      "Core Java and OOP concepts frequently discussed in technical interviews.",
    color: "green",
  },
  {
    id: 5,
    title: "Spring Boot REST API Notes",
    subject: "Java Full Stack",
    type: "Notes",
    date: "Sep 17, 2026",
    size: "5.4 MB",
    description:
      "Practical notes covering Spring MVC, REST controllers, services and repositories.",
    color: "cyan",
  },
  {
    id: 6,
    title: "Computer Networks Revision",
    subject: "Computer Networks",
    type: "PDF",
    date: "Sep 15, 2026",
    size: "2.2 MB",
    description:
      "Quick revision material for OSI model, TCP/IP, routing and network protocols.",
    color: "pink",
  },
  {
    id: 7,
    title: "Web Development Resources",
    subject: "Web Technologies",
    type: "Useful Links",
    date: "Sep 13, 2026",
    size: "Online",
    description:
      "A curated collection of useful websites and learning resources for web development.",
    color: "indigo",
  },
  {
    id: 8,
    title: "Software Engineering Notes",
    subject: "Software Engineering",
    type: "Notes",
    date: "Sep 11, 2026",
    size: "3.7 MB",
    description:
      "Software development life cycle, agile methodologies, testing and project management.",
    color: "teal",
  },
  {
    id: 9,
    title: "Operating Systems Question Bank",
    subject: "Operating Systems",
    type: "Previous Year Papers",
    date: "Sep 09, 2026",
    size: "1.9 MB",
    description:
      "Practice questions covering processes, memory management, scheduling and file systems.",
    color: "red",
  },
  {
    id: 10,
    title: "Git & GitHub Cheat Sheet",
    subject: "Programming",
    type: "Programming",
    date: "Sep 07, 2026",
    size: "1.1 MB",
    description:
      "Essential Git commands and GitHub workflow reference for daily development.",
    color: "purple",
  },
  {
    id: 11,
    title: "Placement Preparation Roadmap",
    subject: "Placement",
    type: "Useful Links",
    date: "Sep 05, 2026",
    size: "Online",
    description:
      "A practical roadmap for aptitude, coding, technical interviews and HR preparation.",
    color: "orange",
  },
  {
    id: 12,
    title: "Computer Networks Question Paper",
    subject: "Computer Networks",
    type: "Previous Year Papers",
    date: "Sep 03, 2026",
    size: "1.4 MB",
    description:
      "Previous examination paper to practice important networking concepts.",
    color: "blue",
  },
];

const categories = [
  "All",
  "Notes",
  "PDF",
  "Previous Year Papers",
  "Programming",
  "Useful Links",
];

function Resources() {
  const [resources] = useState(defaultResources);

  const [bookmarked, setBookmarked] = useState(() => {
    const saved = localStorage.getItem(
      "campusconnect_bookmarked_resources"
    );

    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const subjects = [
    "All",
    ...new Set(resources.map((resource) => resource.subject)),
  ];

  const toggleBookmark = (id) => {
    setBookmarked((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      localStorage.setItem(
        "campusconnect_bookmarked_resources",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const filteredResources = useMemo(() => {
    const query = search.toLowerCase().trim();

    return resources.filter((resource) => {
      const matchesSearch =
        !query ||
        resource.title.toLowerCase().includes(query) ||
        resource.subject.toLowerCase().includes(query) ||
        resource.type.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query);

      const matchesCategory =
        activeCategory === "All" ||
        resource.type === activeCategory;

      const matchesSubject =
        subjectFilter === "All" ||
        resource.subject === subjectFilter;

      return matchesSearch && matchesCategory && matchesSubject;
    });
  }, [resources, search, activeCategory, subjectFilter]);

  const notesCount = resources.filter(
    (resource) =>
      resource.type === "Notes" || resource.type === "PDF"
  ).length;

  const programmingCount = resources.filter(
    (resource) => resource.type === "Programming"
  ).length;

  const subjectCount = new Set(
    resources.map((resource) => resource.subject)
  ).size;

  const featuredResource =
    resources.find((resource) => resource.featured) || resources[0];

  const getIcon = (type) => {
    if (type === "Programming") return Code2;
    if (type === "Useful Links") return Link2;
    if (type === "Previous Year Papers") return GraduationCap;
    if (type === "PDF") return FileText;

    return BookOpen;
  };

  return (
    <div className="resources-page">
      {/* HERO */}
      <section className="resources-hero">
        <div className="resources-hero-content">
          <div className="resources-badge">
            <Sparkles size={14} />
            <span>Campus Digital Library</span>
          </div>

          <h1>
            Everything you need
            <span> to learn.</span>
          </h1>

          <p>
            Find lecture notes, previous papers, programming material,
            useful links and study resources—all in one place.
          </p>

          <div className="resources-hero-search">
            <Search size={19} />
            <input
              type="text"
              placeholder="Search notes, subjects, resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button onClick={() => setSearch("")}>×</button>
            )}
          </div>
        </div>

        <div className="resources-hero-visual">
          <div className="resource-orb resource-orb-one"></div>
          <div className="resource-orb resource-orb-two"></div>

          <div className="floating-book">
            <div className="book-icon">
              <BookOpen size={25} />
            </div>

            <div>
              <span>FEATURED RESOURCE</span>
              <strong>{featuredResource.title}</strong>
              <small>{featuredResource.subject}</small>
            </div>
          </div>

          <div className="floating-resource-stat">
            <Layers3 size={17} />
            <div>
              <strong>{resources.length}</strong>
              <span>resources available</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="resource-stats">
        <div className="resource-stat purple">
          <div className="resource-stat-icon">
            <Layers3 size={20} />
          </div>
          <div>
            <span>Total Resources</span>
            <strong>{resources.length}</strong>
            <small>Available to explore</small>
          </div>
        </div>

        <div className="resource-stat blue">
          <div className="resource-stat-icon">
            <BookOpen size={20} />
          </div>
          <div>
            <span>Study Materials</span>
            <strong>{notesCount}</strong>
            <small>Notes & PDFs</small>
          </div>
        </div>

        <div className="resource-stat green">
          <div className="resource-stat-icon">
            <Code2 size={20} />
          </div>
          <div>
            <span>Programming</span>
            <strong>{programmingCount}</strong>
            <small>Coding resources</small>
          </div>
        </div>

        <div className="resource-stat orange">
          <div className="resource-stat-icon">
            <GraduationCap size={20} />
          </div>
          <div>
            <span>Subjects</span>
            <strong>{subjectCount}</strong>
            <small>Academic areas</small>
          </div>
        </div>
      </section>

      {/* CATEGORY TILES */}
      <section className="resource-category-section">
        <div className="resource-section-heading">
          <div>
            <p className="page-eyebrow">EXPLORE</p>
            <h2>Browse by category</h2>
          </div>
        </div>

        <div className="resource-category-grid">
          <button
            className={
              activeCategory === "Notes"
                ? "resource-category active purple"
                : "resource-category purple"
            }
            onClick={() => setActiveCategory("Notes")}
          >
            <div>
              <BookOpen size={21} />
            </div>
            <span>Notes</span>
            <small>Lecture material</small>
          </button>

          <button
            className={
              activeCategory === "PDF"
                ? "resource-category active blue"
                : "resource-category blue"
            }
            onClick={() => setActiveCategory("PDF")}
          >
            <div>
              <FileText size={21} />
            </div>
            <span>PDFs</span>
            <small>Study documents</small>
          </button>

          <button
            className={
              activeCategory === "Previous Year Papers"
                ? "resource-category active orange"
                : "resource-category orange"
            }
            onClick={() =>
              setActiveCategory("Previous Year Papers")
            }
          >
            <div>
              <GraduationCap size={21} />
            </div>
            <span>Previous Papers</span>
            <small>Exam practice</small>
          </button>

          <button
            className={
              activeCategory === "Programming"
                ? "resource-category active green"
                : "resource-category green"
            }
            onClick={() => setActiveCategory("Programming")}
          >
            <div>
              <Code2 size={21} />
            </div>
            <span>Programming</span>
            <small>Developer resources</small>
          </button>

          <button
            className={
              activeCategory === "Useful Links"
                ? "resource-category active pink"
                : "resource-category pink"
            }
            onClick={() => setActiveCategory("Useful Links")}
          >
            <div>
              <Link2 size={21} />
            </div>
            <span>Useful Links</span>
            <small>External resources</small>
          </button>

          <button
            className="resource-category clear-category"
            onClick={() => {
              setActiveCategory("All");
              setSubjectFilter("All");
            }}
          >
            <div>
              <Layers3 size={21} />
            </div>
            <span>All Resources</span>
            <small>View everything</small>
          </button>
        </div>
      </section>

      {/* RESOURCE LIBRARY */}
      <section className="resource-library">
        <div className="resource-library-header">
          <div>
            <p className="page-eyebrow">RESOURCE LIBRARY</p>
            <h2>Study smarter</h2>
            <p>
              Explore resources curated for your academic journey.
            </p>
          </div>

          <div className="resource-subject-filter">
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              {subjects.map((subject) => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="resource-filter-row">
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "resource-filter active"
                  : "resource-filter"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}

          <span className="resource-count">
            {filteredResources.length} resources
          </span>
        </div>

        {filteredResources.length === 0 ? (
          <div className="resource-empty">
            <div>
              <Search size={28} />
            </div>
            <h3>No resources found</h3>
            <p>
              Try another search term or clear your filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
                setSubjectFilter("All");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="resource-grid">
            {filteredResources.map((resource, index) => {
              const Icon = getIcon(resource.type);
              const isBookmarked = bookmarked.includes(resource.id);

              return (
                <article
                  key={resource.id}
                  className={`resource-card resource-${resource.color}`}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  <div className="resource-card-top">
                    <div className="resource-type-icon">
                      <Icon size={21} />
                    </div>

                    <div className="resource-card-actions">
                      <button
                        className={
                          isBookmarked
                            ? "bookmark-button bookmarked"
                            : "bookmark-button"
                        }
                        onClick={() =>
                          toggleBookmark(resource.id)
                        }
                        aria-label="Bookmark resource"
                      >
                        {isBookmarked ? (
                          <BookmarkCheck size={17} />
                        ) : (
                          <Bookmark size={17} />
                        )}
                      </button>

                      <button className="resource-open-button">
                        <ArrowUpRight size={17} />
                      </button>
                    </div>
                  </div>

                  <div className="resource-card-body">
                    <div className="resource-card-meta">
                      <span>{resource.type}</span>
                      <span>•</span>
                      <span>{resource.subject}</span>
                    </div>

                    <h3>{resource.title}</h3>

                    <p>{resource.description}</p>
                  </div>

                  <div className="resource-card-footer">
                    <div>
                      <Clock3 size={13} />
                      <span>{resource.date}</span>
                    </div>

                    <strong>{resource.size}</strong>
                  </div>

                  <button className="resource-access">
                    {resource.type === "Useful Links"
                      ? "Open resource"
                      : "View resource"}
                    {resource.type === "Useful Links" ? (
                      <ExternalLink size={14} />
                    ) : (
                      <Download size={14} />
                    )}
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

export default Resources;