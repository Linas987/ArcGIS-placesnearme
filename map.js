import { setYourLocation } from './yourLocation.js'
import { locationSelector } from './locationSelectorButton.js'
require([
  'esri/config',
  'esri/Map',
  'esri/views/MapView',
  'esri/widgets/Locate',
  'esri/rest/locator',
  'esri/Graphic',
  'esri/layers/GraphicsLayer',
  'esri/rest/route',
  'esri/rest/support/RouteParameters',
  'esri/rest/support/FeatureSet',
], function (
  esriConfig,
  Map,
  MapView,
  Locate,
  locator,
  Graphic,
  GraphicsLayer,
  route,
  RouteParameters,
  FeatureSet,
) {
  esriConfig.apiKey =
    'AAPKb6146276e381410eab2b841756090688fEWyY9P4AUziRHrBg8f98642HVUej9kplkYlIKkgZksEzRJEYWg7jfh07P4YWxBW'

  //basic view
  const map = new Map({
    basemap: 'arcgis-navigation', // Basemap layer service
  })

  const view = new MapView({
    map: map,
    center: [0, 0], // Longitude, latitude
    zoom: 13, // Zoom level
    container: 'viewDiv', // Div element
  })
  //
  setYourLocation(view)
  locationSelector(view)
})
