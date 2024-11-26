import pandas as pd
import geojson
from shapely.wkt import loads
from shapely.geometry import mapping

# Load CSV
data = pd.read_csv(r"C:\Users\sarah\Documents\GitHub\bay-area\Bay_Area_County_Polygons_20241125.csv")

# Convert the_geom (WKT) to GeoJSON
features = []
for _, row in data.iterrows():
    # Parse the_geom as a Shapely geometry
    geometry = loads(row['the_geom'])  # Convert WKT to Shapely geometry

    # Create a GeoJSON feature with properties from other columns
    feature = geojson.Feature(
        geometry=mapping(geometry),  # Convert Shapely geometry to GeoJSON geometry
        properties={
            "OBJECTID": row["OBJECTID"],
            "FIPSSTCO": row["FIPSSTCO"],
            "COUNTY": row["COUNTY"]
        }
    )
    features.append(feature)

# Create a GeoJSON FeatureCollection
geojson_data = geojson.FeatureCollection(features)

# Save to a GeoJSON file
with open("data.geojson", "w") as f:
    geojson.dump(geojson_data, f)

print("GeoJSON file created!")
