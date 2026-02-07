import { useEffect, useState } from "react";
import client from "../api/client";
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
} from "lucide-react"; 

export default function CompanyDashboard() {
  const [company, setCompany] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [docType, setDocType] = useState("PAN");
  const [fileUrl, setFileUrl] = useState("");

  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [inclusions, setInclusions] = useState("");

  const [myPackages, setMyPackages] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);

  async function loadCompany() {
    const res = await client.get("/companies/me");

    if (res.data.exists) {
      setCompany(res.data.company);

      const pkgRes = await client.get("/companies/me/packages");
      setMyPackages(pkgRes.data);

      const bRes = await client.get("/bookings/company/pending");
      setPendingBookings(bRes.data);

    }
  }

  useEffect(() => {
    loadCompany();
  }, []);

  async function createProfile() {
    await client.post("/companies", {
      name,
      description,
    });

    alert("Company profile created");
    loadCompany();
  }

  async function uploadDocument() {
    await client.post(`/companies/${company.id}/documents`, {
      doc_type: docType,
      file_url: fileUrl,
    });

    alert("Document uploaded");
    setFileUrl("");
  }

  async function createPackage() {
    try {
      await client.post("/packages", {
        destination,
        price: Number(price),
        duration: Number(duration),
        inclusions,
      });

      alert("Package created (pending admin approval)");

      setDestination("");
      setPrice("");
      setDuration("");
      setInclusions("");
    } catch (err) {
      alert("Package creation failed (company not verified?)");
    }
  }

  if (!company) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Create Company Profile</h2>

        <input
          placeholder="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <button onClick={createProfile}>Create Profile</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Company Dashboard</h2>

      <h3>{company.name}</h3>
      <p>{company.description}</p>

      <p>
        Verified Status:{" "}
        {company.verified_status ? "✅ Verified" : "❌ Pending"}
      </p>

      <hr />

      <h3>Upload Document</h3>

      <select
        value={docType}
        onChange={(e) => setDocType(e.target.value)}
      >
        <option value="PAN">PAN</option>
        <option value="LICENSE">LICENSE</option>
        <option value="GST_CERTIFICATE">GST Certificate</option>
      </select>

      <br /><br />

      <input
        placeholder="File URL (dummy)"
        value={fileUrl}
        onChange={(e) => setFileUrl(e.target.value)}
      />

      <br /><br />

      <button onClick={uploadDocument}>Upload</button>

      <hr />
        {company.verified_status ? (
          <>
            <h3>Create Travel Package</h3>

            <input
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <br /><br />

            <input
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br /><br />

            <input
              placeholder="Duration (days)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <br /><br />

            <input
              placeholder="Inclusions"
              value={inclusions}
              onChange={(e) => setInclusions(e.target.value)}
            />
            <br /><br />

            <button onClick={createPackage}>Create Package</button>
          </>
        ) : (
          <p style={{ color: "red" }}>
            You must be verified before creating packages.
          </p>
        )}

        <hr />
        <h3>My Packages</h3>

        {myPackages.length === 0 ? (
          <p>No packages created yet.</p>
        ) : (
          myPackages.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid gray",
                padding: 10,
                marginBottom: 10,
              }}
            >
              <b>{p.destination}</b> — ₹{p.price} — {p.duration} days  
              <p>Status: {p.status.toUpperCase()}</p>
            </div>
          ))
        )}
        <hr/>
        <h3>Pending Bookings</h3>
        {pendingBookings.length === 0 ? (
          <p>No pending bookings.</p>
        ) : ( pendingBookings.map((b) => (
            <div key={b.id}>
              Booking #{b.id} (User {b.user_id})
              <button
                onClick={async () => {
                  await client.patch(`/bookings/company/${b.id}/mark-done`);
                  alert("Marked completed");
                  loadCompany();
                }}
              >
                Mark Trip Done
              </button>
            </div>
          )))
        }
    </div>
  );
}
