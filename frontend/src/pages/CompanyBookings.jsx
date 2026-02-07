// import { useEffect, useState } from "react";
// import client from "../api/client";

// export default function CompanyBookings(){
//     const [company, setCompany] = useState(null);
//     const [pendingBookings, setPendingBookings] = useState([]);

//     async function loadCompany() {
//         const res = await client.get("/companies/me");

//         if (res.data.exists) {
//         setCompany(res.data.company);

//         const bRes = await client.get("/bookings/company/pending");
//         setPendingBookings(bRes.data);

//         }
//     }
//     useEffect(() => {
//         loadCompany();
//     }, []);

//     return(
//         <div style={{padding:40}}>
//             <h3>Pending Bookings</h3>
//             {pendingBookings.length === 0 ? (
//             <p>No pending bookings.</p>
//             ) : ( pendingBookings.map((b) => (
//                 <div key={b.id}>
//                 Booking #{b.id} (User {b.user_id})
//                 <button
//                     onClick={async () => {
//                     await client.patch(`/bookings/company/${b.id}/mark-done`);
//                     alert("Marked completed");
//                     loadCompany();
//                     }}
//                 >
//                     Mark Trip Done
//                 </button>
//                 </div>
//             )))
//             }
//         </div>
//     );
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
  CircleX,
  Hourglass,
} from "lucide-react"; 

export default function CompanyBookings(){
    const [company, setCompany] = useState(null);
    const [pendingBookings, setPendingBookings] = useState([]);

    async function loadCompany() {
        const res = await client.get("/companies/me");

        if (res.data.exists) {
        setCompany(res.data.company);

        const bRes = await client.get("/bookings/company/pending");
        setPendingBookings(bRes.data);

        }
    }
    useEffect(() => {
        loadCompany();
    }, []);

    const styles = {
      pageTitle: {
        fontSize: "28px",
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: "8px",
      },
      pageSubtitle: {
        fontSize: "15px",
        color: "#64748b",
        marginBottom: "32px",
      },
      sectionHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "24px",
      },
      sectionTitle: {
        fontSize: "22px",
        fontWeight: "700",
        color: "#0f172a",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      },
      countBadge: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "32px",
        height: "32px",
        padding: "0 12px",
        backgroundColor: "#fef3c7",
        color: "#b45309",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "700",
        border: "1px solid #fde68a",
      },
      emptyState: {
        textAlign: "center",
        padding: "64px 32px",
        backgroundColor: "#f8fafc",
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
      bookingsList: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      },
      bookingCard: {
        backgroundColor: "white",
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
        padding: "24px",
        transition: "all 0.3s",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
      },
      bookingInfo: {
        flex: 1,
        minWidth: "200px",
      },
      bookingId: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: "8px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      },
      userId: {
        fontSize: "14px",
        color: "#64748b",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      },
      userIdLabel: {
        fontWeight: "500",
      },
      userIdValue: {
        padding: "4px 10px",
        backgroundColor: "#f1f5f9",
        borderRadius: "6px",
        fontWeight: "600",
        color: "#334155",
        fontSize: "13px",
      },
      actionBtn: {
        padding: "10px 24px",
        background: "linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%)",
        color: "white",
        border: "none",
        borderRadius: "12px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.3s",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        whiteSpace: "nowrap",
      },
      statusBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        backgroundColor: "#fef3c7",
        color: "#b45309",
        border: "1px solid #fde68a",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      },
    };

    return(
        <div>
            <h1 style={styles.pageTitle}>Bookings</h1>
            <p style={styles.pageSubtitle}>Manage customer bookings and trip completions</p>

            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                <ClipboardList size={24}/>
                <span>Pending Bookings</span>
              </h2>
              {pendingBookings.length > 0 && (
                <span style={styles.countBadge}>
                  {pendingBookings.length}
                </span>
              )}
            </div>

            {pendingBookings.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}><CheckCircle size={32}/></div>
                <h3 style={styles.emptyTitle}>All caught up!</h3>
                <p style={styles.emptyText}>No pending bookings at the moment</p>
              </div>
            ) : (
              <div style={styles.bookingsList}>
                {pendingBookings.map((b) => (
                  <div
                    key={b.id}
                    style={styles.bookingCard}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "#c7d2fe";
                      e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(79, 70, 229, 0.1)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={styles.bookingInfo}>
                      <div style={styles.bookingId}>
                        <ClipboardList size={18}/>
                        <span>Booking #{b.id}</span>
                        <span style={styles.statusBadge}>
                          <Hourglass size={18}/> Pending
                        </span>
                      </div>
                      <div style={styles.userId}>
                        <span style={styles.userIdLabel}>Customer:</span>
                        <span style={styles.userIdValue}>
                          User #{b.user_id}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={async () => {
                        await client.patch(`/bookings/company/${b.id}/mark-done`);
                        alert("Marked completed");
                        loadCompany();
                      }}
                      style={styles.actionBtn}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow = "0 8px 12px rgba(79, 70, 229, 0.3)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <CheckCircle size={18}/>
                      <span>Mark Trip Done</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
        </div>
    );
}