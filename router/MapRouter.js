const router = require('express').Router();

class MapRouter {
  constructor(mapService) {
    this.mapService = mapService;
    this.router = router;
  }

  route() {
    this.router.get('/area', this.listDistricts.bind(this));
    this.router.get('/districts', this.listDistricts.bind(this));
    this.router.get('/locations', this.listLocations.bind(this));
    this.router.get('/district/:id', this.getAreaDistricts.bind(this));
    this.router.get('/location/:id', this.getLocation.bind(this));
    this.router.post('/district', this.addLocation.bind(this));
    this.router.post('/location/:uid/:lid/images', this.addLocationImages.bind(this));

    return this.router;
  }



  addLocationImages(req, res) {
    let user_id = req.params.uid
    let location_id = req.params.lid
    let urls = req.body.images_url
    return this.mapService
      .addLocationImages(urls,user_id,location_id)
      .then((images) => res.send(images))
      .catch((err) => console.log(err));
  }

  listDistricts(req, res) {
    return this.mapService
      .listDistricts()
      .then((areas) => res.send(areas))
      .catch((err) => console.log(err));
  }

  listLocations(req, res) {
    return this.mapService
      .listLocations()
      .then((locations) => res.send(locations))
      .catch((err) => console.log(err));
  }

  listLocations(req, res) {
    return this.mapService
      .listLocations()
      .then((locations) => res.send(locations))
      .catch((err) => console.log(err));
  }

  getAreaDistricts(req, res) {
    let area_id = req.params.id;

    return this.mapService
      .getDistrictLocations(area_id)
      .then((locations) => res.send(locations))
      .catch((err) => console.log(err));
  }

  getLocation(req, res) {
    let location_id = req.params.id;

    return this.mapService
      .getLocation(location_id)
      .then((location) => res.send(location))
      .catch((err) => console.log(err));
  }

  addLocation(req, res) {
    let new_location = { ...req.body };

    return this.mapService
      .addLocation(new_location)
      .then((newLocation) => res.send(newLocation))
      .catch((err) => console.log(err));
  }
}

module.exports = MapRouter;
