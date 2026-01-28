import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";

export default function Company() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      const res = await client.get(`/companies/${id}`);
      setCompany(res.data);

      const scoreRes = await client.get(
        `/trust/companies/${id}/trust-score`
      );
      setScore(scoreRes.data.trust_score);
    }

    fetchCompany();
  }, [id]);

  if (!company) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <p>Verified: {company.verified_status ? "Yes" : "No"}</p>

      <h3>Trust Score: {score}%</h3>
    </div>
  );
}
