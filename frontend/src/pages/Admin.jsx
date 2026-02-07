// import { useEffect, useState } from "react";
// import client from "../api/client";

// export default function Admin() {
//   const [data, setData] = useState([]);

//   async function fetchDashboard() {
//     const res = await client.get("/admin/dashboard");
//     setData(res.data);
//   }

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   async function approveDoc(docId) {
//     await client.patch(`/admin/approve-document/${docId}`);
//     fetchDashboard();
//   }

//   async function verifyCompany(companyId) {
//     await client.patch(`/admin/verify-company/${companyId}`);
//     fetchDashboard();
//   }

//   async function approvePackage(pkgId) {
//     await client.patch(`/admin/approve-package/${pkgId}`);
//     fetchDashboard();
//   }

//   return (
//     <div style={{ padding: 40 }}>
//       <h2>Admin Dashboard</h2>
//       <a href="/audit-logs">Audit Logs</a>
//       <br></br><br></br>
//       {data.map((entry) => (
//         <div
//           key={entry.company.id}
//           style={{
//             border: "2px solid black",
//             padding: 20,
//             marginBottom: 20,
//           }}
//         >
//           <h3>{entry.company.name}</h3>
//           <p>{entry.company.description}</p>
//           <p>
//             Verified:{" "}
//             {entry.company.verified_status ? "Yes" : "No"}
//           </p>

//           {/* Documents */}
//           <h4>Documents</h4>
//           {entry.documents.map((doc) => (
//             <div key={doc.id}>
//               {doc.doc_type} — Status: {doc.status}
//               {doc.status === "pending" && (
//                 <button onClick={() => approveDoc(doc.id)}>
//                   Approve Doc
//                 </button>
//               )}
//             </div>
//           ))}

//           {/* Verify Company */}
//           {!entry.company.verified_status && (
//             <button onClick={() => verifyCompany(entry.company.id)}>
//               Verify Company
//             </button>
//           )}

//           <hr />

//           {/* Packages */}
//           <h4>Pending Packages</h4>
//           {entry.pending_packages.map((pkg) => (
//             <div key={pkg.id}>
//               {pkg.destination} — ₹{pkg.price}
//               <button onClick={() => approvePackage(pkg.id)}>
//                 Approve Package
//               </button>
//             </div>
//           ))}
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

export default function Admin() {
  const [data, setData] = useState([]);

  async function fetchDashboard() {
    const res = await client.get("/admin/dashboard");
    setData(res.data);
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function approveDoc(docId) {
    await client.patch(`/admin/approve-document/${docId}`);
    fetchDashboard();
  }

  async function verifyCompany(companyId) {
    await client.patch(`/admin/verify-company/${companyId}`);
    fetchDashboard();
  }

  async function approvePackage(pkgId) {
    await client.patch(`/admin/approve-package/${pkgId}`);
    fetchDashboard();
  }

  const getDocStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return { bg: "#ecfdf5", text: "#047857", border: "#d1fae5" };
      case "pending":
        return { bg: "#fef3c7", text: "#b45309", border: "#fde68a" };
      case "rejected":
        return { bg: "#fee2e2", text: "#dc2626", border: "#fecaca" };
      default:
        return { bg: "#f1f5f9", text: "#64748b", border: "#e2e8f0" };
    }
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
    auditLink: {
      padding: "8px 16px",
      backgroundColor: "white",
      border: "1px solid #e2e8f0",
      color: "#334155",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      textDecoration: "none",
      transition: "all 0.3s",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    main: {
      maxWidth: "1600px",
      margin: "0 auto",
      padding: "32px 24px",
    },
    companyGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    companyCard: {
      backgroundColor: "white",
      borderRadius: "16px",
      border: "2px solid #e2e8f0",
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      transition: "all 0.3s",
    },
    companyHeader: {
      padding: "24px",
      borderBottom: "1px solid #f1f5f9",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "16px",
    },
    companyInfo: {
      flex: 1,
    },
    companyName: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "8px",
    },
    companyDescription: {
      fontSize: "15px",
      color: "#64748b",
      lineHeight: "1.5",
      marginBottom: "12px",
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
    verifyBtn: {
      padding: "10px 20px",
      background: "linear-gradient(90deg, #047857 0%, #059669 100%)",
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
    section: {
      padding: "24px",
      borderBottom: "1px solid #f1f5f9",
    },
    sectionLast: {
      borderBottom: "none",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#0f172a",
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    documentsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "12px",
    },
    documentCard: {
      padding: "16px",
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
    },
    documentInfo: {
      flex: 1,
    },
    documentType: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#0f172a",
      marginBottom: "6px",
    },
    statusBadge: {
      padding: "4px 10px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "600",
      border: "1px solid",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    approveBtn: {
      padding: "8px 16px",
      background: "linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s",
      fontSize: "13px",
      whiteSpace: "nowrap",
    },
    packagesGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    packageCard: {
      padding: "16px",
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      flexWrap: "wrap",
    },
    packageInfo: {
      flex: 1,
      minWidth: "200px",
    },
    packageDestination: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "4px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    packagePrice: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#4f46e5",
    },
    emptyState: {
      textAlign: "center",
      padding: "32px",
      color: "#94a3b8",
      fontSize: "14px",
      fontStyle: "italic",
    },
  };

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
              <h1 style={styles.headerTitle}>Admin Dashboard</h1>
              <p style={styles.headerSubtitle}>Manage companies, documents, and packages</p>
            </div>
          </div>
          <a
            href="/audit-logs"
            style={styles.auditLink}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#c7d2fe";
              e.currentTarget.style.color = "#4f46e5";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.color = "#334155";
            }}
          >
            <BarChart3 size={18} className="mr-2" />
            <span>Audit Logs</span>
          </a>
        </div>
      </header>

      <div style={styles.main}>
        <div style={styles.companyGrid}>
          {data.map((entry) => (
            <div
              key={entry.company.id}
              style={styles.companyCard}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#c7d2fe";
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(79, 70, 229, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
              }}
            >
              {/* Company Header */}
              <div style={styles.companyHeader}>
                <div style={styles.companyInfo}>
                  <h3 style={styles.companyName}> <Building2 size={20}/> {entry.company.name}</h3>
                  <p style={styles.companyDescription}>{entry.company.description}</p>
                  <span
                    style={
                      entry.company.verified_status
                        ? { ...styles.verifiedBadge, ...styles.verifiedYes }
                        : { ...styles.verifiedBadge, ...styles.verifiedNo }
                    }
                  > 
                    {entry.company.verified_status ? (
                      <span><CheckCircle size={16}/> Verified</span>
                    ) : (
                      <span><Clock size={16}/> Pending</span>
                    )}
                  </span>
                </div>

                {!entry.company.verified_status && (
                  <button
                    onClick={() => verifyCompany(entry.company.id)}
                    style={styles.verifyBtn}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 8px 12px rgba(5, 150, 105, 0.3)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span><CheckCircle size={16}/></span>
                    <span>Verify Company</span>
                  </button>
                )}
              </div>

              {/* Documents Section */}
              <div style={styles.section}>
                <h4 style={styles.sectionTitle}>
                  <FileText size={18}/>
                  <span>Documents</span>
                </h4>
                {entry.documents.length === 0 ? (
                  <div style={styles.emptyState}>No documents uploaded</div>
                ) : (
                  <div style={styles.documentsGrid}>
                    {entry.documents.map((doc) => {
                      const statusColor = getDocStatusColor(doc.status);
                      return (
                        <div key={doc.id} style={styles.documentCard}>
                          <div style={styles.documentInfo}>
                            <div style={styles.documentType}>{doc.doc_type}</div>
                            <span
                              style={{
                                ...styles.statusBadge,
                                backgroundColor: statusColor.bg,
                                color: statusColor.text,
                                borderColor: statusColor.border,
                              }}
                            >
                              {doc.status}
                            </span>
                          </div>
                          {doc.status === "pending" && (
                            <button
                              onClick={() => approveDoc(doc.id)}
                              style={styles.approveBtn}
                              onMouseOver={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                                e.currentTarget.style.boxShadow = "0 6px 10px rgba(79, 70, 229, 0.3)";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.boxShadow = "none";
                              }}
                            >
                              <CheckCircle size={16}/> Approve
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Packages Section */}
              <div style={{ ...styles.section, ...styles.sectionLast }}>
                <h4 style={styles.sectionTitle}>
                  <Package size={18}/>
                  <span>Pending Packages</span>
                </h4>
                {entry.pending_packages.length === 0 ? (
                  <div style={styles.emptyState}>No pending packages</div>
                ) : (
                  <div style={styles.packagesGrid}>
                    {entry.pending_packages.map((pkg) => (
                      <div key={pkg.id} style={styles.packageCard}>
                        <div style={styles.packageInfo}>
                          <div style={styles.packageDestination}>
                            <MapPin size={18}/>
                            <span>{pkg.destination}</span>
                          </div>
                          <div style={styles.packagePrice}>₹{pkg.price}</div>
                        </div>
                        <button
                          onClick={() => approvePackage(pkg.id)}
                          style={styles.approveBtn}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow = "0 6px 10px rgba(79, 70, 229, 0.3)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <CheckCircle size={16}/> Approve Package
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}