import { useEffect, useState } from "react";

import {
  Edit3,
  Mail,
  MapPin,
  GraduationCap,
  Award,
  Code2,
  Heart,
  Users,
  CalendarDays,
  CheckCircle2,
  X,
  Save,
  Sparkles,
} from "lucide-react";

const defaultProfile = {
  name: "Alex Johnson",
  email: "student@campusconnect.com",
  studentId: "CC2026001",
  college: "CampusConnect University",
  department: "Computer Science",
  year: "4th Year",
  semester: "7th Semester",
  location: "Bengaluru, India",

  bio: "Computer Science student passionate about software development, problem solving and emerging technologies.",

  skills: [
    { name: "Java", level: 85 },
    { name: "JavaScript", level: 78 },
    { name: "React", level: 72 },
    { name: "SQL", level: 75 },
    { name: "Spring Boot", level: 65 },
  ],

  interests: [
    "Web Development",
    "Java",
    "Artificial Intelligence",
    "Problem Solving",
    "Open Source",
  ],

  clubs: [
    "Coding Club",
    "Tech & Innovation",
  ],

  achievements: [
    {
      title: "Smart India Hackathon",
      description: "Qualified for internal college selection.",
      year: "2025",
      icon: "🏆",
    },
    {
      title: "Academic Excellence",
      description: "Maintained strong academic performance.",
      year: "2026",
      icon: "🎓",
    },
    {
      title: "Technical Project",
      description: "Built multiple full-stack and frontend projects.",
      year: "2026",
      icon: "💻",
    },
  ],
};

function Profile() {
  const [profile, setProfile] = useState(defaultProfile);
  const [activeTab, setActiveTab] = useState("overview");
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState(defaultProfile);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("campusconnect_profile")
      );

      if (saved) {
        const merged = {
          ...defaultProfile,
          ...saved,
          skills: Array.isArray(saved.skills)
            ? saved.skills
            : defaultProfile.skills,
          interests: Array.isArray(saved.interests)
            ? saved.interests
            : defaultProfile.interests,
          clubs: Array.isArray(saved.clubs)
            ? saved.clubs
            : defaultProfile.clubs,
          achievements: Array.isArray(saved.achievements)
            ? saved.achievements
            : defaultProfile.achievements,
        };

        setProfile(merged);
        setEditForm(merged);
      }
    } catch (error) {
      console.error("Unable to load profile:", error);
    }
  }, []);

  const startEditing = () => {
    setEditForm(profile);
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditForm(profile);
    setEditing(false);
  };

  const saveProfile = () => {
    const updatedProfile = {
      ...profile,
      ...editForm,
    };

    localStorage.setItem(
      "campusconnect_profile",
      JSON.stringify(updatedProfile)
    );

    setProfile(updatedProfile);
    setEditForm(updatedProfile);
    setEditing(false);
  };

  const updateField = (field, value) => {
    setEditForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const firstName = profile.name?.split(" ")[0] || "Student";

  const profileItems = [
    profile.name,
    profile.email,
    profile.studentId,
    profile.college,
    profile.department,
    profile.year,
    profile.bio,
  ];

  const completedItems = profileItems.filter(
    (item) => item && String(item).trim()
  ).length;

  const completion = Math.round(
    (completedItems / profileItems.length) * 100
  );

  const averageSkill =
    profile.skills.length > 0
      ? Math.round(
          profile.skills.reduce(
            (sum, skill) => sum + Number(skill.level || 0),
            0
          ) / profile.skills.length
        )
      : 0;

  return (
    <div className="profile-page">

      {/* PAGE HEADER */}

      <div className="profile-page-header">
        <div>
          <p className="profile-eyebrow">STUDENT PROFILE</p>
          <h1>My Profile</h1>
          <p>
            Manage your personal information, skills and
            achievements.
          </p>
        </div>

        {!editing ? (
          <button
            className="profile-edit-button"
            onClick={startEditing}
          >
            <Edit3 size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="profile-edit-actions">
            <button
              className="profile-cancel-button"
              onClick={cancelEditing}
            >
              <X size={15} />
              Cancel
            </button>

            <button
              className="profile-save-button"
              onClick={saveProfile}
            >
              <Save size={15} />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* PROFILE SUMMARY */}

      <section className="profile-summary">

        <div className="profile-identity">

          <div className="profile-avatar">
            {profile.name
              ?.split(" ")
              .map((word) => word[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </div>

          <div className="profile-identity-text">
            <div className="profile-status">
              <span></span>
              Active Student
            </div>

            <h2>{profile.name}</h2>

            <p>
              {profile.department} • {profile.year}
            </p>

            <div className="profile-meta-row">
              <span>
                <GraduationCap size={14} />
                {profile.studentId}
              </span>

              <span>
                <Mail size={14} />
                {profile.email}
              </span>

              <span>
                <MapPin size={14} />
                {profile.location}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-completion">

          <div className="completion-ring">
            <svg viewBox="0 0 42 42">
              <circle
                cx="21"
                cy="21"
                r="17"
                className="completion-track"
              />

              <circle
                cx="21"
                cy="21"
                r="17"
                className="completion-progress"
                style={{
                  strokeDasharray: `${completion} 100`,
                }}
              />
            </svg>

            <strong>{completion}%</strong>
          </div>

          <div>
            <span>PROFILE COMPLETION</span>
            <strong>
              {completion >= 90
                ? "Excellent"
                : completion >= 70
                ? "Looking good"
                : "Keep improving"}
            </strong>
            <small>
              Keep your profile information updated.
            </small>
          </div>

        </div>
      </section>

      {/* TABS */}

      <div className="profile-tabs">
        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button
          className={activeTab === "skills" ? "active" : ""}
          onClick={() => setActiveTab("skills")}
        >
          Skills & Interests
        </button>

        <button
          className={activeTab === "achievements" ? "active" : ""}
          onClick={() => setActiveTab("achievements")}
        >
          Achievements
        </button>
      </div>

      {/* EDIT FORM */}

      {editing && (
        <section className="profile-edit-card">

          <div className="profile-section-heading">
            <div>
              <span>EDIT INFORMATION</span>
              <h2>Personal Details</h2>
            </div>
            <Edit3 size={19} />
          </div>

          <div className="profile-form-grid">

            <div className="profile-field">
              <label>Full Name</label>
              <input
                value={editForm.name}
                onChange={(e) =>
                  updateField("name", e.target.value)
                }
              />
            </div>

            <div className="profile-field">
              <label>Email</label>
              <input
                value={editForm.email}
                onChange={(e) =>
                  updateField("email", e.target.value)
                }
              />
            </div>

            <div className="profile-field">
              <label>Student ID</label>
              <input
                value={editForm.studentId}
                onChange={(e) =>
                  updateField("studentId", e.target.value)
                }
              />
            </div>

            <div className="profile-field">
              <label>College / University</label>
              <input
                value={editForm.college}
                onChange={(e) =>
                  updateField("college", e.target.value)
                }
              />
            </div>

            <div className="profile-field">
              <label>Department</label>
              <input
                value={editForm.department}
                onChange={(e) =>
                  updateField("department", e.target.value)
                }
              />
            </div>

            <div className="profile-field">
              <label>Year</label>
              <input
                value={editForm.year}
                onChange={(e) =>
                  updateField("year", e.target.value)
                }
              />
            </div>

            <div className="profile-field">
              <label>Semester</label>
              <input
                value={editForm.semester}
                onChange={(e) =>
                  updateField("semester", e.target.value)
                }
              />
            </div>

            <div className="profile-field">
              <label>Location</label>
              <input
                value={editForm.location}
                onChange={(e) =>
                  updateField("location", e.target.value)
                }
              />
            </div>

            <div className="profile-field profile-field-full">
              <label>About Me</label>
              <textarea
                rows="4"
                value={editForm.bio}
                onChange={(e) =>
                  updateField("bio", e.target.value)
                }
              />
            </div>

          </div>
        </section>
      )}

      {/* OVERVIEW */}

      {!editing && activeTab === "overview" && (
        <div className="profile-content-grid">

          <main className="profile-main-column">

            {/* ABOUT */}

            <section className="profile-card about-card">

              <div className="profile-card-heading">
                <div>
                  <span>ABOUT ME</span>
                  <h2>Get to know me</h2>
                </div>

                <div className="card-heading-icon">
                  <Sparkles size={17} />
                </div>
              </div>

              <p className="profile-bio">
                {profile.bio}
              </p>

              <div className="profile-info-grid">

                <div>
                  <span>COLLEGE</span>
                  <strong>{profile.college}</strong>
                </div>

                <div>
                  <span>DEPARTMENT</span>
                  <strong>{profile.department}</strong>
                </div>

                <div>
                  <span>ACADEMIC YEAR</span>
                  <strong>{profile.year}</strong>
                </div>

                <div>
                  <span>SEMESTER</span>
                  <strong>{profile.semester}</strong>
                </div>

              </div>
            </section>

            {/* ACADEMIC */}

            <section className="profile-card">

              <div className="profile-card-heading">
                <div>
                  <span>ACADEMIC OVERVIEW</span>
                  <h2>Student performance</h2>
                </div>

                <GraduationCap size={19} />
              </div>

              <div className="academic-profile-stats">

                <div className="academic-profile-stat purple">
                  <div>
                    <span>CGPA</span>
                    <strong>8.70</strong>
                  </div>
                  <GraduationCap size={21} />
                </div>

                <div className="academic-profile-stat blue">
                  <div>
                    <span>ATTENDANCE</span>
                    <strong>89%</strong>
                  </div>
                  <CalendarDays size={21} />
                </div>

                <div className="academic-profile-stat green">
                  <div>
                    <span>SEMESTER</span>
                    <strong>{profile.semester}</strong>
                  </div>
                  <CheckCircle2 size={21} />
                </div>

              </div>
            </section>

            {/* SKILLS PREVIEW */}

            <section className="profile-card">

              <div className="profile-card-heading">
                <div>
                  <span>CORE SKILLS</span>
                  <h2>Technical abilities</h2>
                </div>

                <Code2 size={19} />
              </div>

              <div className="skills-preview">

                {profile.skills.slice(0, 5).map((skill) => (
                  <div
                    className="skill-preview-item"
                    key={skill.name}
                  >
                    <div className="skill-preview-top">
                      <strong>{skill.name}</strong>
                      <span>{skill.level}%</span>
                    </div>

                    <div className="skill-bar">
                      <span
                        style={{
                          width: `${skill.level}%`,
                        }}
                      ></span>
                    </div>
                  </div>
                ))}

              </div>
            </section>

          </main>

          {/* RIGHT */}

          <aside className="profile-side-column">

            {/* QUICK STATS */}

            <section className="profile-card quick-stats-card">

              <div className="profile-card-heading">
                <div>
                  <span>QUICK STATS</span>
                  <h2>At a glance</h2>
                </div>
              </div>

              <div className="quick-stat-list">

                <div>
                  <div className="quick-stat-icon purple">
                    <Code2 size={16} />
                  </div>
                  <span>Core Skills</span>
                  <strong>{profile.skills.length}</strong>
                </div>

                <div>
                  <div className="quick-stat-icon blue">
                    <Heart size={16} />
                  </div>
                  <span>Interests</span>
                  <strong>{profile.interests.length}</strong>
                </div>

                <div>
                  <div className="quick-stat-icon green">
                    <Users size={16} />
                  </div>
                  <span>Clubs Joined</span>
                  <strong>{profile.clubs.length}</strong>
                </div>

                <div>
                  <div className="quick-stat-icon orange">
                    <Award size={16} />
                  </div>
                  <span>Achievements</span>
                  <strong>{profile.achievements.length}</strong>
                </div>

              </div>
            </section>

            {/* CLUBS */}

            <section className="profile-card">

              <div className="profile-card-heading">
                <div>
                  <span>CAMPUS LIFE</span>
                  <h2>My clubs</h2>
                </div>

                <Users size={18} />
              </div>

              <div className="profile-club-list">

                {profile.clubs.length > 0 ? (
                  profile.clubs.map((club) => (
                    <div
                      className="profile-club"
                      key={club}
                    >
                      <div className="club-mini-icon">
                        <Users size={15} />
                      </div>

                      <span>{club}</span>

                      <CheckCircle2 size={15} />
                    </div>
                  ))
                ) : (
                  <p className="empty-profile-message">
                    No clubs joined yet.
                  </p>
                )}

              </div>
            </section>

            {/* INTERESTS */}

            <section className="profile-card">

              <div className="profile-card-heading">
                <div>
                  <span>INTERESTS</span>
                  <h2>What I enjoy</h2>
                </div>

                <Heart size={18} />
              </div>

              <div className="interest-list">

                {profile.interests.map((interest) => (
                  <span key={interest}>
                    {interest}
                  </span>
                ))}

              </div>

            </section>

          </aside>

        </div>
      )}

      {/* SKILLS TAB */}

      {!editing && activeTab === "skills" && (
        <div className="profile-content-grid">

          <main className="profile-main-column">

            <section className="profile-card">

              <div className="profile-card-heading">
                <div>
                  <span>TECHNICAL SKILLS</span>
                  <h2>My skill set</h2>
                </div>

                <Code2 size={19} />
              </div>

              <div className="skill-detail-list">

                {profile.skills.map((skill) => (
                  <div
                    className="skill-detail"
                    key={skill.name}
                  >
                    <div className="skill-detail-top">
                      <div>
                        <strong>{skill.name}</strong>
                        <span>
                          {skill.level >= 80
                            ? "Advanced"
                            : skill.level >= 65
                            ? "Intermediate"
                            : "Developing"}
                        </span>
                      </div>

                      <b>{skill.level}%</b>
                    </div>

                    <div className="skill-detail-bar">
                      <span
                        style={{
                          width: `${skill.level}%`,
                        }}
                      ></span>
                    </div>
                  </div>
                ))}

              </div>

            </section>

            <section className="profile-card">

              <div className="profile-card-heading">
                <div>
                  <span>PERSONAL INTERESTS</span>
                  <h2>Things I enjoy</h2>
                </div>

                <Heart size={19} />
              </div>

              <div className="interest-large-list">

                {profile.interests.map((interest) => (
                  <div key={interest}>
                    <span>✦</span>
                    {interest}
                  </div>
                ))}

              </div>

            </section>

          </main>

          <aside className="profile-side-column">

            <section className="profile-card skill-score-card">

              <div className="skill-score-circle">
                <strong>{averageSkill}%</strong>
                <span>Average</span>
              </div>

              <h3>Technical Skill Score</h3>

              <p>
                Your current skill profile across the
                technologies you're learning.
              </p>

            </section>

          </aside>

        </div>
      )}

      {/* ACHIEVEMENTS */}

      {!editing && activeTab === "achievements" && (
        <section className="profile-card achievements-profile-card">

          <div className="profile-card-heading">
            <div>
              <span>ACHIEVEMENTS</span>
              <h2>Milestones & accomplishments</h2>
            </div>

            <Award size={20} />
          </div>

          <div className="achievement-grid">

            {profile.achievements.map((achievement, index) => (
              <div
                className="achievement-profile-item"
                key={`${achievement.title}-${index}`}
              >
                <div className="achievement-icon">
                  {achievement.icon || "🏆"}
                </div>

                <div className="achievement-content">
                  <div>
                    <span>{achievement.year}</span>
                    <CheckCircle2 size={14} />
                  </div>

                  <h3>{achievement.title}</h3>

                  <p>
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}

          </div>

          {profile.achievements.length === 0 && (
            <div className="empty-achievements">
              <Award size={28} />
              <h3>No achievements yet</h3>
              <p>
                Your accomplishments will appear here.
              </p>
            </div>
          )}

        </section>
      )}

    </div>
  );
}

export default Profile;