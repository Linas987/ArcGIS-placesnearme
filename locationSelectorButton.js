import { myLocation } from './yourLocation.js'
import getRoute from './route.js'
let graphicsArr = []

function addButton() {
  //location selector button
  const places = ['Hospital', 'Gas station', 'Food', 'Hotel']
  const select = document.createElement('select', '')
  select.id = 'spots'
  select.setAttribute('class', 'esri-widget esri-select')
  select.setAttribute('class', 'button')

  places.forEach(function (p) {
    const selection = document.createElement('option')
    selection.value = p
    selection.innerHTML = p
    select.appendChild(selection)
  })
  return select
  //
}

function findLocations(category, pt, view) {
  var locator = require('esri/rest/locator')
  var Graphic = require('esri/Graphic')

  const locatorUrl =
    'http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer'

  locator
    .addressToLocations(locatorUrl, {
      location: pt,
      categories: [category],
      maxLocations: 10,
      outFields: ['Place_addr', 'PlaceName'],
    })
    .then(function (results) {
      graphicsArr.forEach((graphic) => {
        //console.log(graphic)
        view.graphics.remove(graphic)
      })
      graphicsArr = []

      view.popup.close()

      results.forEach(function (result) {
        //console.log(view.graphics)

        let grap = new Graphic({
          attributes: result.attributes,
          geometry: result.location,
          symbol: {
            type: 'simple-marker',
            color: '#ff0000',
            size: '12px',
            outline: {
              color: '#000000',
              width: '2px',
              isBright: true,
            },
          },

          popupTemplate: {
            title: '{PlaceName}',
            content: '{Place_addr}',
          },
        })
        view.graphics.add(grap)
        graphicsArr.push(grap)
      })
      getRoute(view)
    })
}

function locationSelector(view) {
  var button = addButton()

  view.ui.add(button, 'top-right')

  // Search for places near you
  view.watch('stationary', function (val) {
    if (val) {
      console.log(myLocation.graphic.geometry)
      console.log(view.center)
      findLocations(
        document.getElementById('spots').value,
        myLocation.graphic.geometry,
        view,
      )
    }
  })

  button.addEventListener('change', function (event) {
    findLocations(event.target.value, myLocation.graphic.geometry, view)
  })
}
export { locationSelector, graphicsArr }
