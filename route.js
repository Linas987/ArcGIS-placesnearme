import { myLocation } from './yourLocation.js'
import { graphicsArr } from './locationSelectorButton.js'
const routeUrl =
  'https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World'

function compare(a, b) {
  if (a.directions.totalLength < b.directions.totalLength) {
    return -1
  }
  if (a.directions.totalLength > b.directions.totalLength) {
    return 1
  }
  return 0
}

var routes = []

function getRoute(view) {
  var route = require('esri/rest/route')
  var RouteParameters = require('esri/rest/support/RouteParameters')
  var FeatureSet = require('esri/rest/support/FeatureSet')
  routes.forEach((road) => {
    view.graphics.remove(road.route)
  })
  routes = []

  var routesPar = []
  graphicsArr.forEach((destination) => {
    const routeParams = new RouteParameters({
      stops: new FeatureSet({
        features: [myLocation.graphic, destination],
      }),
      returnDirections: true,
    })
    routesPar.push(routeParams)
  })

  routesPar.forEach((routeParams) => {
    route
      .solve(routeUrl, routeParams)
      .then(function (data) {
        data.routeResults.forEach(function (result) {
          result.route.symbol = {
            type: 'simple-line',
            color: [255, 200, 200],
            width: 2,
          }
          view.graphics.add(result.route)
          //console.log(result.directions.totalLength)
          routes.push(result)
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  })
  var checkExist = setInterval(() => {
    if (routes.length == 10) {
      clearInterval(checkExist)
      routes.sort(compare)
      console.log('shortest path', routes[0])
      routes[0].route.symbol = {
        type: 'simple-line',
        color: [176, 224, 230],
        width: 3,
      }
      view.graphics.reorder(routes[0].route, 100)
    }
  }, 100)
}
export default getRoute
