import pandas as pd
from pymongo import MongoClient
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

client = MongoClient("mongodb://localhost:27017/")
db = client["pizza"]

pizzas = pd.DataFrame(list(db.pizzas.find()))
ingredients = pd.DataFrame(list(db.ing.find()))
print("Fetched columns:", pizzas.columns)
mlb = MultiLabelBinarizer()
ingredient_columns = mlb.fit_transform(pizzas['Ings'])
ingredient_df = pd.DataFrame(ingredient_columns, columns=mlb.classes_)

pizza_data = pd.concat([pizzas["_id"], ingredient_df], axis=1)
pizza_data.columns = ["PizzaID"] + [f"Ing_{ing_id}" for ing_id in mlb.classes_]

pizza_data.to_csv("preprocessed_data.csv", index=False)
print("Data preprocessed and saved as preprocessed_data.csv")

data = pd.read_csv("preprocessed_data.csv")

data["Ordered"] = data["PizzaID"].apply(
    lambda x: 1 if x in ["some_pizza_id1", "some_pizza_id2"] else 0
)

X = data.drop(columns=["PizzaID", "Ordered"])
y = data["Ordered"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

joblib.dump(model, "pizza_recommendation_model.pkl")
print("Model trained and saved as pizza_recommendation_model.pkl")