from app.db.database import SessionLocal
from app.db.models.booking import Booking

db = SessionLocal()

booking = Booking(user_id=4, package_id=2, status="completed")
db.add(booking)
db.commit()

print("Booking created with ID:", booking.id)

db.close()
