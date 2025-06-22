from flask import Flask, render_template, request
from creditcards import recommend_card

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        amount = float(request.form["amount"])
        category = request.form["category"].title().replace("-", " ")
        print("Category received:", category)  # 🔍 debug line
        best_card, rate = recommend_card({"category": category, "amount": amount})
        print(recommend_card({"category": "Groceries", "amount": 100}))
        return render_template("index.html", result=f"You should use {best_card} for {rate*100:.1f}% cashback!")
    return render_template("index.html", result=None)

if __name__ == "__main__":
    app.run(debug=True)
