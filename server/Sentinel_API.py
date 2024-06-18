#!./.venv/bin/python
# coding: utf-8

# In[1]:


# for working with geospatial data and making HTTP requests

from datetime import date, timedelta
import requests
import pandas as pd
import geopandas as gpd
from shapely.geometry import shape
import os


# ## Function to retrieve access token from  Keycloak server, which is an open-source identity and access management (IAM) system.

# In[2]:


def get_keycloak(username: str, password: str) -> str:
    '''to retrieve an access token from a Keycloak server'''
    print(f"Username: {username}, Password: {password}")  # Debugging statement
    
    # creates a dictionary named data - contains the information that will be sent in the POST request to the Keycloak server 
    data = {
        "client_id": "cdse-public",
        "username": username,
        "password": password,
        "grant_type": "password",
    }
    
    #try-except structure to handle potential errors during the process of requesting the access token
    try:
        r = requests.post(
            "https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token",
            data=data,
        )
        r.raise_for_status()
    except Exception as e:
        raise Exception(
            f"Keycloak token creation failed. Response from the server was: {r.json()}"
        )
    return r.json()["access_token"]


# In[3]:


get_ipython().run_line_magic('pinfo2', 'get_keycloak')


# ## Retrieves information about Sentinel-2 satellite datasets from the Copernicus Open Access Hub using a bounding box filter and date range.

# In[3]:


# Variables containing Copernicus Open Access Hub credentials
copernicus_user = "21ssds415008@msruas.ac.in" 
copernicus_password = "Myresearch@2021"  

data_collection = "SENTINEL-2"  # Sentinel 2 - satellite data

# Coordinates of Area of interest - The polygon defines the bounding box of your area of interest.
ft='POLYGON ((57.692102513344906 -20.35226228118077, 57.692102513344906 -20.4745116407249, 57.77699025382094 -20.4745116407249, 57.77699025382094 -20.35226228118077, 57.692102513344906 -20.35226228118077))'

#data_collection = "SENTINEL-2" # Sentinel satellite

# Date Range
today = date(2020,8,6)
today_string = today.strftime("%Y-%m-%d")
yesterday = today - timedelta(days=7)
yesterday_string = yesterday.strftime("%Y-%m-%d")

#GET requests are a fundamental method in HTTP communication and are used to retrieve data from a server(endpoint)
json_ = requests.get(
    f"https://catalogue.dataspace.copernicus.eu/odata/v1/Products?$filter=Collection/Name eq '{data_collection}' and OData.CSC.Intersects(area=geography'SRID=4326;{ft}') and ContentDate/Start gt {yesterday_string}T00:00:00.000Z and ContentDate/Start lt {today_string}T00:00:00.000Z&$count=True&$top=1000"
).json()

p = pd.DataFrame.from_dict(json_["value"])  # Fetch available dataset


# ## Processes the retrieved Sentinel-2 dataset information and attempts to download the data for tiles identified as L2A products

# In[4]:


if p.shape[0] > 0:
    #process the geometric information
    p["geometry"] = p["GeoFootprint"].apply(shape)
    productDF = gpd.GeoDataFrame(p).set_geometry("geometry")  # Convert PD to GPD
    
    #selects Sentinel-2 L2A products and removes L1C products
    productDF = productDF[~productDF["Name"].str.contains("L1C")]  # Remove L1C dataset
    
    #total number of L2A tiles after filtering
    print(f"Total L2A tiles found {len(productDF)}")
    # total number of features(rows) in the GeoDataFrame
    productDF["identifier"] = productDF["Name"].str.split(".").str[0]
    allfeat = len(productDF)

    #Downloading Tiles (if tiles exist)
    if allfeat == 0:
        print("No tiles found for today")
    else:
        # Download all tiles from server
        for index, feat in enumerate(productDF.iterfeatures()):
            try:
                #object to manage cookies and headers across requests
                session = requests.Session()
                
                #access token for authentication with the Copernicus server.
                keycloak_token = get_keycloak(copernicus_user, copernicus_password)
                session.headers.update({"Authorization": f"Bearer {keycloak_token}"})
                
                #Construct the download URL for the current feature's product ID
                url = f"https://catalogue.dataspace.copernicus.eu/odata/v1/Products({feat['properties']['Id']})/$value"
                response = session.get(url, allow_redirects=False)
                #handles redirects
                while response.status_code in (301, 302, 303, 307):
                    url = response.headers["Location"]
                    response = session.get(url, allow_redirects=False)
                print(feat["properties"]["Id"])
                file = session.get(url, verify=False, allow_redirects=True)

                with open(
                    # Location to save zip from Copernicus
                    f"{feat['properties']['identifier']}.zip","wb") as p:
                    print(feat["properties"]["Name"])
                    p.write(file.content)
            # Print an error message if any exception occurs during download
            except Exception as e:
                print(f"Error downloading tile: {e}")
else:
    print("No data found")


# ## Accessing ZIP File and vizualisation

# In[ ]:


from zipfile import ZipFile
import matplotlib.pyplot as plt


import cv2
import numpy as np


# In[ ]:


with ZipFile('S2A_MSIL2A_20200801T062451_N0500_R091_T40KEC_20230413T211517.zip', 'r') as zip_ref:
  for filename in zip_ref.namelist():
    if filename.lower().endswith('.jp2'):
      with zip_ref.open(filename) as file_object:
        image_data = file_object.read()
      # Assuming enabled Jasper library
      img = cv2.imdecode(np.frombuffer(image_data, np.uint8), -1)
      plt.imshow(img)
      plt.show()


# In[ ]:




with ZipFile('S2A_MSIL2A_20200801T062451_N0214_R091_T40KEC_20200801T092315.zip', 'r') as zip_ref:
  for filename in zip_ref.namelist():
    if filename.lower().endswith('.jp2'):
      with zip_ref.open(filename) as file_object:
        image_data = file_object.read()
      # Assuming enabled Jasper library
      img = cv2.imdecode(np.frombuffer(image_data, np.uint8), -1)
      plt.imshow(img)
      plt.show()


# In[ ]:


with ZipFile('.zip', 'r') as zip_ref:
  for filename in zip_ref.namelist():
    if filename.lower().endswith('.jp2'):
      with zip_ref.open(filename) as file_object:
        image_data = file_object.read()
      # Assuming enabled Jasper library
      img = cv2.imdecode(np.frombuffer(image_data, np.uint8), -1)
      plt.imshow(img)
      plt.show()


# In[ ]:



import cv2
import numpy as np


with ZipFile('S2A_MSIL2A_20200831T062451_N0500_R091_T40KEC_20230403T074826.zip', 'r') as zip_ref:
  for filename in zip_ref.namelist():
    if filename.lower().endswith('.jp2'):
      with zip_ref.open(filename) as file_object:
        image_data = file_object.read()
      # Assuming enabled Jasper library
      img = cv2.imdecode(np.frombuffer(image_data, np.uint8), -1)
      plt.imshow(img)
      plt.show()


# In[ ]:


from zipfile import ZipFile
import matplotlib.pyplot as plt

import cv2
import numpy as np


with ZipFile('S2B_MSIL2A_20200816T062449_N0214_R091_T40KEC_20200816T075626.zip', 'r') as zip_ref:
  for filename in zip_ref.namelist():
    if filename.lower().endswith('.jp2'):
      with zip_ref.open(filename) as file_object:
        image_data = file_object.read()
      # Assuming enabled Jasper library
      img = cv2.imdecode(np.frombuffer(image_data, np.uint8), -1)
      plt.imshow(img)
      plt.show()


# ## SentinelSat - Paid

# In[ ]:


# Import libraries
import sentinelsat

# Define your product type (e.g., 'S2A_L2A') and area of interest (latitude, longitude)
product_type = 'S2A_L2A'
latitude = 40.7128  # Example latitude (replace with your desired location)
longitude = -74.0059  # Example longitude (replace with your desired location)

# Create a download object
downloader = sentinelsat.Sentinel2API('your_api_key')  # Replace with your actual API key

# Search for Sentinel-2 data
data = downloader.query(latitude, longitude, date=('2023-05-01', '2023-05-02'))

# Check if any data was found
if data:
  # Get the first available product
  product = data[0]

  # Print basic product information
  print(f"Product ID: {product['title']}")
  print(f"Acquisition Date: {product['ingestiondate']}")
  print(f"Cloud Cover Percentage: {product['cloudcoverpercentage']}")

  # Download the product (uncomment to download, modify path as needed)
  # downloader.download(product, download_directory='/path/to/download')

else:
  print("No Sentinel-2 data found for the specified criteria.")