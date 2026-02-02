// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import client from "../api/client";

// export default function Company() {
//   const { id } = useParams();
//   const [company, setCompany] = useState(null);
//   const [score, setScore] = useState(null);
//   const [explain, setExplain] = useState(null);

//   // useEffect(() => {
//   //   async function fetchCompany() {
//   //     const res = await client.get(`/companies/${id}`);
//   //     setCompany(res.data);

//   //     const scoreRes = await client.get(
//   //       `/trust/companies/${id}/trust-score`
//   //     );
//   //     setScore(scoreRes.data.trust_score);
//   //   }

//   //   fetchCompany();
//   // }, [id]);

//   // useEffect(() => {
//   //     if (!company) return;

//   //     async function loadExplain() {
//   //       const res = await client.get(
//   //         `/trust/companies/${id}/trust-explain`
//   //       );
//   //       setExplain(res.data);
//   //     }

//   //     loadExplain();
//   //   }, [company]);

//   useEffect(() => {
//     async function fetchAll() {
//       try {
//         const companyRes = await client.get(`/companies/${id}`);
//         setCompany(companyRes.data);

//         const scoreRes = await client.get(`/trust/companies/${id}/trust-score`);
//         setScore(scoreRes.data.trust_score);

//         const explainRes = await client.get(`/trust/companies/${id}/trust-explain`);
//         setExplain(explainRes.data);

//       } catch (err) {
//         console.log("Error loading company trust info", err);
//       }
//     }

//     fetchAll();
//   }, [id]);

//   if (!company) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: 40 }}>
//       <h2>{company.name}</h2>
//       <p>{company.description}</p>
//       <p>Verified: {company.verified_status ? "Yes" : "No"}</p>

//       <h3>
//         Trust Score: {score !== null ? `${score}%` : "Loading..."}
//       </h3>

//       {explain && (
//           <div>
//             <h3>Why this Trust Score?</h3>

//             <p>Score: {explain.trust_score}%</p>

//             <ul>
//               {Object.entries(explain.signals).map(([k, v]) => (
//                 <li key={k}>{v}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";

export default function Company() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [score, setScore] = useState(null);
  const [explain, setExplain] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const companyRes = await client.get(`/companies/${id}`);
        setCompany(companyRes.data);

        const scoreRes = await client.get(`/trust/companies/${id}/trust-score`);
        setScore(scoreRes.data.trust_score);

        const explainRes = await client.get(`/trust/companies/${id}/trust-explain`);
        setExplain(explainRes.data);

      } catch (err) {
        console.log("Error loading company trust info", err);
      }
    }

    fetchAll();
  }, [id]);

  const getTrustScoreColor = (scoreValue) => {
    if (scoreValue === null) return { bg: "#f1f5f9", text: "#64748b", border: "#e2e8f0" };
    if (scoreValue >= 80) return { bg: "#ecfdf5", text: "#047857", border: "#d1fae5" };
    if (scoreValue >= 60) return { bg: "#eff6ff", text: "#1d4ed8", border: "#dbeafe" };
    if (scoreValue >= 40) return { bg: "#fffbeb", text: "#b45309", border: "#fef3c7" };
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
    loadingState: {
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
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "24px",
    },
    gridTwoCol: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "24px",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      padding: "32px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    companyName: {
      fontSize: "32px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "8px",
    },
    description: {
      fontSize: "16px",
      color: "#64748b",
      lineHeight: "1.6",
      marginBottom: "24px",
    },
    verifiedBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "8px 16px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "600",
    },
    verifiedYes: {
      backgroundColor: "#d1fae5",
      color: "#047857",
      border: "1px solid #a7f3d0",
    },
    verifiedNo: {
      backgroundColor: "#fee2e2",
      color: "#dc2626",
      border: "1px solid #fecaca",
    },
    trustScoreContainer: {
      textAlign: "center",
      padding: "32px",
    },
    trustScoreLarge: {
      fontSize: "72px",
      fontWeight: "700",
      marginBottom: "8px",
    },
    trustScoreLabel: {
      fontSize: "16px",
      color: "#64748b",
      fontWeight: "500",
    },
    trustBadgeLarge: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "140px",
      height: "140px",
      borderRadius: "50%",
      fontSize: "48px",
      fontWeight: "700",
      border: "4px solid",
      marginBottom: "16px",
    },
    explainSection: {
      marginTop: "24px",
    },
    explainTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#0f172a",
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    explainScore: {
      fontSize: "20px",
      fontWeight: "700",
      marginBottom: "20px",
      padding: "16px",
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      textAlign: "center",
    },
    signalsList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    signalItem: {
      padding: "16px",
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      marginBottom: "12px",
      fontSize: "15px",
      color: "#334155",
      lineHeight: "1.5",
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      transition: "all 0.3s",
    },
    signalIcon: {
      fontSize: "20px",
      flexShrink: 0,
      marginTop: "2px",
    },
  };

  if (!company) {
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
            <div>
              <h1 style={styles.headerTitle}>Company Profile</h1>
            </div>
          </div>
        </header>
        <div style={styles.main}>
          <div style={styles.loadingState}>
            <div style={styles.loadingIcon}>🏢</div>
            <p style={styles.loadingText}>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const trustColor = getTrustScoreColor(score);

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
            <h1 style={styles.headerTitle}>Company Profile</h1>
            <p style={styles.headerSubtitle}>Verified trust and company information</p>
          </div>
        </div>
      </header>

      <div style={styles.main}>
        {/* Company Info & Trust Score Grid */}
        <div style={{ ...styles.gridTwoCol, marginBottom: "24px" }}>
          {/* Company Information Card */}
          <div style={styles.card}>
            <h2 style={styles.companyName}>🏢 {company.name}</h2>
            <p style={styles.description}>{company.description}</p>
            
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#64748b" }}>
                Verification Status:
              </span>
              <span
                style={
                  company.verified_status
                    ? { ...styles.verifiedBadge, ...styles.verifiedYes }
                    : { ...styles.verifiedBadge, ...styles.verifiedNo }
                }
              >
                {company.verified_status ? "✓ Verified" : "✗ Not Verified"}
              </span>
            </div>
          </div>

          {/* Trust Score Card */}
          <div style={styles.card}>
            <div style={styles.trustScoreContainer}>
              <div
                style={{
                  ...styles.trustBadgeLarge,
                  backgroundColor: trustColor.bg,
                  color: trustColor.text,
                  borderColor: trustColor.border,
                }}
              >
                {score !== null ? score : "..."}
              </div>
              <div style={{ ...styles.trustScoreLarge, color: trustColor.text }}>
                {score !== null ? `${score}%` : "Loading..."}
              </div>
              <div style={styles.trustScoreLabel}>Trust Score</div>
            </div>
          </div>
        </div>

        {/* Trust Explanation Card */}
        {explain && (
          <div style={styles.card}>
            <h3 style={styles.explainTitle}>
              <span>💡</span>
              <span>Why this Trust Score?</span>
            </h3>

            <div style={styles.explainScore}>
              Overall Trust Score: <span style={{ color: trustColor.text }}>{explain.trust_score}%</span>
            </div>

            <ul style={styles.signalsList}>
              {Object.entries(explain.signals).map(([k, v]) => (
                <li
                  key={k}
                  style={styles.signalItem}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#f1f5f9";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8fafc";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <span style={styles.signalIcon}>✓</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .grid-two-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}