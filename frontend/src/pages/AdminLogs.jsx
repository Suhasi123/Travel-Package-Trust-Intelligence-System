// import { useEffect, useState } from "react";
// import client from "../api/client";

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     async function fetchLogs() {
//       const res = await client.get("/admin/audit-logs");
//       setLogs(res.data);
//     }
//     fetchLogs();
//   }, []);

//   return (
//     <div style={{ padding: 30 }}>
//       <h2>Audit Logs</h2>

//       {logs.map((l) => (
//         <div key={l.id} style={{ marginBottom: 10 }}>
//           <b>{l.action}</b>
//           <p>Actor: {l.actor_id}</p>
//           <p>{l.timestamp}</p>
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import client from "../api/client";
import {
  BarChart3,
  Building2,
  FileText,
  Package,
  MapPin,
  Clock,
  ClipboardList,
  Upload,
  AlertTriangle,
  CheckCircle,
  Star,
  Trash2,
  Info,
  Lightbulb,
  ShieldCheck,
  Calendar,
  IndianRupee,
  Globe,
  Plane,
  User,
} from "lucide-react";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchLogs() {
      const res = await client.get("/admin/audit-logs");
      setLogs(res.data);
    }
    fetchLogs();
  }, []);

  const getActionColor = (action) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes("approve") || actionLower.includes("verify")) {
      return { bg: "#ecfdf5", text: "#047857", border: "#d1fae5", icon: "✓" };
    }
    if (actionLower.includes("reject") || actionLower.includes("delete")) {
      return { bg: "#fee2e2", text: "#dc2626", border: "#fecaca", icon: "✗" };
    }
    if (actionLower.includes("create") || actionLower.includes("add")) {
      return { bg: "#dbeafe", text: "#1d4ed8", border: "#bfdbfe", icon: "+" };
    }
    if (actionLower.includes("update") || actionLower.includes("edit")) {
      return { bg: "#fef3c7", text: "#b45309", border: "#fde68a", icon: "✎" };
    }
    return { bg: "#f1f5f9", text: "#64748b", border: "#e2e8f0", icon: "•" };
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
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
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "16px 24px",
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
    main: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "32px 24px",
    },
    statsBar: {
      backgroundColor: "white",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      padding: "20px 24px",
      marginBottom: "24px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    statsIcon: {
      width: "48px",
      height: "48px",
      backgroundColor: "#eef2ff",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
    },
    statsText: {
      flex: 1,
    },
    statsTitle: {
      fontSize: "14px",
      color: "#64748b",
      marginBottom: "4px",
    },
    statsValue: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#0f172a",
    },
    timeline: {
      position: "relative",
    },
    timelineItem: {
      position: "relative",
      paddingLeft: "48px",
      paddingBottom: "32px",
    },
    timelineItemLast: {
      paddingBottom: "0",
    },
    timelineLine: {
      position: "absolute",
      left: "23px",
      top: "48px",
      bottom: "0",
      width: "2px",
      background: "linear-gradient(180deg, #e2e8f0 0%, transparent 100%)",
    },
    timelineDot: {
      position: "absolute",
      left: "12px",
      top: "16px",
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      border: "3px solid white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: "700",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    logCard: {
      backgroundColor: "white",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      padding: "20px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      transition: "all 0.3s",
    },
    logHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "12px",
      flexWrap: "wrap",
      gap: "12px",
    },
    actionBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 14px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "600",
      border: "1px solid",
    },
    timestamp: {
      fontSize: "13px",
      color: "#94a3b8",
      fontWeight: "500",
    },
    actorInfo: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      color: "#64748b",
    },
    actorIcon: {
      width: "32px",
      height: "32px",
      backgroundColor: "#f1f5f9",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
    },
    emptyState: {
      textAlign: "center",
      padding: "64px 32px",
      backgroundColor: "white",
      borderRadius: "16px",
      border: "1px dashed #cbd5e1",
    },
    emptyIcon: {
      fontSize: "64px",
      marginBottom: "16px",
    },
    emptyTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#0f172a",
      marginBottom: "8px",
    },
    emptyText: {
      fontSize: "15px",
      color: "#64748b",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <a
            href="/admin"
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
            <h1 style={styles.headerTitle}>Audit Logs</h1>
            <p style={styles.headerSubtitle}>System activity and administrative actions</p>
          </div>
        </div>
      </header>

      <div style={styles.main}>
        {/* Stats Bar */}
        <div style={styles.statsBar}>
          <div style={styles.statsIcon}><BarChart3 size={24}/></div>
          <div style={styles.statsText}>
            <div style={styles.statsTitle}>Total Audit Logs</div>
            <div style={styles.statsValue}>{logs.length}</div>
          </div>
        </div>

        {/* Timeline */}
        {logs.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}><ClipboardList size={20}/></div>
            <h3 style={styles.emptyTitle}>No audit logs yet</h3>
            <p style={styles.emptyText}>Activity logs will appear here as actions are performed</p>
          </div>
        ) : (
          <div style={styles.timeline}>
            {logs.map((l, index) => {
              const actionStyle = getActionColor(l.action);
              const isLast = index === logs.length - 1;

              return (
                <div
                  key={l.id}
                  style={{
                    ...styles.timelineItem,
                    ...(isLast ? styles.timelineItemLast : {}),
                  }}
                >
                  {!isLast && <div style={styles.timelineLine}></div>}
                  <div
                    style={{
                      ...styles.timelineDot,
                      backgroundColor: actionStyle.bg,
                      color: actionStyle.text,
                      borderColor: actionStyle.border,
                    }}
                  >
                    {actionStyle.icon}
                  </div>

                  <div
                    style={styles.logCard}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "#c7d2fe";
                      e.currentTarget.style.boxShadow = "0 4px 6px rgba(79, 70, 229, 0.1)";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <div style={styles.logHeader}>
                      <span
                        style={{
                          ...styles.actionBadge,
                          backgroundColor: actionStyle.bg,
                          color: actionStyle.text,
                          borderColor: actionStyle.border,
                        }}
                      >
                        {actionStyle.icon} {l.action}
                      </span>
                      <span style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        ...styles.timestamp
                      }}> 
                        <Clock size={18}/> {formatTimestamp(l.timestamp)}
                      </span>
                    </div>

                    <div style={styles.actorInfo}>
                      <div style={styles.actorIcon}><User size={18}/></div>
                      <span>
                        <strong>Actor ID:</strong> {l.actor_id}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}