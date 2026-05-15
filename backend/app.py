from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection

app = Flask(__name__)
CORS(app)

@app.route("/api/reservations", methods=["GET"])
def reservations():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM reservations")

    data = cursor.fetchall()

    conn.close()

    return jsonify(data)

@app.route("/api/reserve", methods=["POST"])
def reserve():

    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO reservations (name, time, people) VALUES (%s,%s,%s)",
        (
            data["name"],
            data["time"],
            data["people"]
        )
    )

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Reservation Booked Successfully"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
