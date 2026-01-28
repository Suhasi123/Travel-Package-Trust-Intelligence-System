import { useEffect, useState } from "react";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [scores, setScores] = useState({});
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div style={{ padding: 40 }}>
      <h2>Approved Packages</h2>

      <button onClick={handleCompare}>
        Compare Selected ({selected.length})
      </button>

      {packages.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid gray",
            padding: 15,
            marginBottom: 10,
          }}
        >
          <input
            type="checkbox"
            checked={selected.includes(p.id)}
            onChange={() => toggleSelect(p.id)}
          />
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
