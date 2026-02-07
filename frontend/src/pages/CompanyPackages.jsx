// import { useEffect, useState } from "react";
// import client from "../api/client";


// export default function CompanyPackages(){
//     const [company, setCompany] = useState(null);
//     const [myPackages, setMyPackages] = useState([]);
//     const [destination, setDestination] = useState("");
//     const [price, setPrice] = useState("");
//     const [duration, setDuration] = useState("");
//     const [inclusions, setInclusions] = useState("");

//     async function loadCompany(){
//         const res = await client.get("/companies/me");

//         if (res.data.exists){
//             setCompany(res.data.company);

//             const pkgRes = await client.get("/companies/me/packages");
//             setMyPackages(pkgRes.data);
//         }
        
//     }
//     useEffect(()=>{
//         loadCompany();
//     }, []);

//     async function createPackage() {
//     try {
//       await client.post("/packages", {
//         destination,
//         price: Number(price),
//         duration: Number(duration),
//         inclusions,
//       });

//       alert("Package created (pending admin approval)");

//       setDestination("");
//       setPrice("");
//       setDuration("");
//       setInclusions("");
//       await loadCompany(); 
//     } catch (err) {
//       alert("Package creation failed (company not verified?)");
//     }
//   }

//   if (!company) {
//     return <p style={{ padding: 40 }}>Loading...</p>;
//     }

//   return (
//     <div style={{padding:40}}>
//         {company.verified_status ? (
//           <>
//             <h3>Create Travel Package</h3>

//             <input
//               placeholder="Destination"
//               value={destination}
//               onChange={(e) => setDestination(e.target.value)}
//             />
//             <br /><br />

//             <input
//               placeholder="Price"
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//             />
//             <br /><br />

//             <input
//               placeholder="Duration (days)"
//               type="number"
//               value={duration}
//               onChange={(e) => setDuration(e.target.value)}
//             />
//             <br /><br />

//             <input
//               placeholder="Inclusions"
//               value={inclusions}
//               onChange={(e) => setInclusions(e.target.value)}
//             />
//             <br /><br />

//             <button onClick={createPackage}>Create Package</button>
//           </>
//         ) : (
//           <p style={{ color: "red" }}>
//             You must be verified before creating packages.
//           </p>
//         )}
//         <br></br><br></br>
//         <hr />
//         <h3>My Packages</h3>

//         {myPackages.length === 0 ? (
//           <p>No packages created yet.</p>
//         ) : (
//           myPackages.map((p) => (
//             <div
//               key={p.id}
//               style={{
//                 border: "1px solid gray",
//                 padding: 10,
//                 marginBottom: 10,
//               }}
//             >
//               <b>{p.destination}</b> — ₹{p.price} — {p.duration} days  
//               <p>Status: {p.status.toUpperCase()}</p>
//             </div>
//           ))
//         )}
        
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
  Plus,
} from "lucide-react";  

export default function CompanyPackages(){
    const [company, setCompany] = useState(null);
    const [myPackages, setMyPackages] = useState([]);
    const [destination, setDestination] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [inclusions, setInclusions] = useState("");

    async function loadCompany(){
        const res = await client.get("/companies/me");

        if (res.data.exists){
            setCompany(res.data.company);

            const pkgRes = await client.get("/companies/me/packages");
            setMyPackages(pkgRes.data);
        }
        
    }
    useEffect(()=>{
        loadCompany();
    }, []);

    async function createPackage() {
      // ✅ Frontend validation
      if (!destination.trim()) {
        alert("Destination is required");
        return;
      }

      if (!price || Number(price) <= 0) {
        alert("Price must be greater than 0");
        return;
      }

      if (!duration || Number(duration) <= 0) {
        alert("Duration must be at least 1 day");
        return;
      }

      if (!inclusions.trim()) {
        alert("Inclusions cannot be empty");
        return;
      }

      try {
        await client.post("/packages", {
          destination: destination.trim(),
          price: Number(price),
          duration: Number(duration),
          inclusions: inclusions.trim(),
        });

        alert("Package created (pending admin approval)");

        // reset
        setDestination("");
        setPrice("");
        setDuration("");
        setInclusions("");

        await loadCompany();
      } catch (err) {
        console.log(err.response?.data);
        alert("Package creation failed");
      }
    }

  async function removePackage(packageId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this package? It will no longer be visible to users."
    );

    if (!confirmDelete) return;

    try {
      await client.delete(`/packages/${packageId}`);

      alert("Package removed successfully");

      // Refresh list
      loadCompany();
    } catch (err) {
      console.log(err.response?.data);
      alert("Failed to remove package");
    }
  }

  const getStatusColor = (status) => {
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
    card: {
      backgroundColor: "white",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      padding: "32px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      marginBottom: "32px",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "8px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    cardDescription: {
      fontSize: "14px",
      color: "#64748b",
      marginBottom: "24px",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginBottom: "20px",
    },
    formGroup: {
      marginBottom: "20px",
    },
    formGroupFull: {
      gridColumn: "1 / -1",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      color: "#334155",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "15px",
      backgroundColor: "white",
      outline: "none",
      transition: "all 0.3s",
      boxSizing: "border-box",
    },
    primaryBtn: {
      padding: "12px 32px",
      background: "linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s",
      fontSize: "15px",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    },
    warningBox: {
      backgroundColor: "#fee2e2",
      border: "1px solid #fecaca",
      borderRadius: "12px",
      padding: "20px",
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
    },
    warningIcon: {
      fontSize: "24px",
      flexShrink: 0,
    },
    warningContent: {
      flex: 1,
    },
    warningTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#991b1b",
      marginBottom: "4px",
    },
    warningText: {
      fontSize: "14px",
      color: "#dc2626",
      lineHeight: "1.5",
    },
    sectionTitle: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    emptyState: {
      textAlign: "center",
      padding: "48px 32px",
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      border: "1px dashed #cbd5e1",
    },
    emptyIcon: {
      fontSize: "48px",
      marginBottom: "16px",
    },
    emptyText: {
      fontSize: "16px",
      color: "#64748b",
      marginBottom: "8px",
    },
    emptySubtext: {
      fontSize: "14px",
      color: "#94a3b8",
    },
    packagesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: "20px",
    },
    packageCard: {
      backgroundColor: "white",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      padding: "24px",
      transition: "all 0.3s",
    },
    packageHeader: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: "16px",
    },
    packageDestination: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "4px",
    },
    statusBadge: {
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      border: "1px solid",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    packageDetails: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    removeBtn: {
      marginTop: "14px",
      width: "100%",
      padding: "10px 16px",
      backgroundColor: "#dc2626",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    detailRow: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    detailIcon: {
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      fontSize: "16px",
    },
    detailText: {
      display: "flex",
      flexDirection: "column",
    },
    detailLabel: {
      fontSize: "12px",
      color: "#64748b",
    },
    detailValue: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#0f172a",
    },
  };

  if (!company) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingIcon}><Building2 size={18}/></div>
        <p style={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  const isFormValid =
    destination.trim() &&
    price > 0 &&
    duration > 0 &&
    inclusions.trim();

  return (
    <div>
      <h1 style={styles.pageTitle}>Packages</h1>
      <p style={styles.pageSubtitle}>Create and manage your travel packages</p>

      {/* Create Package Form */}
      {company.verified_status ? (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <Plus size={24}/>
            <span>Create New Package</span>
          </h2>
          <p style={styles.cardDescription}>
            Add a new travel package for customers to book
          </p>

          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Destination</label>
              <input
                type="text"
                placeholder="e.g., Goa, Mumbai, Kerala"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={styles.input}
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

            <div style={styles.formGroup}>
              <label style={styles.label}>Price (₹)</label>
              <input
                type="number"
                placeholder="e.g., 15000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={styles.input}
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

            <div style={styles.formGroup}>
              <label style={styles.label}>Duration (days)</label>
              <input
                type="number"
                placeholder="e.g., 5"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                style={styles.input}
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

            <div style={{ ...styles.formGroup, ...styles.formGroupFull }}>
              <label style={styles.label}>Inclusions</label>
              <input
                type="text"
                placeholder="e.g., Hotel, Meals, Transportation"
                value={inclusions}
                onChange={(e) => setInclusions(e.target.value)}
                style={styles.input}
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
          </div>

          <button
            onClick={createPackage}
            style={{
              ...styles.primaryBtn,
              opacity: !isFormValid ? 0.5 : 1,
              cursor: !isFormValid ? "not-allowed" : "pointer",
            }}
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
            <span>Create Package</span>
          </button>

        </div>
      ) : (
        <div style={styles.warningBox}>
          <span style={styles.warningIcon}><AlertTriangle size={18}/></span>
          <div style={styles.warningContent}>
            <h3 style={styles.warningTitle}>Verification Required</h3>
            <p style={styles.warningText}>
              You must be verified before creating packages. Please complete your profile and upload required documents.
            </p>
          </div>
        </div>
      )}

      {/* My Packages List */}
      <div>
        <h2 style={styles.sectionTitle}>
          <Package size={24}/>
          <span>My Packages</span>
        </h2>

        {myPackages.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}><Package size={18}/></div>
            <p style={styles.emptyText}>No packages created yet</p>
            <p style={styles.emptySubtext}>Create your first package to get started</p>
          </div>
        ) : (
          <div style={styles.packagesGrid}>
            {myPackages.map((p) => {
              const statusColor = getStatusColor(p.status);
              return (
                <div
                  key={p.id}
                  style={styles.packageCard}
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
                  <div style={styles.packageHeader}>
                    <div>
                      <h3 style={styles.packageDestination}><MapPin size={22}/> {p.destination}</h3>
                    </div>
                    <span
                      style={{
                        ...styles.statusBadge,
                        backgroundColor: statusColor.bg,
                        color: statusColor.text,
                        borderColor: statusColor.border,
                      }}
                    >
                      {p.status}
                    </span>
                  </div>

                  <div style={styles.packageDetails}>
                    <div style={styles.detailRow}>
                      <div style={{ ...styles.detailIcon, backgroundColor: "#eef2ff" }}>
                        <IndianRupee size={18}/>
                      </div>
                      <div style={styles.detailText}>
                        <span style={styles.detailLabel}>Price</span>
                        <span style={styles.detailValue}>₹{p.price}</span>
                      </div>
                    </div>

                    <div style={styles.detailRow}>
                      <div style={{ ...styles.detailIcon, backgroundColor: "#dbeafe" }}>
                        <Calendar size={18}/>
                      </div>
                      <div style={styles.detailText}>
                        <span style={styles.detailLabel}>Duration</span>
                        <span style={styles.detailValue}>{p.duration} days</span>
                      </div>
                    </div>
                  </div>
                  {/* Remove Button */}
                  <button
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        justifyContent: "center",
                        ...styles.removeBtn
                      }}
                    onClick={() => removePackage(p.id)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#b91c1c";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "#dc2626";
                    }}
                  >
                    <Trash2 size={18}/> Remove Package
                  </button>
                </div>
              );
            })} 
          </div>
        )}
      </div>
    </div>
  );
}