import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  ClipboardList,
  ArrowUpRight,
  CalendarDays,
  BookOpen,
  MoreHorizontal,
  Pencil,
  Trash2,
  Check,
  X,
  Sparkles,
  Target,
  TrendingUp,
  ChevronDown,
} from "lucide-react";

const defaultAssignments = [
  {
    id: 1,
    title: "Binary Search Tree Implementation",
    subject: "Data Structures & Algorithms",
    description:
      "Implement insertion, deletion, searching and traversal operations for a binary search tree.",
    dueDate: "2026-10-04",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    title: "Database Normalization Report",
    subject: "Database Management Systems",
    description:
      "Prepare a detailed report explaining 1NF, 2NF, 3NF and BCNF with practical examples.",
    dueDate: "2026-10-07",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Spring Boot REST API",
    subject: "Java Full Stack Development",
    description:
      "Build REST endpoints for student management using Spring Boot and Spring Data JPA.",
    dueDate: "2026-10-10",
    priority: "High",
    status: "Pending",
  },
  {
    id: 4,
    title: "Computer Networks Presentation",
    subject: "Computer Networks",
    description:
      "Create a presentation covering TCP/IP architecture and common networking protocols.",
    dueDate: "2026-10-12",
    priority: "Low",
    status: "Completed",
  },
  {
    id: 5,
    title: "Software Engineering Case Study",
    subject: "Software Engineering",
    description:
      "Analyze the software development lifecycle used in a real-world software product.",
    dueDate: "2026-10-15",
    priority: "Medium",
    status: "Pending",
  },
];

const emptyForm = {
  title: "",
  subject: "",
  description: "",
  dueDate: "",
  priority: "Medium",
  status: "Pending",
};

const priorityWeight = {
  High: 3,
  Medium: 2,
  Low: 1,
};

function Assignments() {
  const [assignments, setAssignments] = useState(() => {
    try {
      const saved = localStorage.getItem("campusconnect_assignments");
      return saved ? JSON.parse(saved) : defaultAssignments;
    } catch {
      return defaultAssignments;
    }
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem(
      "campusconnect_assignments",
      JSON.stringify(assignments)
    );
  }, [assignments]);

  const stats = useMemo(() => {
    const total = assignments.length;

    const completed = assignments.filter(
      (item) => item.status === "Completed"
    ).length;

    const pending = assignments.filter(
      (item) => item.status === "Pending"
    ).length;

    const inProgress = assignments.filter(
      (item) => item.status === "In Progress"
    ).length;

    const urgent = assignments.filter(
      (item) => item.priority === "High" && item.status !== "Completed"
    ).length;

    const percentage =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      pending,
      inProgress,
      urgent,
      percentage,
    };
  }, [assignments]);

  const filteredAssignments = useMemo(() => {
    let result = [...assignments];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.subject.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((item) => item.status === statusFilter);
    }

    if (priorityFilter !== "All") {
      result = result.filter((item) => item.priority === priorityFilter);
    }

    result.sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }

      if (sortBy === "priority") {
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }

      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      return 0;
    });

    return result;
  }, [assignments, search, statusFilter, priorityFilter, sortBy]);

  const openAddModal = () => {
    setEditingAssignment(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (assignment) => {
    setEditingAssignment(assignment);
    setForm({
      title: assignment.title,
      subject: assignment.subject,
      description: assignment.description,
      dueDate: assignment.dueDate,
      priority: assignment.priority,
      status: assignment.status,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAssignment(null);
    setForm(emptyForm);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.subject.trim() || !form.dueDate) {
      return;
    }

    if (editingAssignment) {
      setAssignments((previous) =>
        previous.map((item) =>
          item.id === editingAssignment.id
            ? {
                ...item,
                ...form,
                title: form.title.trim(),
                subject: form.subject.trim(),
              }
            : item
        )
      );
    } else {
      const newAssignment = {
        id: Date.now(),
        ...form,
        title: form.title.trim(),
        subject: form.subject.trim(),
      };

      setAssignments((previous) => [newAssignment, ...previous]);
    }

    closeModal();
  };

  const deleteAssignment = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (!confirmed) return;

    setAssignments((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const markCompleted = (id) => {
    setAssignments((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Completed" ? "Pending" : "Completed",
            }
          : item
      )
    );
  };

  const formatDate = (date) => {
    if (!date) return "No deadline";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysLeft = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(`${date}T00:00:00`);
    const difference = Math.ceil(
      (due - today) / (1000 * 60 * 60 * 24)
    );

    if (difference < 0) return "Overdue";
    if (difference === 0) return "Due today";
    if (difference === 1) return "1 day left";

    return `${difference} days left`;
  };

  return (
    <div className="assignments-page premium-page">
      {/* HERO */}
      <section className="assignment-hero">
        <div className="assignment-hero-content">
          <div className="assignment-hero-badge">
            <Sparkles size={14} />
            <span>ACADEMIC WORKSPACE</span>
          </div>

          <h1>
            Stay ahead of your
            <span> assignments.</span>
          </h1>

          <p>
            Organize deadlines, track progress, and keep your academic
            workload under control.
          </p>

          <div className="assignment-hero-actions">
            <button
              className="premium-primary-btn"
              onClick={openAddModal}
            >
              <Plus size={18} />
              Add Assignment
            </button>

            <div className="assignment-hero-mini">
              <CheckCircle2 size={16} />
              <span>{stats.completed} completed</span>
            </div>
          </div>
        </div>

        <div className="assignment-hero-visual">
          <div className="hero-orb hero-orb-one"></div>
          <div className="hero-orb hero-orb-two"></div>

          <div className="floating-task-card task-card-one">
            <div className="floating-task-icon purple">
              <BookOpen size={17} />
            </div>
            <div>
              <strong>DSA Assignment</strong>
              <span>Due tomorrow</span>
            </div>
            <CheckCircle2 size={18} />
          </div>

          <div className="floating-task-card task-card-two">
            <div className="floating-task-icon orange">
              <Clock3 size={17} />
            </div>
            <div>
              <strong>Database Report</strong>
              <span>In progress</span>
            </div>
          </div>

          <div className="assignment-hero-illustration">
            <ClipboardList size={76} strokeWidth={1.25} />
            <div className="illustration-check">
              <Check size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="assignment-stat-grid">
        <div className="assignment-stat-card stat-purple">
          <div className="assignment-stat-top">
            <div className="assignment-stat-icon">
              <ClipboardList size={20} />
            </div>
            <span className="stat-soft-label">TOTAL</span>
          </div>

          <strong>{stats.total}</strong>
          <p>Assignments</p>

          <div className="mini-stat-line">
            <span></span>
            <small>Across all subjects</small>
          </div>
        </div>

        <div className="assignment-stat-card stat-orange">
          <div className="assignment-stat-top">
            <div className="assignment-stat-icon">
              <Clock3 size={20} />
            </div>
            <span className="stat-soft-label">PENDING</span>
          </div>

          <strong>{stats.pending}</strong>
          <p>Need your attention</p>

          <div className="mini-stat-line">
            <span></span>
            <small>{stats.urgent} high priority</small>
          </div>
        </div>

        <div className="assignment-stat-card stat-blue">
          <div className="assignment-stat-top">
            <div className="assignment-stat-icon">
              <TrendingUp size={20} />
            </div>
            <span className="stat-soft-label">IN PROGRESS</span>
          </div>

          <strong>{stats.inProgress}</strong>
          <p>Currently working on</p>

          <div className="mini-stat-line">
            <span></span>
            <small>Keep going</small>
          </div>
        </div>

        <div className="assignment-stat-card stat-green">
          <div className="assignment-stat-top">
            <div className="assignment-stat-icon">
              <Target size={20} />
            </div>
            <span className="stat-soft-label">COMPLETION</span>
          </div>

          <strong>{stats.percentage}%</strong>
          <p>Overall progress</p>

          <div className="assignment-mini-progress">
            <span style={{ width: `${stats.percentage}%` }}></span>
          </div>
        </div>
      </section>

      {/* PROGRESS + FOCUS */}
      <section className="assignment-overview-grid">
        <div className="assignment-progress-panel glass-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-eyebrow">YOUR PROGRESS</span>
              <h2>Assignment completion</h2>
              <p>Keep your academic workload moving forward.</p>
            </div>

            <div className="progress-percent">
              {stats.percentage}%
            </div>
          </div>

          <div className="big-progress-track">
            <div
              className="big-progress-fill"
              style={{ width: `${stats.percentage}%` }}
            >
              <span></span>
            </div>
          </div>

          <div className="progress-bottom-row">
            <div>
              <CheckCircle2 size={16} />
              <span>{stats.completed} completed</span>
            </div>

            <div>
              <Clock3 size={16} />
              <span>{stats.pending + stats.inProgress} remaining</span>
            </div>

            <div>
              <Target size={16} />
              <span>{stats.total} total</span>
            </div>
          </div>
        </div>

        <div className="assignment-focus-panel">
          <div className="focus-glow"></div>

          <div className="focus-icon">
            <Target size={21} />
          </div>

          <span className="panel-eyebrow">TODAY'S FOCUS</span>

          <h3>
            {stats.urgent > 0
              ? `${stats.urgent} high-priority ${
                  stats.urgent === 1 ? "task" : "tasks"
                } need attention.`
              : "You're all caught up!"}
          </h3>

          <p>
            {stats.urgent > 0
              ? "Finish your most important work first and keep your academic momentum strong."
              : "Great work. Use your extra time to get ahead on upcoming assignments."}
          </p>

          <div className="focus-footer">
            <span>
              <Sparkles size={14} />
              Smart study tip
            </span>
            <ArrowUpRight size={17} />
          </div>
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="assignment-workspace">
        <div className="workspace-heading">
          <div>
            <span className="panel-eyebrow">WORKSPACE</span>
            <h2>My assignments</h2>
            <p>Manage everything in one organized space.</p>
          </div>

          <button
            className="workspace-add-btn"
            onClick={openAddModal}
          >
            <Plus size={17} />
            New assignment
          </button>
        </div>

        <div className="assignment-toolbar">
          <div className="assignment-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search assignments..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button onClick={() => setSearch("")}>
                <X size={15} />
              </button>
            )}
          </div>

          <div className="assignment-filter">
            <Filter size={16} />
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <ChevronDown size={14} />
          </div>

          <div className="assignment-filter">
            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value)
              }
            >
              <option value="All">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <ChevronDown size={14} />
          </div>

          <div className="assignment-filter">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="dueDate">Sort: Due Date</option>
              <option value="priority">Sort: Priority</option>
              <option value="title">Sort: Title</option>
            </select>
            <ChevronDown size={14} />
          </div>
        </div>

        {/* LIST */}
        <div className="premium-assignment-list">
          {filteredAssignments.length === 0 ? (
            <div className="assignment-empty-state">
              <div className="empty-illustration">
                <ClipboardList size={38} />
              </div>

              <h3>No assignments found</h3>
              <p>
                Try changing your filters or create a new assignment.
              </p>

              <button
                className="premium-primary-btn"
                onClick={openAddModal}
              >
                <Plus size={17} />
                Add Assignment
              </button>
            </div>
          ) : (
            filteredAssignments.map((assignment, index) => (
              <article
                className={`premium-assignment-card ${
                  assignment.status === "Completed"
                    ? "assignment-completed"
                    : ""
                }`}
                key={assignment.id}
              >
                <div className="assignment-card-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div
                  className={`assignment-card-icon ${
                    assignment.priority.toLowerCase()
                  }`}
                >
                  {assignment.status === "Completed" ? (
                    <CheckCircle2 size={22} />
                  ) : (
                    <BookOpen size={22} />
                  )}
                </div>

                <div className="premium-assignment-main">
                  <div className="assignment-title-row">
                    <div>
                      <span className="assignment-subject">
                        {assignment.subject}
                      </span>

                      <h3>{assignment.title}</h3>
                    </div>

                    <span
                      className={`premium-priority ${assignment.priority.toLowerCase()}`}
                    >
                      {assignment.priority}
                    </span>
                  </div>

                  <p>{assignment.description}</p>

                  <div className="premium-assignment-meta">
                    <span>
                      <CalendarDays size={14} />
                      {formatDate(assignment.dueDate)}
                    </span>

                    <span
                      className={
                        getDaysLeft(assignment.dueDate) === "Overdue"
                          ? "deadline-overdue"
                          : ""
                      }
                    >
                      <Clock3 size={14} />
                      {getDaysLeft(assignment.dueDate)}
                    </span>

                    <span
                      className={`premium-status ${assignment.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {assignment.status}
                    </span>
                  </div>
                </div>

                <div className="premium-assignment-actions">
                  <button
                    className={`complete-assignment-btn ${
                      assignment.status === "Completed"
                        ? "completed"
                        : ""
                    }`}
                    onClick={() => markCompleted(assignment.id)}
                    title={
                      assignment.status === "Completed"
                        ? "Mark as pending"
                        : "Mark as completed"
                    }
                  >
                    <Check size={16} />
                  </button>

                  <button
                    className="assignment-icon-btn"
                    onClick={() => openEditModal(assignment)}
                    title="Edit assignment"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="assignment-icon-btn danger"
                    onClick={() => deleteAssignment(assignment.id)}
                    title="Delete assignment"
                  >
                    <Trash2 size={16} />
                  </button>

                  <button
                    className="assignment-more-btn"
                    title="More options"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* MODAL */}
      {isModalOpen && (
        <div className="assignment-modal-overlay">
          <div className="assignment-modal">
            <div className="assignment-modal-header">
              <div>
                <span className="panel-eyebrow">
                  {editingAssignment ? "EDIT TASK" : "NEW TASK"}
                </span>

                <h2>
                  {editingAssignment
                    ? "Update assignment"
                    : "Create assignment"}
                </h2>

                <p>
                  Add the details so you can keep track of your work.
                </p>
              </div>

              <button
                className="modal-close-btn"
                onClick={closeModal}
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-field form-full">
                  <label>Assignment title</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleFormChange}
                    placeholder="e.g. Build a REST API"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleFormChange}
                    placeholder="e.g. Java Full Stack"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Due date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Priority</label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleFormChange}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleFormChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="form-field form-full">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleFormChange}
                    placeholder="Describe what you need to complete..."
                    rows="4"
                  />
                </div>
              </div>

              <div className="assignment-modal-footer">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="premium-primary-btn"
                >
                  {editingAssignment ? (
                    <>
                      <Check size={17} />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Plus size={17} />
                      Create Assignment
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assignments;