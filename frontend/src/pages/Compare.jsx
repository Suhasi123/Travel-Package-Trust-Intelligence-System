// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import client from "../api/client";

// export default function Compare() {
//   const [searchParams] = useSearchParams();
//   const [packages, setPackages] = useState([]);

//   useEffect(() => {
//     async function fetchComparison() {
//       const idsParam = searchParams.get("ids");
//       if (!idsParam) return;

//       const ids = idsParam.split(",");

//       const results = [];

//       for (let id of ids) {
//         try {
//           const pkgRes = await client.get(`/packages/${id}`);
//           const pkg = pkgRes.data;

//           let trustScore = "N/A";

//           try {
//             const trustRes = await client.get(
//               `/trust/companies/${pkg.company_id}/trust-score`
//             );
//             trustScore = trustRes.data.trust_score + "%";
//           } catch {
//             trustScore = "Not Available";
//           }

//           results.push({
//             ...pkg,
//             trust_score: trustScore,
//           });
//         } catch {
//           console.log("Invalid package ID:", id);
//         }
//       }

//       setPackages(results);
//     }

//     fetchComparison();
//   }, [searchParams]);

//   return (
//     <div style={{ padding: 40 }}>
//       <h2>Package Comparison</h2>

//       {packages.length === 0 ? (
//         <p>No packages selected.</p>
//       ) : (
//         <table border="1" cellPadding="10">
//           <thead>
//             <tr>
//               <th>Destination</th>
//               <th>Price</th>
//               <th>Duration</th>
//               <th>Trust Score</th>
//             </tr>
//           </thead>

//           <tbody>
//             {packages.map((p) => (
//               <tr key={p.id}>
//                 <td>{p.destination}</td>
//                 <td>₹{p.price}</td>
//                 <td>{p.duration} days</td>
//                 <td>{p.trust_score}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

export default function Compare() {
  const [searchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function fetchComparison() {
      const idsParam = searchParams.get("ids");
      if (!idsParam) return;

      const ids = idsParam.split(",");

      const results = [];

      for (let id of ids) {
        try {
          const pkgRes = await client.get(`/packages/${id}`);
          const pkg = pkgRes.data;

          let trustScore = "N/A";

          try {
            const trustRes = await client.get(
              `/trust/companies/${pkg.company_id}/trust-score`
            );
            trustScore = trustRes.data.trust_score + "%";
          } catch {
            trustScore = "Not Available";
          }

          results.push({
            ...pkg,
            trust_score: trustScore,
          });
        } catch {
          console.log("Invalid package ID:", id);
        }
      }

      setPackages(results);
    }

    fetchComparison();
  }, [searchParams]);

  const getTrustScoreColor = (score) => {
    if (score === "N/A" || score === "Not Available") {
      return { bg: "#f1f5f9", text: "#64748b", border: "#e2e8f0" };
    }
    const numScore = parseFloat(score);
    if (numScore >= 80) return { bg: "#ecfdf5", text: "#047857", border: "#d1fae5" };
    if (numScore >= 60) return { bg: "#eff6ff", text: "#1d4ed8", border: "#dbeafe" };
    if (numScore >= 40) return { bg: "#fffbeb", text: "#b45309", border: "#fef3c7" };
    return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" };
  };

  const getWinner = (field) => {
    if (packages.length === 0) return null;
    
    if (field === "price") {
      const minPrice = Math.min(...packages.map(p => p.price));
      return packages.findIndex(p => p.price === minPrice);
    }
    
    if (field === "duration") {
      const maxDuration = Math.max(...packages.map(p => p.duration));
      return packages.findIndex(p => p.duration === maxDuration);
    }
    
    if (field === "trust") {
      const scores = packages.map(p => {
        if (p.trust_score === "N/A" || p.trust_score === "Not Available") return 0;
        return parseFloat(p.trust_score);
      });
      const maxScore = Math.max(...scores);
      return scores.findIndex(s => s === maxScore);
    }
    
    return null;
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
    tableContainer: {
      backgroundColor: "white",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      marginBottom: "24px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    thead: {
      background: "linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%)",
      borderBottom: "1px solid #e2e8f0",
    },
    th: {
      padding: "16px 24px",
      textAlign: "left",
      fontSize: "12px",
      fontWeight: "600",
      color: "#334155",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    thPackage: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    packageNumber: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "24px",
      height: "24px",
      background: "#4f46e5",
      color: "white",
      fontSize: "12px",
      fontWeight: "700",
      borderRadius: "50%",
    },
    tr: {
      borderBottom: "1px solid #f1f5f9",
      transition: "background-color 0.3s",
    },
    td: {
      padding: "20px 24px",
    },
    featureCell: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    featureIcon: {
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      fontSize: "18px",
    },
    featureLabel: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#0f172a",
    },
    valueText: {
      fontSize: "15px",
      fontWeight: "500",
      color: "#0f172a",
    },
    winnerBadge: {
      display: "inline-flex",
      alignItems: "center",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      marginLeft: "8px",
    },
    trustBadge: {
      display: "inline-flex",
      alignItems: "center",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "700",
      border: "1px solid",
    },
    cardsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      padding: "24px",
      transition: "all 0.5s",
    },
    cardHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "16px",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    cardDetailsGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginBottom: "20px",
    },
    cardDetailRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cardDetailLabel: {
      fontSize: "14px",
      color: "#64748b",
    },
    cardDetailValue: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#0f172a",
    },
    viewDetailsBtn: {
      width: "100%",
      padding: "10px 16px",
      background: "linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontWeight: "500",
      cursor: "pointer",
      textDecoration: "none",
      textAlign: "center",
      display: "block",
      transition: "all 0.3s",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.headerLeft}>
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
              <h1 style={styles.headerTitle}>Package Comparison</h1>
              <p style={styles.headerSubtitle}>
                Compare {packages.length} {packages.length === 1 ? 'package' : 'packages'} side by side
              </p>
            </div>
          </div>
        </div>
      </header>

      <div style={styles.main}>
        {packages.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}><Package size={22}/></div>
            <h3 style={styles.emptyTitle}>No packages selected</h3>
            <p style={styles.emptyText}>Select packages from the listing page to compare</p>
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
              ← Back to Packages
            </a>
          </div>
        ) : (
          <>
            {/* Comparison Table */}
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead style={styles.thead}>
                  <tr>
                    <th style={styles.th}>Feature</th>
                    {packages.map((p, index) => (
                      <th key={p.id} style={styles.th}>
                        <div style={styles.thPackage}>
                          <span style={styles.packageNumber}>{index + 1}</span>
                          <span>Package {index + 1}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Destination Row */}
                  <tr
                    style={styles.tr}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td style={styles.td}>
                      <div style={styles.featureCell}>
                        <div style={{ ...styles.featureIcon, backgroundColor: "#eef2ff" }}>
                          <MapPin size={18}/>
                        </div>
                        <span style={styles.featureLabel}>Destination</span>
                      </div>
                    </td>
                    {packages.map((p) => (
                      <td key={p.id} style={styles.td}>
                        <span style={styles.valueText}>{p.destination}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Price Row */}
                  <tr
                    style={styles.tr}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td style={styles.td}>
                      <div style={styles.featureCell}>
                        <div style={{ ...styles.featureIcon, backgroundColor: "#ecfdf5" }}>
                          <IndianRupee size={18}/>
                        </div>
                        <span style={styles.featureLabel}>Price</span>
                      </div>
                    </td>
                    {packages.map((p, index) => {
                      const isWinner = getWinner("price") === index;
                      return (
                        <td key={p.id} style={styles.td}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ ...styles.valueText, color: isWinner ? "#047857" : "#0f172a", fontWeight: isWinner ? "700" : "500" }}>
                              ₹{p.price}
                            </span>
                            {isWinner && (
                              <span style={{ ...styles.winnerBadge, backgroundColor: "#d1fae5", color: "#047857" }}>
                                Best Price
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Duration Row */}
                  <tr
                    style={styles.tr}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td style={styles.td}>
                      <div style={styles.featureCell}>
                        <div style={{ ...styles.featureIcon, backgroundColor: "#dbeafe" }}>
                          <Calendar size={18}/>
                        </div>
                        <span style={styles.featureLabel}>Duration</span>
                      </div>
                    </td>
                    {packages.map((p, index) => {
                      const isWinner = getWinner("duration") === index;
                      return (
                        <td key={p.id} style={styles.td}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ ...styles.valueText, color: isWinner ? "#1d4ed8" : "#0f172a", fontWeight: isWinner ? "700" : "500" }}>
                              {p.duration} days
                            </span>
                            {isWinner && (
                              <span style={{ ...styles.winnerBadge, backgroundColor: "#dbeafe", color: "#1d4ed8" }}>
                                Longest
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Trust Score Row */}
                  <tr
                    style={styles.tr}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td style={styles.td}>
                      <div style={styles.featureCell}>
                        <div style={{ ...styles.featureIcon, backgroundColor: "#f5f3ff" }}>
                          <ShieldCheck size={18}/>
                        </div>
                        <span style={styles.featureLabel}>Trust Score</span>
                      </div>
                    </td>
                    {packages.map((p, index) => {
                      const isWinner = getWinner("trust") === index;
                      const trustColor = getTrustScoreColor(p.trust_score);
                      return (
                        <td key={p.id} style={styles.td}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span
                              style={{
                                ...styles.trustBadge,
                                backgroundColor: trustColor.bg,
                                color: trustColor.text,
                                borderColor: trustColor.border,
                              }}
                            >
                              {p.trust_score}
                            </span>
                            {isWinner && p.trust_score !== "N/A" && p.trust_score !== "Not Available" && (
                              <span style={{ ...styles.winnerBadge, backgroundColor: "#f3e8ff", color: "#7c3aed" }}>
                                Highest
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Quick Summary Cards */}
            {/* <div style={styles.cardsGrid}>
              {packages.map((p, index) => {
                const trustColor = getTrustScoreColor(p.trust_score);
                return (
                  <div
                    key={p.id}
                    style={styles.card}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "#c7d2fe";
                      e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(79, 70, 229, 0.1)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={styles.cardHeader}>
                      <span style={styles.packageNumber}>{index + 1}</span>
                      <span
                        style={{
                          ...styles.trustBadge,
                          backgroundColor: trustColor.bg,
                          color: trustColor.text,
                          borderColor: trustColor.border,
                        }}
                      >
                        🛡️ {p.trust_score}
                      </span>
                    </div>
                    <h3 style={styles.cardTitle}>📍 {p.destination}</h3>
                    <div style={styles.cardDetailsGrid}>
                      <div style={styles.cardDetailRow}>
                        <span style={styles.cardDetailLabel}>Price</span>
                        <span style={styles.cardDetailValue}>₹{p.price}</span>
                      </div>
                      <div style={styles.cardDetailRow}>
                        <span style={styles.cardDetailLabel}>Duration</span>
                        <span style={styles.cardDetailValue}>{p.duration} days</span>
                      </div>
                    </div>
                    <a
                      href={`/packages/${p.id}`}
                      style={styles.viewDetailsBtn}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow = "0 8px 12px rgba(79, 70, 229, 0.3)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      View Details
                    </a>
                  </div>
                );
              })}
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}