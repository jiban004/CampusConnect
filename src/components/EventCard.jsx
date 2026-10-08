import {
  CalendarDays,
  Clock3,
  MapPin,
  ArrowRight,
} from "lucide-react";

function EventCard({
  title,
  category,
  date,
  time,
  location,
  description,
  accent = "purple",
}) {
  return (
    <article className={`event-card event-${accent}`}>

      <div className="event-card-top">

        <div className="event-date-box">
          <span>{date.split(" ")[0]}</span>
          <strong>{date.split(" ")[1]}</strong>
        </div>

        <span className="event-category">
          {category}
        </span>

      </div>


      <div className="event-content">

        <h3>{title}</h3>

        <p>{description}</p>

        <div className="event-details">

          <span>
            <Clock3 size={13} />
            {time}
          </span>

          <span>
            <MapPin size={13} />
            {location}
          </span>

        </div>

      </div>


      <button className="event-register">
        Register
        <ArrowRight size={14} />
      </button>

    </article>
  );
}

export default EventCard;