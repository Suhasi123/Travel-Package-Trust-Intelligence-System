// import { Link, Outlet } from "react-router-dom";

// export default function CompanyLayout() {
//   return (
//     <div style={{ padding: 30 }}>
//       <h2>Company Dashboard</h2>

//       <nav style={{ marginBottom: 20 }}>
//         <Link to="profile">Profile</Link> |{" "}
//         <Link to="documents">Documents</Link> |{" "}
//         <Link to="packages">Packages</Link> |{" "}
//         <Link to="bookings">Bookings</Link>
//       </nav>
//       <hr />
//       <Outlet />
//     </div>
//   );
// }

import { Link, Outlet, useLocation } from "react-router-dom";

export default function CompanyLayout() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    header: {
      position: "sticky",
      top: 0,
      zIndex: 40,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(226, 232, 240, 0.6)",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    headerInner: {
      maxWidth: "1600px",
      margin: "0 auto",
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerLeft: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    backBtn: {
      padding: "8px",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      borderRadius: "8px",
      transition: "all 0.3s",
      color: "#64748b",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
      fontWeight: "500",
    },
    headerTitle: {
      fontSize: "24px",
      fontWeight: "700",
      background: "linear-gradient(90deg, #0f172a 0%, #475569 50%, #0f172a 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.025em",
      margin: 0,
    },
    headerSubtitle: {
      fontSize: "14px",
      color: "#64748b",
      marginTop: "4px",
    },
    logoutBtn: {
      padding: "8px 16px",
      backgroundColor: "white",
      border: "1px solid #e2e8f0",
      color: "#334155",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s",
      textDecoration: "none",
    },
    mainLayout: {
      display: "flex",
      maxWidth: "1600px",
      margin: "0 auto",
      minHeight: "calc(100vh - 73px)",
    },
    sidebar: {
      width: "280px",
      backgroundColor: "white",
      borderRight: "1px solid #e2e8f0",
      padding: "24px 0",
      position: "sticky",
      top: "73px",
      height: "calc(100vh - 73px)",
      overflowY: "auto",
    },
    sidebarTitle: {
      fontSize: "12px",
      fontWeight: "600",
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      padding: "0 24px",
      marginBottom: "12px",
    },
    nav: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      padding: "0 12px",
    },
    navLink: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 16px",
      borderRadius: "8px",
      fontSize: "15px",
      fontWeight: "500",
      textDecoration: "none",
      transition: "all 0.3s",
      cursor: "pointer",
    },
    navLinkInactive: {
      color: "#64748b",
      backgroundColor: "transparent",
    },
    navLinkActive: {
      color: "#4f46e5",
      backgroundColor: "#eef2ff",
    },
    navIcon: {
      fontSize: "18px",
      width: "20px",
      textAlign: "center",
    },
    content: {
      flex: 1,
      padding: "32px 24px",
      overflowY: "auto",
    },
  };

  const navItems = [
    { path: "profile", label: "Profile", icon: "👤" },
    { path: "documents", label: "Documents", icon: "📄" },
    { path: "packages", label: "Packages", icon: "📦" },
    { path: "bookings", label: "Bookings", icon: "📋" },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.headerLeft}>
            <a
              href="/"
              style={styles.backBtn}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#f1f5f9";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              ← Back
            </a>
            <div>
              <h1 style={styles.headerTitle}>Company Dashboard</h1>
              <p style={styles.headerSubtitle}>Manage your travel business</p>
            </div>
          </div>
          <a
            href="/packages"
            style={styles.logoutBtn}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#c7d2fe";
              e.currentTarget.style.color = "#4f46e5";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.color = "#334155";
            }}
          >
            Browse Packages
          </a>
        </div>
      </header>

      {/* Main Layout with Sidebar */}
      <div style={styles.mainLayout}>
        {/* Sidebar Navigation */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarTitle}>Navigation</div>
          <nav style={styles.nav}>
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    ...styles.navLink,
                    ...(active ? styles.navLinkActive : styles.navLinkInactive),
                  }}
                  onMouseOver={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                      e.currentTarget.style.color = "#334155";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#64748b";
                    }
                  }}
                >
                  <span style={styles.navIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}