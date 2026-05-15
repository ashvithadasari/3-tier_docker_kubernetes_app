from flask import Flask, request, jsonify
from db import get_connection

app = Flask(__name__)

@app.route("/health")
def health():
    return {"status": "Backend running"}

@app.route("/reserve", methods=["POST"])
def reserve():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO reservations (name, time, people) VALUES (%s,%s,%s)",
        (data["name"], data["time"], data["people"])
    )

    conn.commit()
    return {"message": "Success"}

@app.route("/reservations")
def get_all():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM reservations")
    return jsonify(cursor.fetchall())

app.run(host="0.0.0.0", port=5000)