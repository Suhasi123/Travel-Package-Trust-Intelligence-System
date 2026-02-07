// import { useEffect, useState } from "react";
// import client from "../api/client";
// import { useNavigate } from "react-router-dom";

// export default function Packages() {
//   const [packages, setPackages] = useState([]);
//   const [scores, setScores] = useState({});
//   const [selected, setSelected] = useState([]);
//   const [search, setSearch] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [minDuration, setMinDuration] = useState("");
//   const [maxDuration, setMaxDuration] = useState("");
//   const [sort, setSort] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   async function fetchPackages() {
//     const res = await client.get("/packages/with-trust", {
//       params: {
//         destination: search || undefined,
//         min_price: minPrice || undefined,
//         max_price: maxPrice || undefined,
//         min_duration: minDuration || undefined,
//         max_duration: maxDuration || undefined,
//         sort: sort || undefined,
//       },
//     });

//     setPackages(res.data);
//     setScores({});

//     for (let pkg of res.data) {
//       try {
//         const scoreRes = await client.get(
//           `/trust/companies/${pkg.company_id}/trust-score`
//         );

//         setScores((prev) => ({
//           ...prev,
//           [pkg.company_id]: scoreRes.data.trust_score,
//         }));
//       } catch {
//         setScores((prev) => ({
//           ...prev,
//           [pkg.company_id]: "N/A",
//         }));
//       }
//     }
//   }

//   function toggleSelect(id) {
//     setSelected((prev) =>
//       prev.includes(id)
//         ? prev.filter((x) => x !== id)
//         : [...prev, id]
//     );
//   }

//   function handleCompare() {
//     if (selected.length < 2) {
//       alert("Select at least 2 packages to compare.");
//       return;
//     }

//     navigate(`/compare?ids=${selected.join(",")}`);
//   }

//   return (
//     <div style={{ padding: 40 }}>
//       <a href="/my-bookings">My Bookings</a>
//       <h3>Search Packages</h3>

//         <input
//           placeholder="Destination"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <input
//           placeholder="Min Price"
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//         />

//         <input
//           placeholder="Max Price"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//         />

//         <input
//           placeholder="Min Duration"
//           value={minDuration}
//           onChange={(e) => setMinDuration(e.target.value)}
//         />

//         <input
//           placeholder="Max Duration"
//           value={maxDuration}
//           onChange={(e) => setMaxDuration(e.target.value)}
//         />

//         <select value={sort} onChange={(e) => setSort(e.target.value)}>
//           <option value="">No Sort</option>
//           <option value="price_low">Price Low → High</option>
//           <option value="price_high">Price High → Low</option>
//           <option value="trust_high">Trust Score High → Low</option>
//         </select>
//         <br></br>
//         <br></br>
//         <button onClick={fetchPackages}>Apply Filters</button>

//         <hr />

//       <h2>Approved Packages</h2>

//       <button onClick={handleCompare}>
//         Compare Selected ({selected.length})
//       </button>

//       {packages.map((p) => (
//         <div
//           key={p.id}
//           style={{
//             border: "1px solid gray",
//             padding: 15,
//             marginBottom: 10,
//           }}
//         >
//           <input
//             type="checkbox"
//             checked={selected.includes(p.id)}
//             onChange={() => toggleSelect(p.id)}
//           />
//           <h3>{p.destination}</h3>
//           <p>Price: ₹{p.price}</p>
//           <p>Duration: {p.duration} days</p>

//           <p>
//             Trust Score:{" "}
//             {p.trust_score !== null ? p.trust_score + "%" : "Not Available"}
//           </p>

//           <a href={`/company/${p.company_id}`}>
//             View Company Profile
//           </a>
//           <br></br>
//           <button
//             onClick={async () => {
//               await client.post("/bookings", {
//                 package_id: p.id,
//               });
//               alert("Booking created (pending)");
//             }}
//           >
//             Book Package
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
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

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [scores, setScores] = useState({});
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [sort, setSort] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    setLoading(true);
    const res = await client.get("/packages/with-trust", {
      params: {
        destination: search || undefined,
        min_price: minPrice || undefined,
        max_price: maxPrice || undefined,
        min_duration: minDuration || undefined,
        max_duration: maxDuration || undefined,
        sort: sort || undefined,
      },
    });

    setPackages(res.data);
    setScores({});

    for (let pkg of res.data) {
      try {
        const scoreRes = await client.get(
          `/trust/companies/${pkg.company_id}/trust-score`
        );

        setScores((prev) => ({
          ...prev,
          [pkg.company_id]: scoreRes.data.trust_score,
        }));
      } catch {
        setScores((prev) => ({
          ...prev,
          [pkg.company_id]: "N/A",
        }));
      }
    }
    setLoading(false);
  }

  function toggleSelect(id) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  function handleCompare() {
    if (selected.length < 2) {
      alert("Select at least 2 packages to compare.");
      return;
    }

    navigate(`/compare?ids=${selected.join(",")}`);
  }

  const getTrustScoreColor = (score) => {
    if (score === "N/A") return { bg: "#f1f5f9", text: "#64748b", border: "#e2e8f0" };
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
    headerActions: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    compareBtn: {
      padding: "10px 20px",
      background: "linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontWeight: "500",
      cursor: "pointer",
      boxShadow: "0 4px 6px rgba(79, 70, 229, 0.2)",
      transition: "all 0.3s",
    },
    bookingsLink: {
      padding: "10px 20px",
      backgroundColor: "white",
      border: "1px solid #e2e8f0",
      color: "#334155",
      textDecoration: "none",
      borderRadius: "12px",
      fontWeight: "500",
      transition: "all 0.3s",
    },
    main: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "32px 24px",
    },
    searchBar: {
      display: "flex",
      gap: "12px",
      marginBottom: "16px",
    },
    searchInput: {
      flex: 1,
      padding: "14px 16px",
      backgroundColor: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "15px",
      outline: "none",
      transition: "all 0.3s",
    },
    filterBtn: {
      padding: "14px 20px",
      backgroundColor: showFilters ? "#4f46e5" : "white",
      color: showFilters ? "white" : "#334155",
      border: showFilters ? "none" : "1px solid #e2e8f0",
      borderRadius: "12px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    select: {
      padding: "14px 16px",
      backgroundColor: "white",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "15px",
      fontWeight: "500",
      color: "#334155",
      cursor: "pointer",
      outline: "none",
    },
    applyBtn: {
      padding: "14px 24px",
      backgroundColor: "#0f172a",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontWeight: "500",
      cursor: "pointer",
    },
    filterPanel: {
      backgroundColor: "white",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      padding: "24px",
      marginBottom: "32px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    },
    filterGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "24px",
      marginTop: "16px",
    },
    filterGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#334155",
      marginBottom: "12px",
    },
    filterInputs: {
      display: "flex",
      gap: "12px",
    },
    filterInput: {
      flex: 1,
      padding: "10px 12px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "14px",
      outline: "none",
    },
    clearBtn: {
      padding: "8px 16px",
      fontSize: "14px",
      color: "#64748b",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      marginTop: "16px",
      alignSelf: "flex-end",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: "24px",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "16px",
      border: "1px solid #e2e8f0",
      overflow: "hidden",
      transition: "all 0.5s",
      cursor: "pointer",
    },
    cardInner: {
      padding: "24px",
    },
    cardHeader: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: "16px",
    },
    checkbox: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
    },
    trustBadge: {
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "700",
      border: "1px solid",
    },
    destination: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "16px",
    },
    detailsGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginBottom: "24px",
      paddingBottom: "24px",
      borderBottom: "1px solid #f1f5f9",
    },
    detailRow: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    detailIcon: {
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      fontSize: "18px",
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
      fontSize: "18px",
      fontWeight: "700",
      color: "#0f172a",
    },
    actions: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    companyLink: {
      display: "block",
      width: "100%",
      padding: "10px 16px",
      textAlign: "center",
      backgroundColor: "#f1f5f9",
      color: "#334155",
      textDecoration: "none",
      borderRadius: "12px",
      fontWeight: "500",
      transition: "all 0.3s",
    },
    bookBtn: {
      width: "90%",
      padding: "10px 16px",
      background: "linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%)",
      color: "white",
      textAlign: "center",
      border: "none",
      borderRadius: "12px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s",
      textDecoration: "none",
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
              <h1 style={styles.headerTitle}>Travel Packages</h1>
              <p style={styles.headerSubtitle}>Discover verified travel experiences</p>
            </div>
          </div>
          <div style={styles.headerActions}>
            {selected.length > 0 && (
              <button
                onClick={handleCompare}
                style={styles.compareBtn}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 12px rgba(79, 70, 229, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(79, 70, 229, 0.2)";
                }}
              >
                Compare Selected ({selected.length})
              </button>
            )}
            <a
              href="/my-bookings"
              style={styles.bookingsLink}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#c7d2fe";
                e.currentTarget.style.color = "#4f46e5";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.color = "#334155";
              }}
            >
              My Bookings
            </a>
          </div>
        </div>
      </header>

      <div style={styles.main}>
        {/* Search & Filter Bar */}
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search by destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#4f46e5";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79, 70, 229, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <button onClick={() => setShowFilters(!showFilters)} style={styles.filterBtn}>
            Filters
          </button>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.select}>
            <option value="">Sort By</option>
            <option value="price_low">Price: Low → High</option>
            <option value="price_high">Price: High → Low</option>
            <option value="trust_high">Trust Score: High → Low</option>
          </select>
          <button onClick={fetchPackages} disabled={loading} style={styles.applyBtn}>
            {loading ? "Loading..." : "Apply"}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div style={styles.filterPanel}>
            <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#334155", margin: 0 }}>
              Advanced Filters
            </h3>
            <div style={styles.filterGrid}>
              <div style={styles.filterGroup}>
                <label style={styles.label}>Price Range</label>
                <div style={styles.filterInputs}>
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    style={styles.filterInput}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    style={styles.filterInput}
                  />
                </div>
              </div>
              <div style={styles.filterGroup}>
                <label style={styles.label}>Duration (Days)</label>
                <div style={styles.filterInputs}>
                  <input
                    type="number"
                    placeholder="Min"
                    value={minDuration}
                    onChange={(e) => setMinDuration(e.target.value)}
                    style={styles.filterInput}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxDuration}
                    onChange={(e) => setMaxDuration(e.target.value)}
                    style={styles.filterInput}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("");
                  setMinDuration("");
                  setMaxDuration("");
                  setSearch("");
                  setSort("");
                }}
                style={styles.clearBtn}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div style={styles.grid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ ...styles.card, opacity: 0.6 }}>
                <div style={styles.cardInner}>
                  <div style={{ height: "20px", background: "#e2e8f0", borderRadius: "4px", marginBottom: "12px" }} />
                  <div style={{ height: "16px", background: "#e2e8f0", borderRadius: "4px", width: "60%", marginBottom: "12px" }} />
                  <div style={{ height: "16px", background: "#e2e8f0", borderRadius: "4px", width: "80%", marginBottom: "12px" }} />
                  <div style={{ height: "40px", background: "#e2e8f0", borderRadius: "8px" }} />
                </div>
              </div>
            ))}
          </div>
        ) : packages.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}><Package size={22}/></div>
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#0f172a", marginBottom: "8px" }}>
              No packages found
            </h3>
            <p style={{ color: "#64748b" }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          /* Package Grid */
          <div style={styles.grid}>
            {packages.map((p) => {
              const trustColor = getTrustScoreColor(scores[p.company_id]);
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
                  <div style={styles.cardInner}>
                    <div style={styles.cardHeader}>
                      <label style={styles.checkbox}>
                        <input
                          type="checkbox"
                          checked={selected.includes(p.id)}
                          onChange={() => toggleSelect(p.id)}
                          style={{ width: "20px", height: "20px", cursor: "pointer" }}
                        />
                        <span style={{ fontSize: "14px", fontWeight: "500", color: "#64748b" }}>Compare</span>
                      </label>
                      <div
                        style={{
                          ...styles.trustBadge,
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          backgroundColor: trustColor.bg,
                          color: trustColor.text,
                          borderColor: trustColor.border,
                        }}
                      >
                        <ShieldCheck size={18}/> {p.trust_score !== null ? `${p.trust_score}%` : "N/A"}
                      </div>
                    </div>

                    <div style={styles.destination}><MapPin size={18}/> {p.destination}</div>

                    <div style={styles.detailsGrid}>
                      <div style={styles.detailRow}>
                        <div style={{ ...styles.detailIcon, backgroundColor: "#eef2ff" }}><IndianRupee size={18}/></div>
                        <div style={styles.detailText}>
                          <span style={styles.detailLabel}>Price</span>
                          <span style={styles.detailValue}>₹{p.price}</span>
                        </div>
                      </div>
                      <div style={styles.detailRow}>
                        <div style={{ ...styles.detailIcon, backgroundColor: "#dbeafe" }}><Calendar size={18}/></div>
                        <div style={styles.detailText}>
                          <span style={styles.detailLabel}>Duration</span>
                          <span style={styles.detailValue}>{p.duration} days</span>
                        </div>
                      </div>
                    </div>

                    <div style={styles.actions}>
                      {/* <a
                        href={`/companies/${p.company_id}`}
                        style={styles.companyLink}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e2e8f0")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                      >
                        View Company Profile
                      </a> */}
                      {/* <button
                        onClick={async () => {
                          await client.post("/bookings", { package_id: p.id });
                          alert("Booking created (pending)");
                        }}
                        style={{display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px", 
                          ...styles.bookBtn}}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow = "0 8px 12px rgba(79, 70, 229, 0.3)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <CheckCircle size={18}/> Book Package
                      </button> */}
                      <a
                        href={`/packages/${p.id}`}
                        style={styles.bookBtn}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow = "0 8px 12px rgba(79, 70, 229, 0.3)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        Package Details
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}