import { useEffect, useState } from "react";
import client from "../api/client";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [reviewingId, setReviewingId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewStatus, setReviewStatus] = useState({});

  async function loadBookings() {
    const res = await client.get("/bookings/my");
    setBookings(res.data);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function confirmBooking(id) {
    await client.patch(`/bookings/user/${id}/confirm`);
    alert("Booking confirmed completed");
    loadBookings();
  }

  async function submitReview(bookingId) {
    await client.post("/reviews", {
      booking_id: bookingId,
      rating: rating,
      comment: comment,
    });

    alert("Review submitted");
    setReviewingId(null);
    setComment("");
    loadBookings();
  }

  async function loadBookings() {
    const res = await client.get("/bookings/my");
    setBookings(res.data);

    // Check review status for completed bookings
    const statusMap = {};

    for (let b of res.data) {
      if (b.status === "completed") {
        const r = await client.get(`/reviews/booking/${b.id}`);
        statusMap[b.id] = r.data.exists;
      }
    }

    setReviewStatus(statusMap);
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b.id}
            style={{
              border: "1px solid gray",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <p>Booking ID: {b.id}</p>
            <p>Status: {b.status}</p>

            {b.status === "awaiting_user_confirmation" && (
              <button onClick={() => confirmBooking(b.id)}>
                Confirm Trip Completed
              </button>
            )}

            {b.status === "completed" && (
              <>
                {reviewStatus[b.id] ? (
                  <p>✅ Review Submitted</p>
                ) : (
                  <button onClick={() => setReviewingId(b.id)}>
                    Leave Review
                  </button>
                )}
              </>
            )}
            {reviewingId === b.id && (
              <div style={{ marginTop: 10 }}>
                <h4>Submit Review</h4>

                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Poor</option>
                  <option value={1}>1 - Bad</option>
                </select>

                <br /><br />

                <input
                  placeholder="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <br /><br />

                <button onClick={() => submitReview(b.id)}>
                  Submit Review
                </button>
              </div>
            )}

          </div>
        ))
      )}
    </div>
  );
}
