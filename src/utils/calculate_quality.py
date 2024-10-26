import json
import statistics


def extract_reviews_and_rating(filename: str) -> tuple[list[int]]:
    num_reviews = []
    ratings = []
    try:
        with open(filename, "r") as f:
            data = json.load(f)
        for obj in data:
            num_reviews.append(obj.get("numReviews"))
            ratings.append(obj.get("rating"))
        return num_reviews, ratings

    except FileNotFoundError:
        print(f"File '{filename}' not found.")
        return ([], [])

    except json.JSONDecodeError:
        print(f"Error parsing JSON file '{filename}'.")
        return ([], [])


def calculate_quality(
    num_reviews: list[int], ratings: list[float], m: float
) -> list[float]:
    C = statistics.quantiles(num_reviews, n=4)[0]
    quality = []
    for n, r in zip(num_reviews, ratings):
        q = (n * r + C * m) / (n + C)
        quality.append(q)
    return quality

def write_quality(filename: str, quality) -> None:
    with open(filename, 'r') as f:
        data = json.load(f)

    for i,obj in enumerate(data):
        obj['quality'] = quality[i]

    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)


if __name__ == "__main__":
    marker_info_file = "./src/components/MarkerInfo.json"
    num_reviews, ratings = extract_reviews_and_rating(marker_info_file)
    quality = calculate_quality(num_reviews, ratings, m=3.7)
    write_quality(marker_info_file,quality)
    
