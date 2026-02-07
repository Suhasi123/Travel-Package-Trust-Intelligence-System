// import { useEffect, useState } from "react";
// import client from "../api/client";

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [reviewingId, setReviewingId] = useState(null);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [reviewStatus, setReviewStatus] = useState({});

//   async function loadBookings() {
//     const res = await client.get("/bookings/my");
//     setBookings(res.data);
//   }

//   useEffect(() => {
//     loadBookings();
//   }, []);

//   async function confirmBooking(id) {
//     await client.patch(`/bookings/user/${id}/confirm`);
//     alert("Booking confirmed completed");
//     loadBookings();
//   }

//   async function submitReview(bookingId) {
//     await client.post("/reviews", {
//       booking_id: bookingId,
//       rating: rating,
//       comment: comment,
//     });

//     alert("Review submitted");
//     setReviewingId(null);
//     setComment("");
//     loadBookings();
//   }

//   async function loadBookings() {
//     const res = await client.get("/bookings/my");
//     setBookings(res.data);

//     // Check review status for completed bookings
//     const statusMap = {};

//     for (let b of res.data) {
//       if (b.status === "completed") {
//         const r = await client.get(`/reviews/booking/${b.id}`);
//         statusMap[b.id] = r.data.exists;
//       }
//     }

//     setReviewStatus(statusMap);
//   }

//   return (
//     <div style={{ padding: 40 }}>
//       <h2>My Bookings</h2>

//       {bookings.length === 0 ? (
//         <p>No bookings yet.</p>
//       ) : (
//         bookings.map((b) => (
//           <div
//             key={b.id}
//             style={{
//               border: "1px solid gray",
//               padding: 10,
//               marginBottom: 10,
//             }}
//           >
//             <p>Booking ID: {b.id}</p>
//             <p>Status: {b.status}</p>

//             {b.status === "awaiting_user_confirmation" && (
//               <button onClick={() => confirmBooking(b.id)}>
//                 Confirm Trip Completed
//               </button>
//             )}

//             {b.status === "completed" && (
//               <>
//                 {reviewStatus[b.id] ? (
//                   <p>✅ Review Submitted</p>
//                 ) : (
//                   <button onClick={() => setReviewingId(b.id)}>
//                     Leave Review
//                   </button>
//                 )}
//               </>
//             )}
//             {reviewingId === b.id && (
//               <div style={{ marginTop: 10 }}>
//                 <h4>Submit Review</h4>

//                 <select
//                   value={rating}
//                   onChange={(e) => setRating(Number(e.target.value))}
//                 >
//                   <option value={5}>5 - Excellent</option>
//                   <option value={4}>4 - Good</option>
//                   <option value={3}>3 - Average</option>
//                   <option value={2}>2 - Poor</option>
//                   <option value={1}>1 - Bad</option>
//                 </select>

//                 <br /><br />

//                 <input
//                   placeholder="Comment"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                 />

//                 <br /><br />

//                 <button onClick={() => submitReview(b.id)}>
//                   Submit Review
//                 </button>
//               </div>
//             )}

//           </div>
//         ))
//       )}
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
  CircleX,
  Hourglass,
  IdCard,
  Hash, 
} from "lucide-react";  

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [reviewingId, setReviewingId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewStatus, setReviewStatus] = useState({});

  async function loadBookings() {
    const res = await client.get("/bookings/my");
    setBookings(res.data);

    // Check review status for completed bookings
    const statusMap = {};

    for (let b of res.data) {
      if (b.status === "completed") {
        const r = await client.get(`/reviews/booking/${b.id}`);
        statusMap[b.id] = r.data.exists;
      }
    }

    setReviewStatus(statusMap);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function confirmBooking(id) {
    await client.patch(`/bookings/user/${id}/confirm`);
    alert("Booking confirmed completed");
    loadBookings();
  }

  async function submitReview(bookingId) {
    await client.post("/reviews", {
      booking_id: bookingId,
      rating: rating,
      comment: comment,
    });

    alert("Review submitted");
    setReviewingId(null);
    setComment("");
    loadBookings();
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return { bg: "#ecfdf5", text: "#047857", border: "#d1fae5" };
      case "awaiting_user_confirmation":
        return { bg: "#fef3c7", text: "#b45309", border: "#fde68a" };
      case "pending":
        return { bg: "#dbeafe", text: "#1d4ed8", border: "#bfdbfe" };
      case "cancelled":
        return { bg: "#ffc4b2", text: "#fa3131", border: "#febfbf" };
      default:
        return { bg: "#f1f5f9", text: "#64748b", border: "#e2e8f0" };
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "awaiting_user_confirmation":
        return "Awaiting Confirmation";
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  async function cancelBooking(id) {
    await client.post(`/bookings/${id}/cancel`);
    alert("Cancelled");
    loadBookings();
  }

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
    emptyState: {
      textAlign: "center",
      padding: "64px 0",
    },
    emptyIcon: {
      width: "80px",
      height: "80px",
      margin: "0 auto 16px",
      backgroundColor: "#f1f5f9",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "40px",
      color: "#94a3b8",
    },
    emptyTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#0f172a",
      marginBottom: "8px",
    },
    emptyText: {
      color: "#64748b",
      marginBottom: "24px",
    },
    backToPackagesBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 24px",
      background: "linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontWeight: "500",
      cursor: "pointer",
      textDecoration: "none",
      transition: "all 0.3s",
    },
    bookingsList: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    bookingCard: {
      backgroundColor: "white",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      padding: "24px",
      transition: "all 0.5s",
    },
    bookingHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
      paddingBottom: "16px",
      borderBottom: "1px solid #f1f5f9",
    },
    bookingId: {
      fontSize: "14px",
      color: "#64748b",
      fontWeight: "500",
    },
    statusBadge: {
      padding: "6px 16px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "600",
      border: "1px solid",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
    },
    bookingContent: {
      marginBottom: "20px",
    },
    actionButtons: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
    },
    primaryBtn: {
      padding: "10px 20px",
      background: "linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    secondaryBtn: {
      padding: "10px 20px",
      backgroundColor: "#f1f5f9",
      color: "#334155",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    reviewedBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "10px 20px",
      backgroundColor: "#d1fae5",
      color: "#047857",
      border: "1px solid #a7f3d0",
      borderRadius: "12px",
      fontWeight: "600",
      fontSize: "14px",
    },
    reviewForm: {
      marginTop: "20px",
      padding: "24px",
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
    },
    reviewFormTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#0f172a",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      color: "#334155",
      marginBottom: "8px",
    },
    select: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "15px",
      backgroundColor: "white",
      cursor: "pointer",
      outline: "none",
      transition: "all 0.3s",
    },
    textarea: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "15px",
      backgroundColor: "white",
      outline: "none",
      transition: "all 0.3s",
      minHeight: "100px",
      resize: "vertical",
      fontFamily: "inherit",
    },
    submitBtn: {
      padding: "12px 24px",
      background: "linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s",
      fontSize: "15px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <a
            href="/packages"
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
            <h1 style={styles.headerTitle}>My Bookings</h1>
            <p style={styles.headerSubtitle}>Track and manage your travel bookings</p>
          </div>
        </div>
      </header>

      <div style={styles.main}>
        {bookings.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}><ClipboardList size={22}/></div>
            <h3 style={styles.emptyTitle}>No bookings yet</h3>
            <p style={styles.emptyText}>Start exploring packages to make your first booking</p>
            <a
              href="/packages"
              style={styles.backToPackagesBtn}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 12px rgba(79, 70, 229, 0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Browse Packages
            </a>
          </div>
        ) : (
          <div style={styles.bookingsList}>
            {bookings.map((b) => {
              const statusColor = getStatusColor(b.status);
              return (
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
                  <div style={styles.bookingHeader}>
                    <span style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        ...styles.bookingId}}>
                      <ClipboardList size={18}/> Booking ID: <strong>#{b.id}</strong>
                    </span>
                    <span
                      style={{
                        ...styles.statusBadge,
                        backgroundColor: statusColor.bg,
                        color: statusColor.text,
                        borderColor: statusColor.border,
                      }}
                    >
                      {b.status === "completed" && <CheckCircle size={18}/>}
                      {b.status === "awaiting_user_confirmation" && <Hourglass size={18}/>}
                      {b.status === "pending" && <Clock size={18}/>}
                      {b.status === "cancelled" && <CircleX size={18}/>}
                      {getStatusLabel(b.status)}
                    </span>
                  </div>

                  <div style={styles.bookingContent}>
                    {/* Action Buttons */}
                    <div style={styles.actionButtons}>
                      {b.status === "awaiting_user_confirmation" && (
                        <button
                          onClick={() => confirmBooking(b.id)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            ...styles.primaryBtn}}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow = "0 8px 12px rgba(79, 70, 229, 0.3)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <CheckCircle size={16}/> Confirm Trip Completed
                        </button>
                      )}
                      {b.status !== "cancelled" && b.status !== "completed" && (
                        <button onClick={() => cancelBooking(b.id)}
                                style={styles.primaryBtn}>
                          Cancel Booking
                        </button>
                      )}

                      {b.status === "completed" && (
                        <>
                          {reviewStatus[b.id] ? (
                            <span style={styles.reviewedBadge}>
                              ✓ Review Submitted
                            </span>
                          ) : (
                            <button
                              onClick={() => setReviewingId(b.id)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                ...styles.secondaryBtn}}
                              onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = "#e2e8f0";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = "#f1f5f9";
                              }}
                            >
                              <Star size={18}/> Leave Review
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Review Form */}
                  {reviewingId === b.id && (
                    <div style={styles.reviewForm}>
                      <h4 style={styles.reviewFormTitle}>
                        <Star size={20}/>
                        <span>Submit Your Review</span>
                      </h4>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Rating</label>
                        <select
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                          style={styles.select}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#4f46e5";
                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79, 70, 229, 0.1)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#e2e8f0";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ (5 - Excellent)</option>
                          <option value={4}>⭐⭐⭐⭐ (4 - Good)</option>
                          <option value={3}>⭐⭐⭐ (3 - Average)</option>
                          <option value={2}>⭐⭐ (2 - Poor)</option>
                          <option value={1}>⭐ (1 - Bad)</option>
                        </select>
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Comment</label>
                        <textarea
                          placeholder="Share your experience..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          style={styles.textarea}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#4f46e5";
                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79, 70, 229, 0.1)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#e2e8f0";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      <button
                        onClick={() => submitReview(b.id)}
                        style={styles.submitBtn}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow = "0 8px 12px rgba(79, 70, 229, 0.3)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        Submit Review
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}