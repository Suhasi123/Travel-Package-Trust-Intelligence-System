// import { useEffect, useState } from "react";
// import client from "../api/client";

// export default function ComapanyDocuments(){
//     const [company, setCompany] = useState(null);
//     const [docType, setDocType] = useState("PAN");
//     const [fileUrl, setFileUrl] = useState("");

//     async function loadCompany(){
//         const res = await client.get("/companies/me");

//         if (res.data.exists){
//             setCompany(res.data.company);
//         }
//     }
//     useEffect(()=>{
//         loadCompany();
//     }, []);

//     async function uploadDocument() {
//         await client.post(`/companies/${company.id}/documents`, {
//         doc_type: docType,
//         file_url: fileUrl,
//         });

//         alert("Document uploaded");
//         setFileUrl("");
//     }
  
//     return (
//         <div style={{padding: 40}}>
//             <h3>Upload Document</h3>

//             <select
//                 value={docType}
//                 onChange={(e) => setDocType(e.target.value)}
//             >
//                 <option value="PAN">PAN</option>
//                 <option value="LICENSE">LICENSE</option>
//                 <option value="GST_CERTIFICATE">GST Certificate</option>
//             </select>

//             <br /><br />

//             <input
//                 placeholder="File URL (dummy)"
//                 value={fileUrl}
//                 onChange={(e) => setFileUrl(e.target.value)}
//             />

//             <br /><br />

//             <button onClick={uploadDocument}>Upload</button>
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import client from "../api/client";

export default function CompanyDocuments(){
    const [company, setCompany] = useState(null);
    const [docType, setDocType] = useState("PAN");
    const [fileUrl, setFileUrl] = useState("");

    async function loadCompany(){
        const res = await client.get("/companies/me");

        if (res.data.exists){
            setCompany(res.data.company);
        }
    }
    useEffect(()=>{
        loadCompany();
    }, []);

    async function uploadDocument() {
        await client.post(`/companies/${company.id}/documents`, {
        doc_type: docType,
        file_url: fileUrl,
        });

        alert("Document uploaded");
        setFileUrl("");
    }

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
        maxWidth: "600px",
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
      select: {
        width: "100%",
        padding: "12px 16px",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        fontSize: "15px",
        backgroundColor: "white",
        cursor: "pointer",
        outline: "none",
        transition: "all 0.3s",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 16px center",
        paddingRight: "40px",
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
        display: "flex",
        alignItems: "center",
        gap: "8px",
      },
      infoBox: {
        backgroundColor: "#eff6ff",
        border: "1px solid #bfdbfe",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "24px",
        display: "flex",
        gap: "12px",
      },
      infoIcon: {
        fontSize: "20px",
        flexShrink: 0,
      },
      infoText: {
        fontSize: "14px",
        color: "#1e40af",
        lineHeight: "1.5",
      },
      docTypeCard: {
        padding: "12px 16px",
        borderRadius: "8px",
        marginBottom: "8px",
        transition: "all 0.3s",
      },
      docTypeCardInactive: {
        backgroundColor: "#f8fafc",
        border: "1px solid #e2e8f0",
      },
      docTypeCardActive: {
        backgroundColor: "#eef2ff",
        border: "1px solid #c7d2fe",
      },
    };

    const docTypeOptions = [
      { value: "PAN", label: "PAN Card", icon: "🆔", description: "Permanent Account Number" },
      { value: "LICENSE", label: "Business License", icon: "📜", description: "Official business license" },
      { value: "GST_CERTIFICATE", label: "GST Certificate", icon: "📋", description: "Goods and Services Tax registration" },
    ];

    return (
      <div>
        <h1 style={styles.pageTitle}>Documents</h1>
        <p style={styles.pageSubtitle}>Upload required documents for verification</p>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <span>📄</span>
            <span>Upload Document</span>
          </h2>
          <p style={styles.cardDescription}>
            Submit your company documents to complete the verification process
          </p>

          <div style={styles.infoBox}>
            <span style={styles.infoIcon}>ℹ️</span>
            <span style={styles.infoText}>
              Uploaded documents will be reviewed by our admin team. You'll be notified once verification is complete.
            </span>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Document Type</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
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
              {docTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>File URL</label>
            <input
              type="text"
              placeholder="Enter document URL (e.g., https://example.com/document.pdf)"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
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
            <p style={{ fontSize: "13px", color: "#64748b", marginTop: "8px" }}>
              💡 For demo purposes, enter any URL format
            </p>
          </div>

          <button
            onClick={uploadDocument}
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
            <span>⬆️</span>
            <span>Upload Document</span>
          </button>
        </div>

        {/* Document Types Reference */}
        <div style={{ marginTop: "32px", maxWidth: "600px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a", marginBottom: "16px" }}>
            Required Documents
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {docTypeOptions.map((option) => (
              <div
                key={option.value}
                style={{
                  ...(docType === option.value ? styles.docTypeCardActive : styles.docTypeCardInactive),
                  ...styles.docTypeCard,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "24px" }}>{option.icon}</span>
                  <span style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a" }}>
                    {option.label}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#64748b", marginLeft: "36px", margin: 0 }}>
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}