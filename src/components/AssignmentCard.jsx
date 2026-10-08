import {
  CalendarDays,
  BookOpen,
  ArrowRight,
} from "lucide-react";

function AssignmentCard({
  title,
  subject,
  dueDate,
  priority = "Medium",
  status = "Pending",
}) {
  return (
    <div className="assignment-card">

      <div className="assignment-main">

        <div className="assignment-icon">
          <BookOpen size={18} />
        </div>

        <div className="assignment-info">
          <h3>{title}</h3>

          <p>{subject}</p>
        </div>

      </div>


      <div className="assignment-meta">

        <div className="assignment-due">
          <CalendarDays size={14} />
          <span>{dueDate}</span>
        </div>

        <span
          className={`assignment-priority priority-${priority.toLowerCase()}`}
        >
          {priority}
        </span>

        <span
          className={`assignment-status status-${status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {status}
        </span>

        <button
          className="assignment-action"
          aria-label={`View ${title}`}
        >
          <ArrowRight size={15} />
        </button>

      </div>

    </div>
  );
}

export default AssignmentCard;