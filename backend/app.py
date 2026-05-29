from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

TOTAL_TABLES = 150

# Temporary in-memory storage
bookings = [
    {
        "id": 1,
        "name": "Ashvitha",
        "date": "2026-05-28",
        "time": "08:00 PM",
        "members": 4
    }
]


# HOME ROUTE
@app.route("/")
def home():
    return jsonify({
        "message": "Restaurant Booking API Running"
    })


# GET BOOKING COUNT
@app.route("/api/bookings/count", methods=["GET"])
def get_booking_count():

    return jsonify({
        "bookedTables": len(bookings),
        "totalTables": TOTAL_TABLES,
        "availableTables": TOTAL_TABLES - len(bookings)
    })


# GET ALL BOOKINGS
@app.route("/api/bookings", methods=["GET"])
def get_bookings():

    return jsonify(bookings)


# CREATE BOOKING
@app.route("/api/bookings", methods=["POST"])
def create_booking():

    data = request.get_json()

    name = data.get("name")
    date = data.get("date")
    time = data.get("time")
    members = data.get("members")

    # VALIDATION
    if not name or not date or not time or members is None:
        return jsonify({
            "message": "All fields are required"
        }), 400

    try:
        members = int(members)

        if members <= 0:
            return jsonify({
                "message": "Members must be greater than 0"
            }), 400

    except ValueError:
        return jsonify({
            "message": "Members must be a number"
        }), 400

    # CHECK TABLE LIMIT
    if len(bookings) >= TOTAL_TABLES:
        return jsonify({
            "message": "All tables are booked"
        }), 400

    # CHECK DUPLICATE BOOKING
    for booking in bookings:

        if (
            booking["name"] == name and
            booking["date"] == date and
            booking["time"] == time
        ):

            return jsonify({
                "message": "You already booked this slot"
            }), 400

    # CREATE NEW BOOKING
    new_booking = {
        "id": len(bookings) + 1,
        "name": name,
        "date": date,
        "time": time,
        "members": members
    }

    bookings.append(new_booking)

    return jsonify({
        "message": "Booking successful",
        "booking": new_booking
    }), 201


# DELETE BOOKING
@app.route("/api/bookings/<int:booking_id>", methods=["DELETE"])
def delete_booking(booking_id):

    global bookings

    booking_exists = any(
        booking["id"] == booking_id
        for booking in bookings
    )

    if not booking_exists:
        return jsonify({
            "message": "Booking not found"
        }), 404

    bookings = [
        booking for booking in bookings
        if booking["id"] != booking_id
    ]

    return jsonify({
        "message": "Booking deleted successfully"
    })


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
