// import { useState } from "react";
// import client from "../api/client";
// import { useNavigate } from "react-router-dom";

// export default function RegisterCompany() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   async function handleRegister(e) {
//     e.preventDefault();

//     try {
//       await client.post("/auth/register-company", {
//         email,
//         password,
//       });

//       alert("Company account created. Please login.");
//       navigate("/");
//     } catch (err) {
//       alert("Company registration failed");
//     }
//   }

//   return (
//     <div style={{ padding: 40 }}>
//       <h2>Company Signup</h2>

//       <form onSubmit={handleRegister}>
//         <input
//           placeholder="Company Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <br /><br />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <br /><br />

//         <button type="submit">Register Company</button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import client from "../api/client";
import { useNavigate } from "react-router-dom";
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

export default function RegisterCompany() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await client.post("/auth/register-company", {
        email,
        password,
      });

      alert("Company account created. Please login.");
      navigate("/");
    } catch (err) {
      alert("Company registration failed");
    }
  }

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    },
    card: {
      width: "100%",
      maxWidth: "480px",
      backgroundColor: "white",
      borderRadius: "20px",
      border: "1px solid #e2e8f0",
      padding: "48px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
    },
    logo: {
      fontSize: "48px",
      marginBottom: "16px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "15px",
      color: "#64748b",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#334155",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "15px",
      backgroundColor: "white",
      outline: "none",
      transition: "all 0.3s",
      boxSizing: "border-box",
    },
    submitBtn: {
      width: "100%",
      padding: "14px 24px",
      background: "linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s",
      fontSize: "16px",
      marginTop: "8px",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      margin: "32px 0",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      backgroundColor: "#e2e8f0",
    },
    dividerText: {
      fontSize: "13px",
      color: "#94a3b8",
      fontWeight: "500",
    },
    footer: {
      textAlign: "center",
      marginTop: "24px",
    },
    footerText: {
      fontSize: "14px",
      color: "#64748b",
    },
    footerLink: {
      color: "#4f46e5",
      fontWeight: "600",
      textDecoration: "none",
      transition: "all 0.3s",
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
      fontSize: "13px",
      color: "#1e40af",
      lineHeight: "1.5",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}><Building2 size={35}/></div>
          <h1 style={styles.title}>Company Signup</h1>
          <p style={styles.subtitle}>Create your company account to start offering travel packages</p>
        </div>

        <div style={styles.infoBox}>
          <span style={styles.infoIcon}><Info size={18}/></span>
          <span style={styles.infoText}>
            After registration, you'll need to complete your company profile and submit documents for verification before creating packages.
          </span>
        </div>

        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Company Email</label>
            <input
              type="email"
              placeholder="company@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

          <button
            type="submit"
            style={styles.submitBtn}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(79, 70, 229, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Register Company
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine}></div>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Already have an account?{" "}
            <a
              href="/"
              style={styles.footerLink}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#3730a3";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#4f46e5";
              }}
            >
              Sign in
            </a>
          </p>
          <p style={{ ...styles.footerText, marginTop: "12px" }}>
            Looking to book packages?{" "}
            <a
              href="/register"
              style={styles.footerLink}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#3730a3";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#4f46e5";
              }}
            >
              User signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
