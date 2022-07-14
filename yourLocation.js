let myLocation
function setYourLocation(view) {
  var Locate = require('esri/widgets/Locate')
  //set your own location
  const locate = new Locate({
    view: view,
    useHeadingEnabled: false,
    goToOverride: function (view, options) {
      options.target.scale = 6000
      return view.goTo(options.target)
    },
  })
  //console.log(locate)
  myLocation = locate

  view.when(function () {
    let locateWidget = locate

    view.ui.add(locateWidget, 'top-left')

    locateWidget.locate()

    locateWidget.on('locate', function (locateEvent) {
      console.log(locateEvent)
    })
  })
}
export { setYourLocation, myLocation }
