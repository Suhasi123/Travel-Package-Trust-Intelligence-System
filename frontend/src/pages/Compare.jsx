import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import client from "../api/client";

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

  return (
    <div style={{ padding: 40 }}>
      <h2>Package Comparison</h2>

      {packages.length === 0 ? (
        <p>No packages selected.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Destination</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Trust Score</th>
            </tr>
          </thead>

          <tbody>
            {packages.map((p) => (
              <tr key={p.id}>
                <td>{p.destination}</td>
                <td>₹{p.price}</td>
                <td>{p.duration} days</td>
                <td>{p.trust_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
