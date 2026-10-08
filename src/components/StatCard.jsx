import { ArrowUpRight } from "lucide-react";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon size={20} strokeWidth={2} />
        </div>

        <button className="stat-action" aria-label={`${title} details`}>
          <ArrowUpRight size={17} />
        </button>
      </div>

      <div className="stat-card-content">
        <p className="stat-title">{title}</p>

        <h3 className="stat-value">{value}</h3>

        <div className="stat-bottom">
          {trend && (
            <span className="stat-trend">
              {trend}
            </span>
          )}

          <span className="stat-subtitle">
            {trendLabel || subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StatCard;