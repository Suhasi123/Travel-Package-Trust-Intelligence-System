// import { useState } from "react";
// import client from "../api/client";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   async function handleLogin(e) {
//     e.preventDefault();

//     try {
//       const res = await client.post("/auth/login", new URLSearchParams({
//         username: email,
//         password: password,
//       }));

//       localStorage.setItem("token", res.data.access_token);

//       const me = await client.get("/auth/me");
//       console.log("ME:", me.data);
//       console.log("ROLE:", me.data.role);

//       const role = me.data.role;

//       if (role === "admin") {
//         navigate("/admin");
//       } else if (role === "company") {
//         navigate("/company/profile");
//       } else {
//         navigate("/packages");
//       }

//     } catch (err) {
//       console.log(err.response?.data);
//       alert("Login failed");
//     }
//   }

//   return (
//     <div style={{ padding: 40 }}>
//       <h2>Login</h2>

//       <form onSubmit={handleLogin}>
//         <input
//           placeholder="Email"
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

//         <button type="submit">Login</button>
//       </form>
//       <p>
//         New user? <a href="/register-user">Signup here</a>
//       </p>

//       <p>
//         Travel company? <a href="/register-company">Register company account</a>
//       </p>

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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await client.post("/auth/login", new URLSearchParams({
        username: email,
        password: password,
      }));

      localStorage.setItem("token", res.data.access_token);

      const me = await client.get("/auth/me");
      console.log("ME:", me.data);
      console.log("ROLE:", me.data.role);

      const role = me.data.role;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "company") {
        navigate("/company/profile");
      } else {
        navigate("/packages");
      }

    } catch (err) {
      console.log(err.response?.data);
      alert("Login failed");
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
      fontSize: "56px",
      marginBottom: "16px",
    },
    title: {
      fontSize: "32px",
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
    signupSection: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    signupCard: {
      padding: "16px",
      backgroundColor: "#f8fafc",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      transition: "all 0.3s",
    },
    signupInfo: {
      flex: 1,
    },
    signupTitle: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#0f172a",
      marginBottom: "2px",
    },
    signupText: {
      fontSize: "13px",
      color: "#64748b",
    },
    signupLink: {
      padding: "8px 16px",
      backgroundColor: "white",
      border: "1px solid #e2e8f0",
      color: "#4f46e5",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: "600",
      textDecoration: "none",
      transition: "all 0.3s",
      whiteSpace: "nowrap",
    },
    welcomeBox: {
      backgroundColor: "#eef2ff",
      border: "1px solid #c7d2fe",
      borderRadius: "12px",
      padding: "16px",
      marginBottom: "32px",
      textAlign: "center",
    },
    welcomeText: {
      fontSize: "14px",
      color: "#4338ca",
      lineHeight: "1.5",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>🌍</div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your account to continue</p>
        </div>

        <div style={styles.welcomeBox}>
          <p style={styles.welcomeText}>
            Access verified travel packages with trust scores
          </p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
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
              placeholder="Enter your password"
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
            Sign In
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>NEW HERE?</span>
          <div style={styles.dividerLine}></div>
        </div>

        <div style={styles.signupSection}>
          <div
            style={styles.signupCard}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f5f9";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f8fafc";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            <div style={styles.signupInfo}>
              <div style={{display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        ...styles.signupTitle}}><Plane size={18}/> Traveler Account</div>
              <div style={styles.signupText}>Book and explore packages</div>
            </div>
            <a
              href="/register-user"
              style={styles.signupLink}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#4f46e5";
                e.currentTarget.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#4f46e5";
              }}
            >
              Sign Up
            </a>
          </div>

          <div
            style={styles.signupCard}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f5f9";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f8fafc";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            <div style={styles.signupInfo}>
              <div style={{display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        ...styles.signupTitle}}><Building2 size={18}/> Company Account</div>
              <div style={styles.signupText}>List your travel packages</div>
            </div>
            <a
              href="/register-company"
              style={styles.signupLink}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#4f46e5";
                e.currentTarget.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#4f46e5";
              }}
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}