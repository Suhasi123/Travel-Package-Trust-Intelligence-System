import { useEffect, useState } from "react";
import client from "../api/client";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [scores, setScores] = useState({});

  useEffect(() => {
    async function fetchPackages() {
      const res = await client.get("/packages");
      setPackages(res.data);

      // Fetch trust scores for each package company
      res.data.forEach(async (pkg) => {
        const scoreRes = await client.get(
          `/trust/companies/${pkg.company_id}/trust-score`
        );

        setScores((prev) => ({
          ...prev,
          [pkg.company_id]: scoreRes.data.trust_score,
        }));
      });
    }

    fetchPackages();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Approved Packages</h2>

      {packages.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid gray",
            padding: 15,
            marginBottom: 10,
          }}
        >
          <h3>{p.destination}</h3>
          <p>Price: ₹{p.price}</p>
          <p>Duration: {p.duration} days</p>

          <p>
            Trust Score:{" "}
            {scores[p.company_id] !== undefined
              ? scores[p.company_id] + "%"
              : "Loading..."}
          </p>
          
          <a href={`/companies/${p.company_id}`}>
            View Company Profile
          </a>
        </div>
      ))}
    </div>
  );
}
