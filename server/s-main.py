from flask import Flask, request
from datetime import datetime, timedelta
import random


app = Flask(__name__)

mock_images = ["mock1.jpg"]


def mock_dates(from_date, to_date):
    start_date = datetime.strptime(from_date, "%d-%m-%Y")
    end_date = datetime.strptime(to_date, "%d-%m-%Y")

    days_between = (end_date - start_date).days

    num_dates = random.randint(0, days_between)

    random_days = sorted(random.sample(range(days_between + 1), num_dates))

    random_dates = [
        (start_date + timedelta(days=day)).strftime("%d-%m-%Y") for day in random_days
    ]

    return random_dates


def mock_bounding_box():
    image_width = 800
    image_height = 455
    min_width = 40
    min_height = 40
    max_width = 300
    max_height = 300

    box_width = random.randint(min_width, max_width)
    box_height = random.randint(min_height, max_height)

    # Ensure the bounding box fits within the image dimensions
    max_x = image_width - box_width
    max_y = image_height - box_height

    x = random.randint(0, max_x)
    y = random.randint(0, max_y)

    return {"x": x, "y": y, "width": box_width, "height": box_height}


def create_mock_data(id, latitude, longitude, date):
    image_index = id % len(mock_images)
    return {
        "id": id,
        "latitude": latitude,
        "longitude": longitude,
        "date": date,
        "coordinates": [mock_bounding_box() for _ in range(random.randint(0, 4))],
        "thumbnailUrl": mock_images[image_index],
        "viewUrl": mock_images[image_index],
        "originalUrl": mock_images[image_index],
    }


def mock_data(latitude, longitude, from_date, to_date):
    data = []
    dates = mock_dates(from_date, to_date)

    for id, date in enumerate(dates):
        data.append(create_mock_data(id, latitude, longitude, date))

    return data


@app.route("/api")
def get_images():
    """
    Endpoint to retrieve image spill objects based on geographical coordinates and date range.

    This endpoint accepts four query parameters: `latitude`, `longitude`, `from_date`, and `to_date`.
    It returns an array of image objects with details including coordinates and URLs.

    Query Parameters:
    - `latitude` (str): Latitude of the location.
    - `longitude` (str): Longitude of the location.
    - `from_date` (str): Start date of the date range (format: DD-MM-YYYY).
    - `to_date` (str): End date of the date range (format: DD-MM-YYYY).

    Returns:
    - JSON: Array of image objects. Each image object contains:
        - `id` (int): Unique identifier for the image.
        - `latitude` (str): Latitude of the image location.
        - `longitude` (str): Longitude of the image location.
        - `date` (str): Date when the image was taken (format: DD-MM-YYYY).
        - `coordinates` (list): List of oil spill coordinates, each with:
            - `x` (int): X position.
            - `y` (int): Y position.
            - `width` (int): Width of the bounding box.
            - `height` (int): Height of the bounding box.
        - `thumbnailUrl` (str): URL to the thumbnail version of the image.
        - `viewUrl` (str): URL to the view version of the image.
        - `originalUrl` (str): URL to the original version of the image.

    Note:
    - There may be a delay in retrieving the information.
    - If any of the query parameters are missing or invalid, the endpoint returns a 404 status code.

    """
    latitude = request.args.get("lat")
    longitude = request.args.get("lon")
    from_date = request.args.get("from")
    to_date = request.args.get("to")

    if latitude and longitude and from_date and to_date:
        return mock_data(latitude, longitude, from_date, to_date)

    return "", 404


@app.route("/api/<int:id>")
def get_image(id):
    mock_latitude = 22.29323
    mock_longitude = 92.85323
    mock_date = "20-04-2024"

    return create_mock_data(id, mock_latitude, mock_longitude, mock_date)


app.run(port=5001, debug=True)
