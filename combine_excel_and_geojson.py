import pandas as pd
import geopandas as gpd

# Paths to your files
geojson_path = r"C:\Users\sarah\Documents\GitHub\bay-area\data\stations.geojson"
excel_path = r"C:\Users\sarah\Documents\GitHub\bay-area\data\~$distances.xlsx"
output_geojson_path = r"C:\Users\sarah\Documents\GitHub\bay-area\data\stations_updated.geojson"

# Load GeoJSON as GeoDataFrame
stations_gdf = gpd.read_file(geojson_path)

# Load Excel as DataFrame
excel_data = pd.read_excel(excel_path)

# Merge data: Match on the 'Name' column
# Adjust the key column names if needed
merged_gdf = stations_gdf.merge(excel_data, on="Name", how="left")

# Save the updated GeoJSON with the new property
merged_gdf.to_file(output_geojson_path, driver="GeoJSON")

print(f"Updated GeoJSON saved to {output_geojson_path}")
