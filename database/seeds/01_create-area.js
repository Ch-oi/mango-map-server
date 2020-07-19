
exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex("area").insert([
    { "id": 1, "name": "HK_Island" },
    { "id": 2, "name": "Kowloon" },
    { "id": 3, "name": "New Territories" },
    { "id": 4, "name": "Outlying Island" },
  ])
    .then(function () {
      // Inserts seed entries
      return knex('districts').insert([
        // hk island 
        { id: 1, name: 'central', lat: 22.28, lng: 114.1588, area_id: 1 },
        { id: 2, name: 'wan-chai', lat: 22.276, lng: 114.1751, area_id: 1 },
        { id: 3, name: 'causeway-ba', lat: 22.2860, lng: 114.1915, area_id: 1 },
        { id: 4, name: 'north-point', lat: 22.2885, lng: 114.1928, area_id: 1 },
        // kowloon 
        { id: 5, name: 'tsim-sha-tsu', lat: 22.2988, lng: 114.1722, area_id: 2 },
        { id: 6, name: 'mong-kok', lat: 22.3204, lng: 114.1698, area_id: 2 },
        { id: 7, name: 'kwun-tong', lat: 22.3104, lng: 114.2227, area_id: 2 },
        { id: 8, name: 'tsuen-wan', lat: 22.3699, lng: 114.1144, area_id: 2 },
        // new territories 
        { id: 9, name: 'sha-tin', lat: 22.381543, lng: 114.187728, area_id: 3 },
        { id: 10, name: 'tai-po', lat: 22.4423, lng: 114.1655, area_id: 3 },
        { id: 11, name: 'tuen-mun', lat: 22.3908, lng: 113.9725, area_id: 3 },
        { id: 12, name: 'yuen-long', lat: 22.4445, lng: 114.0222, area_id: 3 },
        // outlying island 
        { id: 13, name: 'lantau-islan', lat: 22.293608, lng: 114.015598, area_id: 4 },
        { id: 14, name: 'lamma-island', lat: 22.225928, lng: 114.112478, area_id: 4 },
        { id: 15, name: 'cheung-cha', lat: 22.2016, lng: 114.0265, area_id: 4 },
      ]);
    });
};
