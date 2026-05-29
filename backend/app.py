from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection

app = Flask(__name__)
CORS(app)

TOTAL_TABLES = 150


# HOME ROUTE
@app.route("/")
def home():
    return jsonify({
        "message": "Restaurant Booking API Running"
    })


# GET ALL BOOKINGS (FROM MYSQL)
@app.route("/api/bookings", methods=["GET"])
def get_bookings():

    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM bookings ORDER BY id DESC")
        data = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# GET BOOKING COUNT
@app.route("/api/bookings/count", methods=["GET"])
def get_booking_count():

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(*) FROM bookings")
        booked = cursor.fetchone()[0]

        cursor.close()
        conn.close()

        return jsonify({
            "bookedTables": booked,
            "totalTables": TOTAL_TABLES,
            "availableTables": TOTAL_TABLES - booked
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# CREATE BOOKING (INSERT INTO MYSQL)
@app.route("/api/bookings", methods=["POST"])
def create_booking():

    data = request.get_json()

    name = data.get("name")
    date = data.get("date")
    time = data.get("time")
    members = data.get("members")

    # VALIDATION
    if not name or not date or not time or members is None:
        return jsonify({"message": "All fields are required"}), 400

    try:
        members = int(members)
        if members <= 0:
            return jsonify({"message": "Members must be greater than 0"}), 400
    except:
        return jsonify({"message": "Members must be a number"}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()

        # CHECK DUPLICATE BOOKING
        cursor.execute("""
            SELECT id FROM bookings
            WHERE name=%s AND date=%s AND time=%s
        """, (name, date, time))

        if cursor.fetchone():
            return jsonify({"message": "You already booked this slot"}), 400

        # INSERT BOOKING
        cursor.execute("""
            INSERT INTO bookings (name, date, time, members)
            VALUES (%s, %s, %s, %s)
        """, (name, date, time, members))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Booking successful"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# DELETE BOOKING
@app.route("/api/bookings/<int:booking_id>", methods=["DELETE"])
def delete_booking(booking_id):

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT id FROM bookings WHERE id=%s", (booking_id,))
        if not cursor.fetchone():
            return jsonify({"message": "Booking not found"}), 404

        cursor.execute("DELETE FROM bookings WHERE id=%s", (booking_id,))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Booking deleted successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )