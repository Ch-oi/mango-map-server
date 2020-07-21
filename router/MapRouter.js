const router = require('express').Router();

class MapRouter {
  constructor(mapService) {
    this.mapService = mapService;
    this.router = router;
  }

  route() {
    this.router.get('/area', this.listAreas.bind(this));
    this.router.get('/districts', this.listDistricts.bind(this));
    this.router.get('/district/:id', this.getAreaDistricts.bind(this));
    this.router.get('/districtUsers/:id', this.getDistrictUsers.bind(this));
    this.router.post('/district', this.addDistrict.bind(this));

    return this.router;
  }

  listAreas(req, res) {
    return this.mapService
      .listAreas()
      .then((areas) => res.send(areas))
      .catch((err) => console.log(err));
  }

  listDistricts(req, res) {
    return this.mapService
      .listDistricts()
      .then((districts) => res.send(districts))
      .catch((err) => console.log(err));
  }

  getAreaDistricts(req, res) {
    let area_id = req.params.id;

    return this.mapService
      .getAreaDistricts(area_id)
      .then((districts) => res.send(districts))
      .catch((err) => console.log(err));
  }

  getDistrictUsers(req, res) {
    let district_id = req.params.id;

    return this.mapService
      .getDistrictUsers(district_id)
      .then((districtUsers) => {
        this.mapService.getDistrictUserBlogs(districtUsers);
      })
      .then((districtUsersBlogs) => res.send(districtUsersBlogs))
      .catch((err) => console.log(err));
  }

  addDistrict(req, res) {
    let new_district = { ...req.body };

    return this.mapService
      .addDistrict(new_district)
      .then((newDistrict) => res.send(newDistrict))
      .catch((err) => console.log(err));
  }
}

module.exports = MapRouter;
