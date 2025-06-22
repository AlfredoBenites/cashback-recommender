credit_cards = {
    "Discover it": {
        "Groceries": 0.05,
        "Gas": 0.01
    },
    "Amex Blue": {
        "Groceries": 0.03,
        "Online Shopping": 0.05
    },
    "Quicksilver": {
        "All": 0.015
    }
}

def recommend_card(transaction):
    category = transaction["category"]
    best_card = None
    max_rate = 0

    for card, categories in credit_cards.items():
        rate = categories.get(category) or categories.get("All") or 0
        if rate > max_rate:
            max_rate = rate
            best_card = card

    return best_card, max_rate
