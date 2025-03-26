from flask import Flask, request, jsonify
import pandas as pd
import joblib
import random

app = Flask(__name__)

model = joblib.load("pizza_recommendation_model.pkl")
data = pd.read_csv("preprocessed_data.csv")

#"http://127.0.0.1:5000/random-recommend?count=3"
@app.route("/random-recommend", methods=["GET"])
def random_recommend():
    num_recommendations = int(request.args.get("count", 5))  # Default to 5 random pizzas
    random_pizzas = data.sample(n=num_recommendations)
    return jsonify({"random_pizzas": random_pizzas["PizzaID"].tolist()})

app.run(debug=True)