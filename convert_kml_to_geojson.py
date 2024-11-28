import geopandas as gpd
import fiona

# Load the KML file
input_kml = r"C:\Users\sarah\Documents\GitHub\bay-area\data\bus_routes\doc.kml"
#output_geojson = r"C:\Users\sarah\Documents\GitHub\bay-area\data\bus_routes.geojson"

# Inspect available layers
##with fiona.Env():
    ##layers = fiona.listlayers(input_kml)
    ##print("Available layers:", layers)

# Load Stations layer
stations = gpd.read_file(input_kml, layer="Bart Station")
stations.to_file(r"C:\Users\sarah\Documents\GitHub\bay-area\static\data\stations.geojson", driver="GeoJSON")

# Load Routes layer
routes = gpd.read_file(input_kml, layer="BART Track")
routes.to_file(r"C:\Users\sarah\Documents\GitHub\bay-area\static\data\routes.geojson", driver="GeoJSON")

print("Layers converted to GeoJSON!")


# Read the KML file
##data = gpd.read_file(input_kml, driver='KML')

# Save to GeoJSON
##data.to_file(output_geojson, driver="GeoJSON")

##print(f"Conversion complete! GeoJSON saved to {output_geojson}")
