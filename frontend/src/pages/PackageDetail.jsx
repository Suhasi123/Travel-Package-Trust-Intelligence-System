// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import client from "../api/client";

// export default function PackageDetail() {
//   const { id } = useParams();

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     client.get(`/packages/detail/${id}`)
//       .then(res => {
//         setData(res.data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   if (loading)
//     return <div className="p-10 text-center">Loading package...</div>;

//   if (!data)
//     return <div className="p-10 text-center">Package not found</div>;

//   const { package: pkg, company, reviews } = data;

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-10">

//       {/* HERO */}
//       <div className="bg-white shadow rounded-2xl p-8 flex justify-between">
//         <div>
//           <h1 className="text-3xl font-bold mb-2">
//             {pkg.destination}
//           </h1>

//           <p className="text-gray-500">
//             {pkg.duration} days • ₹{pkg.price}
//           </p>

//           <p className="mt-4 text-gray-700">
//             {pkg.inclusions}
//           </p>
//         </div>

//         <button
//           onClick={() =>
//             client.post("/bookings", { package_id: pkg.id })
//           }
//           className="h-fit bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700"
//         >
//           Book Now
//         </button>
//       </div>

//       {/* COMPANY */}
//       <div className="bg-white shadow rounded-xl p-6">
//         <h2 className="text-xl font-semibold mb-3">
//           Company
//         </h2>

//         <div className="flex justify-between">
//           <div>
//             <div className="font-bold">{company.name}</div>

//             <div className="text-sm text-gray-500">
//               {company.verified
//                 ? "Verified Provider"
//                 : "Pending Verification"}
//             </div>
//           </div>

//           <div className="text-lg font-semibold">
//             Trust Score: {data.trust_score ?? "N/A"}
//           </div>
//         </div>
//       </div>

//       {/* REVIEWS */}
//       <div className="bg-white shadow rounded-xl p-6">
//         <h2 className="text-xl font-semibold mb-4">
//           Reviews
//         </h2>

//         {reviews.length === 0 && (
//           <div className="text-gray-400">
//             No reviews yet
//           </div>
//         )}

//         <div className="space-y-4">
//           {reviews.map(r => (
//             <div
//               key={r.id}
//               className="border rounded-lg p-4"
//             >
//               <div className="font-semibold">
//                 Rating: {r.rating}/5
//               </div>

//               <div className="text-gray-600">
//                 {r.comment}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Wallet,
} from "lucide-react"; 

export default function PackageDetail() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get(`/packages/detail/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const getTrustScoreColor = (score) => {
    if (score === null || score === undefined || score === "N/A") 
      return { bg: "#f1f5f9", text: "#64748b", border: "#e2e8f0" };
    const numScore = parseFloat(score);
    if (numScore >= 80) return { bg: "#ecfdf5", text: "#047857", border: "#d1fae5" };
    if (numScore >= 60) return { bg: "#eff6ff", text: "#1d4ed8", border: "#dbeafe" };
    if (numScore >= 40) return { bg: "#fffbeb", text: "#b45309", border: "#fef3c7" };
    return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" };
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
    main: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "32px 24px",
    },
    loadingContainer: {
      textAlign: "center",
      padding: "64px 0",
    },
    loadingIcon: {
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
    loadingText: {
      fontSize: "18px",
      color: "#64748b",
    },
    heroCard: {
      backgroundColor: "white",
      borderRadius: "20px",
      border: "1px solid #e2e8f0",
      padding: "40px",
      marginBottom: "24px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    },
    heroContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "32px",
      flexWrap: "wrap",
    },
    heroLeft: {
      flex: 1,
      minWidth: "300px",
    },
    destination: {
      fontSize: "36px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "12px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    priceRow: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      marginBottom: "24px",
    },
    priceDetail: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "18px",
      color: "#64748b",
      fontWeight: "500",
    },
    priceAmount: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#4f46e5",
    },
    inclusionsLabel: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#64748b",
      marginBottom: "8px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    inclusionsText: {
      fontSize: "16px",
      color: "#334155",
      lineHeight: "1.6",
    },
    bookBtn: {
      padding: "16px 32px",
      background: "linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%)",
      color: "white",
      border: "none",
      borderRadius: "16px",
      fontWeight: "600",
      fontSize: "16px",
      cursor: "pointer",
      transition: "all 0.3s",
      whiteSpace: "nowrap",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      padding: "32px",
      marginBottom: "24px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    cardTitle: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    companyHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "24px",
      flexWrap: "wrap",
    },
    companyInfo: {
      flex: 1,
    },
    companyName: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "6px",
    },
    verifiedBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "600",
      border: "1px solid",
    },
    verifiedYes: {
      backgroundColor: "#d1fae5",
      color: "#047857",
      borderColor: "#a7f3d0",
    },
    verifiedNo: {
      backgroundColor: "#fee2e2",
      color: "#dc2626",
      borderColor: "#fecaca",
    },
    trustScoreBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 24px",
      borderRadius: "16px",
      fontSize: "18px",
      fontWeight: "700",
      border: "2px solid",
    },
    reviewsEmpty: {
      textAlign: "center",
      padding: "48px 0",
      color: "#94a3b8",
      fontSize: "15px",
    },
    reviewsList: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    reviewCard: {
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      padding: "20px",
      transition: "all 0.3s",
    },
    reviewHeader: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "12px",
    },
    ratingBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 12px",
      backgroundColor: "#fef3c7",
      color: "#b45309",
      borderRadius: "12px",
      fontSize: "14px",
      fontWeight: "700",
      border: "1px solid #fde68a",
    },
    reviewComment: {
      fontSize: "15px",
      color: "#334155",
      lineHeight: "1.6",
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
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
            <h1 style={styles.headerTitle}>Package Details</h1>
          </div>
        </header>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingIcon}><Package size={18}/></div>
          <p style={styles.loadingText}>Loading package...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={styles.container}>
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
            <h1 style={styles.headerTitle}>Package Details</h1>
          </div>
        </header>
        <div style={styles.loadingContainer}>
          <div style={styles.loadingIcon}><CircleX size={18}/></div>
          <p style={styles.loadingText}>Package not found</p>
        </div>
      </div>
    );
  }

  const { package: pkg, company, reviews } = data;
  const trustColor = getTrustScoreColor(data.trust_score);

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
          <h1 style={styles.headerTitle}>Package Details</h1>
        </div>
      </header>

      <div style={styles.main}>
        {/* Hero Section */}
        <div style={styles.heroCard}>
          <div style={styles.heroContent}>
            <div style={styles.heroLeft}>
              <h1 style={styles.destination}>
                <MapPin size={35}/>
                <span>{pkg.destination}</span>
              </h1>

              <div style={styles.priceRow}>
                <div style={styles.priceDetail}>
                  <Calendar size={18}/>
                  <span>{pkg.duration} days</span>
                </div>
                <div style={{ ...styles.priceDetail, ...styles.priceAmount }}>
                  <Wallet size={26}/>
                  <span>₹{pkg.price}</span>
                </div>
              </div>

              <div>
                <div style={styles.inclusionsLabel}>What's Included</div>
                <p style={styles.inclusionsText}>{pkg.inclusions}</p>
              </div>
            </div>

            <button
                onClick={async () => {
                    await client.post("/bookings", { package_id: pkg.id });
                    alert("Booking created (pending)");
                }}
              style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        ...styles.bookBtn}}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(79, 70, 229, 0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <CheckCircle size={18}/> Book Now
            </button>
          </div>
        </div>

        {/* Company Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <Building2 size={24}/>
            <span>Company Information</span>
          </h2>

          <div style={styles.companyHeader}>
            <div style={styles.companyInfo}>
              <div style={styles.companyName}>{company.name}</div>
              <span
                style={
                  company.verified
                    ? { ...styles.verifiedBadge, ...styles.verifiedYes }
                    : { ...styles.verifiedBadge, ...styles.verifiedNo }
                }
              >
                {company.verified ? "✓ Verified Provider" : <><Hourglass size={18}/>Pending Verification</>}
              </span>
            </div>

            <div
              style={{
                ...styles.trustScoreBadge,
                backgroundColor: trustColor.bg,
                color: trustColor.text,
                borderColor: trustColor.border,
              }}
            >
              <ShieldCheck size={20}/>
              <span>Trust Score: {data.trust_score ?? "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <Star size={24}/>
            <span>Reviews ({reviews.length})</span>
          </h2>

          {reviews.length === 0 ? (
            <div style={styles.reviewsEmpty}>
              No reviews yet. Be the first to review this package!
            </div>
          ) : (
            <div style={styles.reviewsList}>
              {reviews.map(r => (
                <div
                  key={r.id}
                  style={styles.reviewCard}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#f1f5f9";
                    e.currentTarget.style.borderColor = "#cbd5e1";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8fafc";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  <div style={styles.reviewHeader}>
                    <span style={styles.ratingBadge}>
                      ⭐ {r.rating}/5
                    </span>
                  </div>
                  <p style={styles.reviewComment}>{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}