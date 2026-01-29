import { useEffect, useState } from "react";
import client from "../api/client";

export default function Admin() {
  const [data, setData] = useState([]);

  async function fetchDashboard() {
    const res = await client.get("/admin/dashboard");
    setData(res.data);
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function approveDoc(docId) {
    await client.patch(`/admin/approve-document/${docId}`);
    fetchDashboard();
  }

  async function verifyCompany(companyId) {
    await client.patch(`/admin/verify-company/${companyId}`);
    fetchDashboard();
  }

  async function approvePackage(pkgId) {
    await client.patch(`/admin/approve-package/${pkgId}`);
    fetchDashboard();
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Dashboard</h2>

      {data.map((entry) => (
        <div
          key={entry.company.id}
          style={{
            border: "2px solid black",
            padding: 20,
            marginBottom: 20,
          }}
        >
          <h3>{entry.company.name}</h3>
          <p>{entry.company.description}</p>
          <p>
            Verified:{" "}
            {entry.company.verified_status ? "Yes" : "No"}
          </p>

          {/* Documents */}
          <h4>Documents</h4>
          {entry.documents.map((doc) => (
            <div key={doc.id}>
              {doc.doc_type} — Status: {doc.status}
              {doc.status === "pending" && (
                <button onClick={() => approveDoc(doc.id)}>
                  Approve Doc
                </button>
              )}
            </div>
          ))}

          {/* Verify Company */}
          {!entry.company.verified_status && (
            <button onClick={() => verifyCompany(entry.company.id)}>
              Verify Company
            </button>
          )}

          <hr />

          {/* Packages */}
          <h4>Pending Packages</h4>
          {entry.pending_packages.map((pkg) => (
            <div key={pkg.id}>
              {pkg.destination} — ₹{pkg.price}
              <button onClick={() => approvePackage(pkg.id)}>
                Approve Package
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
