import { useEffect, useState } from "react";
import client from "../api/client";

export default function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function fetchPackages() {
      const res = await client.get("/packages");
      setPackages(res.data);
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
        </div>
      ))}
    </div>
  );
}
