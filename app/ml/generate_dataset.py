import random
import pandas as pd

ROWS = 5000

def generate_row():
    company_age = random.randint(0, 2000)

    doc_completion = random.choice([0.0, 0.33, 0.67, 1.0])

    avg_rating = round(random.uniform(1.0, 5.0), 1)

    rating_variance = round(random.uniform(0.0, 2.0), 2)

    cancellation_rate = round(random.uniform(0.0, 0.6), 2)

    price_deviation = round(random.uniform(0.0, 1.5), 2)

    # Logical labeling rule
    trust = 1 if (
        doc_completion >= 0.67 and
        avg_rating >= 3.5 and
        cancellation_rate < 0.3 and
        price_deviation < 0.8
    ) else 0

    return {
        "company_age": company_age,
        "doc_completion": doc_completion,
        "avg_rating": avg_rating,
        "rating_variance": rating_variance,
        "cancellation_rate": cancellation_rate,
        "price_deviation": price_deviation,
        "trustworthy": trust
    }


data = [generate_row() for _ in range(ROWS)]

df = pd.DataFrame(data)
df.to_csv("trust_dataset.csv", index=False)

print("Dataset generated: trust_dataset.csv")
