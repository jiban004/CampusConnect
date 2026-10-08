import {
  Megaphone,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

function AnnouncementCard({
  title,
  category,
  date,
  description,
  important = false,
}) {
  return (
    <article className={`announcement-card ${important ? "announcement-important" : ""}`}>

      <div className="announcement-icon">
        <Megaphone size={17} />
      </div>

      <div className="announcement-content">

        <div className="announcement-top">
          <span className="announcement-category">
            {category}
          </span>

          {important && (
            <span className="announcement-important-badge">
              Important
            </span>
          )}
        </div>

        <h3>{title}</h3>

        <p>{description}</p>

        <div className="announcement-date">
          <CalendarDays size={13} />
          <span>{date}</span>
        </div>

      </div>

      <button
        className="announcement-action"
        aria-label={`View ${title}`}
      >
        <ArrowRight size={15} />
      </button>

    </article>
  );
}

export default AnnouncementCard;