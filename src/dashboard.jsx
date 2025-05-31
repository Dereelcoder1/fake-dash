"use client"

import { useState, useEffect } from "react"
import { faker } from "@faker-js/faker"
import "./dashboard.css"

export default function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [stats, setStats] = useState([])
  const [activities, setActivities] = useState([])
  const [chartData, setChartData] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Simulate API call with comprehensive fake data
    setTimeout(() => {
      const user = {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        jobTitle: faker.person.jobTitle(),
        company: faker.company.name(),
        department: faker.commerce.department(),
        location: `${faker.location.city()}, ${faker.location.country()}`,
        joinDate: faker.date.past({ years: 3 }),
        bio: faker.lorem.paragraph(2),
        phone: faker.phone.number(),
        timezone: faker.location.timeZone(),
        lastLogin: faker.date.recent({ days: 1 }),
      }

      const statsData = [
        {
          id: 1,
          title: "Total Revenue",
          value: `$${faker.number.int({ min: 100000, max: 999999 }).toLocaleString()}`,
          change: faker.number.int({ min: 5, max: 25 }),
          icon: "chart-line",
          trend: "up",
          subtitle: "This month",
        },
        {
          id: 2,
          title: "Active Projects",
          value: faker.number.int({ min: 15, max: 50 }),
          change: faker.number.int({ min: -5, max: 15 }),
          icon: "folder",
          trend: "up",
          subtitle: "In progress",
        },
        {
          id: 3,
          title: "Team Performance",
          value: `${faker.number.int({ min: 85, max: 98 })}%`,
          change: faker.number.int({ min: 2, max: 12 }),
          icon: "users",
          trend: "up",
          subtitle: "Efficiency rate",
        },
        {
          id: 4,
          title: "Customer Satisfaction",
          value: `${(faker.number.float({ min: 4.5, max: 4.9, fractionDigits: 1 })).toFixed(1)}/5.0`,
          change: faker.number.int({ min: 1, max: 8 }),
          icon: "star",
          trend: "up",
          subtitle: "Average rating",
        },
      ]

      const activitiesData = Array.from({ length: 12 }, () => ({
        id: faker.string.uuid(),
        action: faker.helpers.arrayElement([
          "Project milestone completed",
          "New team member onboarded",
          "Client meeting scheduled",
          "Report generated",
          "Budget approved",
          "Code review completed",
          "System deployment",
          "Performance review",
          "Training session completed",
          "Contract signed",
        ]),
        description: faker.lorem.sentence(),
        timestamp: faker.date.recent({ days: 7 }),
        type: faker.helpers.arrayElement(["success", "info", "warning", "neutral"]),
        user: faker.person.firstName(),
        priority: faker.helpers.arrayElement(["high", "medium", "low"]),
      }))

      const chartData = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2024, i, 1).toLocaleDateString("en-US", { month: "short" }),
        revenue: faker.number.int({ min: 20000, max: 80000 }),
        projects: faker.number.int({ min: 5, max: 25 }),
        customers: faker.number.int({ min: 50, max: 200 }),
      }))

      const notificationsData = Array.from({ length: 6 }, () => ({
        id: faker.string.uuid(),
        title: faker.helpers.arrayElement([
          "New project assigned",
          "Meeting reminder",
          "Budget alert",
          "System update",
          "Performance report ready",
          "Team milestone achieved",
        ]),
        message: faker.lorem.sentence(),
        time: faker.date.recent({ hours: 24 }),
        read: faker.datatype.boolean(),
        type: faker.helpers.arrayElement(["info", "success", "warning", "error"]),
      }))

      setUserData(user)
      setStats(statsData)
      setActivities(activitiesData)
      setChartData(chartData)
      setNotifications(notificationsData)
      setLoading(false)
    }, 1500)
  }, [])

  const getIcon = (iconName) => {
    const icons = {
      "chart-line": "📈",
      folder: "📁",
      users: "👥",
      star: "⭐",
      bell: "🔔",
      search: "🔍",
      menu: "☰",
      settings: "⚙️",
    }
    return icons[iconName] || "●"
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Loading Dashboard</h2>
          <p>Preparing your workspace...</p>
          <div className="loading-progress">
            <div className="loading-bar"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      {/* Navigation Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon"></div>
            <span className="logo-text">Enterprise Dashboard</span>
          </div>
          <nav className="main-nav">
            <button
              className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`nav-item ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </button>
            <button
              className={`nav-item ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              Projects
            </button>
            <button
              className={`nav-item ${activeTab === "reports" ? "active" : ""}`}
              onClick={() => setActiveTab("reports")}
            >
              Reports
            </button>
          </nav>
        </div>
        <div className="header-right">
          <div className="search-container">
            <input type="text" placeholder="Search..." className="search-input" />
            <div className="search-icon"></div>
          </div>
          <div className="notifications-container">
            <button className="notification-btn">
              <div className="notification-icon"></div>
              <span className="notification-badge">{notifications.filter((n) => !n.read).length}</span>
            </button>
          </div>
          <div className="user-menu">
            <img src={userData.avatar || "/placeholder.svg"} alt={userData.name} className="user-avatar" />
            <span className="user-name">{userData.name.split(" ")[0]}</span>
            <div className="dropdown-arrow"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-content">
            <h1 className="welcome-title">
              Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"},{" "}
              {userData.name.split(" ")[0]}
            </h1>
            <p className="welcome-subtitle">Here's your business overview for today.</p>
          </div>
          <div className="welcome-stats">
            <div className="quick-stat">
              <span className="quick-stat-value">
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </span>
              <span className="quick-stat-label">Today</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-value">{userData.timezone}</span>
              <span className="quick-stat-label">Timezone</span>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={stat.id} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-header">
                  <div className="stat-icon-container">
                    <div className={`stat-icon ${stat.icon}`}></div>
                  </div>
                  <div className={`stat-trend ${stat.trend}`}>
                    <div className="trend-arrow"></div>
                    <span className="trend-value">{Math.abs(stat.change)}%</span>
                  </div>
                </div>
                <div className="stat-content">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-title">{stat.title}</p>
                  <p className="stat-subtitle">{stat.subtitle}</p>
                </div>
                <div className="stat-chart">
                  <div className="mini-chart">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div
                        key={i}
                        className="chart-bar"
                        style={{ height: `${faker.number.int({ min: 20, max: 100 })}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Dashboard Grid */}
        <section className="dashboard-grid">
          {/* Profile Card */}
          <div className="profile-card card">
            <div className="card-header">
              <h3>Profile Overview</h3>
              <button className="edit-btn">Edit Profile</button>
            </div>
            <div className="profile-content">
              <div className="profile-main">
                <div className="avatar-section">
                  <img src={userData.avatar || "/placeholder.svg"} alt={userData.name} className="profile-avatar" />
                  <div className="status-indicator online"></div>
                </div>
                <div className="profile-info">
                  <h2 className="profile-name">{userData.name}</h2>
                  <p className="profile-title">{userData.jobTitle}</p>
                  <p className="profile-department">
                    {userData.department} • {userData.company}
                  </p>
                </div>
              </div>
              <div className="profile-details">
                <div className="detail-grid">
                  <div className="detail-item">
                    <div className="detail-icon email"></div>
                    <div className="detail-content">
                      <span className="detail-label">Email</span>
                      <span className="detail-value">{userData.email}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon phone"></div>
                    <div className="detail-content">
                      <span className="detail-label">Phone</span>
                      <span className="detail-value">{userData.phone}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon location"></div>
                    <div className="detail-content">
                      <span className="detail-label">Location</span>
                      <span className="detail-value">{userData.location}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-icon calendar"></div>
                    <div className="detail-content">
                      <span className="detail-label">Joined</span>
                      <span className="detail-value">{userData.joinDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="chart-card card">
            <div className="card-header">
              <h3>Revenue Analytics</h3>
              <div className="chart-controls">
                <button className="chart-btn active">12M</button>
                <button className="chart-btn">6M</button>
                <button className="chart-btn">3M</button>
              </div>
            </div>
            <div className="chart-container">
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color revenue"></span>
                  <span>Revenue</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color projects"></span>
                  <span>Projects</span>
                </div>
              </div>
              <div className="chart">
                {chartData.map((data, index) => (
                  <div key={index} className="chart-column">
                    <div className="chart-bars">
                      <div
                        className="chart-bar revenue"
                        style={{ height: `${(data.revenue / 80000) * 100}%` }}
                        title={`Revenue: $${data.revenue.toLocaleString()}`}
                      ></div>
                      <div
                        className="chart-bar projects"
                        style={{ height: `${(data.projects / 25) * 100}%` }}
                        title={`Projects: ${data.projects}`}
                      ></div>
                    </div>
                    <span className="chart-label">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="activity-card card">
            <div className="card-header">
              <h3>Recent Activity</h3>
              <div className="activity-filters">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">High</button>
                <button className="filter-btn">Medium</button>
              </div>
            </div>
            <div className="activity-content">
              <div className="activity-list">
                {activities.slice(0, 8).map((activity) => (
                  <div key={activity.id} className={`activity-item ${activity.type} priority-${activity.priority}`}>
                    <div className="activity-indicator"></div>
                    <div className="activity-main">
                      <div className="activity-header">
                        <h4 className="activity-title">{activity.action}</h4>
                        <span className="activity-time">
                          {activity.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="activity-description">{activity.description}</p>
                      <div className="activity-meta">
                        <span className="activity-user">by {activity.user}</span>
                        <span className={`priority-badge ${activity.priority}`}>{activity.priority}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="view-all-btn">View All Activities</button>
            </div>
          </div>

          {/* Notifications Panel */}
          <div className="notifications-card card">
            <div className="card-header">
              <h3>Notifications</h3>
              <button className="mark-read-btn">Mark all read</button>
            </div>
            <div className="notifications-content">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.type} ${notification.read ? "read" : "unread"}`}
                >
                  <div className={`notification-icon ${notification.type}`}></div>
                  <div className="notification-content">
                    <h4 className="notification-title">{notification.title}</h4>
                    <p className="notification-message">{notification.message}</p>
                    <span className="notification-time">
                      {notification.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  {!notification.read && <div className="unread-indicator"></div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
