// import { useEffect, useState } from "react";
// import client from "../api/client";

// export default function CompanyProfile(){
//     const [company, setCompany] = useState(null);
//     const [name, setName] = useState("");
//     const [description, setDescription] = useState("");
//     const [explain, setExplain] = useState(null);

//     async function loadCompany(){
//         const res = await client.get("/companies/me");

//         if (res.data.exists){
//             setCompany(res.data.company);
//         }
//     }
//     useEffect(()=>{
//         loadCompany();
//     }, []);

//     async function createProfile(){
//         await client.post("/companies",{
//             name,
//             description,
//         });
//     }

//     useEffect(() => {
//       if (!company) return;

//       async function loadExplain() {
//         const res = await client.get(
//           `/trust/companies/${company.id}/trust-explain`
//         );
//         setExplain(res.data);
//       }

//       loadExplain();
//     }, [company]);

//     if (!company) {
//     return (
//       <div style={{ padding: 40 }}>
//         <h2>Create Company Profile</h2>

//         <input
//           placeholder="Company Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <br /><br />

//         <input
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <br /><br />

//         <button onClick={createProfile}>Create Profile</button>
//       </div>
//     );
//   }
//   return (
//     <div style={{padding: 40}}>
//         <h2>Company Profile</h2>

//         <h3>{company.name}</h3>
//         <p>{company.description}</p>

//         <p>
//             Verified Status:{" "}
//             {company.verified_status ? "✅ Verified" : "❌ Pending"}
//         </p>

//         {explain && (
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

//       <hr />
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

export default function CompanyProfile(){
    const [company, setCompany] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [explain, setExplain] = useState(null);

    async function loadCompany(){
        const res = await client.get("/companies/me");

        if (res.data.exists){
            setCompany(res.data.company);
        }
    }
    useEffect(()=>{
        loadCompany();
    }, []);

    async function createProfile(){
        await client.post("/companies",{
            name,
            description,
        });
        loadCompany();
    }

    useEffect(() => {
      if (!company) return;

      async function loadExplain() {
        const res = await client.get(
          `/trust/companies/${company.id}/trust-explain`
        );
        setExplain(res.data);
      }

      loadExplain();
    }, [company]);

    const getTrustScoreColor = (scoreValue) => {
      if (scoreValue === null || scoreValue === undefined) return { bg: "#f1f5f9", text: "#64748b", border: "#e2e8f0" };
      if (scoreValue >= 80) return { bg: "#ecfdf5", text: "#047857", border: "#d1fae5" };
      if (scoreValue >= 60) return { bg: "#eff6ff", text: "#1d4ed8", border: "#dbeafe" };
      if (scoreValue >= 40) return { bg: "#fffbeb", text: "#b45309", border: "#fef3c7" };
      return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" };
    };

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
      card: {
        backgroundColor: "white",
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
        padding: "32px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        marginBottom: "24px",
      },
      cardTitle: {
        fontSize: "20px",
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      },
      formGroup: {
        marginBottom: "24px",
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
      textarea: {
        width: "100%",
        padding: "12px 16px",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        fontSize: "15px",
        backgroundColor: "white",
        outline: "none",
        transition: "all 0.3s",
        minHeight: "120px",
        resize: "vertical",
        fontFamily: "inherit",
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
      statusRow: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "24px",
      },
      statusLabel: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#64748b",
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
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        marginBottom: "24px",
      },
      trustBadgeLarge: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        fontSize: "36px",
        fontWeight: "700",
        border: "4px solid",
        marginBottom: "12px",
      },
      trustScoreText: {
        fontSize: "18px",
        color: "#64748b",
        fontWeight: "500",
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
      divider: {
        height: "1px",
        backgroundColor: "#e2e8f0",
        border: "none",
        marginTop: "32px",
      },
    };

    if (!company) {
      return (
        <div>
          <h1 style={styles.pageTitle}>Create Company Profile</h1>
          <p style={styles.pageSubtitle}>Set up your company profile to start offering packages</p>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <Building2 size={24}/>
              <span>Company Information</span>
            </h2>

            <div style={styles.formGroup}>
              <label style={styles.label}>Company Name</label>
              <input
                type="text"
                placeholder="Enter your company name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <label style={styles.label}>Description</label>
              <textarea
                placeholder="Describe your company and services..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              onClick={createProfile}
              style={styles.primaryBtn}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 12px rgba(79, 70, 229, 0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Create Profile
            </button>
          </div>
        </div>
      );
    }

    const trustColor = explain ? getTrustScoreColor(explain.trust_score) : { bg: "#f1f5f9", text: "#64748b", border: "#e2e8f0" };

    return (
      <div>
        <h1 style={styles.pageTitle}>Company Profile</h1>
        <p style={styles.pageSubtitle}>Manage your company information and trust score</p>

        <div style={styles.card}>
          <h2 style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                ...styles.companyName
              }}><Building2 size={30}/> 
            {company.name}
          </h2>
          <p style={styles.description}>{company.description}</p>
          
          <div style={styles.statusRow}>
            <span style={styles.statusLabel}>Verification Status:</span>
            <span 
              style={
                company.verified_status
                  ? {
                      ...styles.verifiedBadge,
                      ...styles.verifiedYes,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }
                  : {
                      ...styles.verifiedBadge,
                      ...styles.verifiedNo,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }
              }
            >
              {company.verified_status ? <><CheckCircle size={18}/>Verified</> : <><Hourglass size={18}/>Pending Verification</>}
            </span>
          </div>

          {explain && (
            <>
              <div style={styles.trustScoreContainer}>
                <div
                  style={{
                    ...styles.trustBadgeLarge,
                    backgroundColor: trustColor.bg,
                    color: trustColor.text,
                    borderColor: trustColor.border,
                  }}
                >
                  {explain.trust_score}
                </div>
                <div style={styles.trustScoreText}>Trust Score</div>
              </div>

              <div style={styles.explainSection}>
                <h3 style={styles.explainTitle}>
                  <ShieldCheck size={22}/>
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
                      <span style={{display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    ...styles.signalIcon}}>
                        <CheckCircle size={18}/>
                      </span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <hr style={styles.divider} />
      </div>
    );
}