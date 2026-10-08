import {
  Clock3,
  MapPin,
  UserRound,
  ArrowRight,
} from "lucide-react";

function ClassCard({
  subject,
  time,
  room,
  faculty,
  type = "Upcoming",
  accent = "purple",
}) {
  return (
    <div className={`class-card class-${accent}`}>
      <div className="class-card-top">
        <div className="class-time">
          <Clock3 size={15} />
          <span>{time}</span>
        </div>

        <span className="class-status">
          {type}
        </span>
      </div>

      <div className="class-card-body">
        <div className="class-subject-row">
          <div className="class-subject-icon">
            <span></span>
          </div>

          <div>
            <h3>{subject}</h3>
            <p>Regular Lecture</p>
          </div>
        </div>

        <div className="class-details">
          <div>
            <UserRound size={14} />
            <span>{faculty}</span>
          </div>

          <div>
            <MapPin size={14} />
            <span>{room}</span>
          </div>
        </div>
      </div>

      <button className="class-action">
        View Details
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

export default ClassCard;