
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
        { id: 1, en: 'central', cn: '中環',lat: 22.28, lng: 114.1588, area_id: 1 },
        { id: 2, en: 'wan-chai', cn: '灣仔',lat: 22.276, lng: 114.1751, area_id: 1 },
        { id: 3, en: 'causeway-bay', cn: '銅鑼灣',lat: 22.2860, lng: 114.1915, area_id: 1 },
        { id: 4, en: 'north-point', cn: '北角',lat: 22.2885, lng: 114.1928, area_id: 1 },
        {
          id: 16,
          en: 'Art Lane',
          cn: '上環壁畫街',
          lat: 22.287205,
          lng: 114.141428,
          description: 'Lion Rock',
        },
        {
          id: 17,
          en: 'Western District Waterfront Pier',
          cn: '西環貨運碼頭',
          lat: 22.288323,
          lng: 114.1329424,
          description: 'Lion Rock',
        },
        {
          id: 19,
          en: 'Tai Kwun',
          cn: '大館',
          lat: 22.2813657,
          lng: 114.1517856,
          description: 'Lion Rock',
        },
        // kowloon 
        { id: 5, en: 'tsim-sha-tsu', cn: '尖沙嘴',lat: 22.2988, lng: 114.1722, area_id: 2 },
        { id: 6, en: 'mong-kok', cn: '旺角',lat: 22.3204, lng: 114.1698, area_id: 2 },
        { id: 7, en: 'kwun-tong', cn: '觀塘',lat: 22.3104, lng: 114.2227, area_id: 2 },
        { id: 8, en: 'tsuen-wan', cn: '荃灣',lat: 22.3699, lng: 114.1144, area_id: 2 },
        {
          id: 18,
          en: 'Lion Rock',
          cn: '獅子山',
          lat: 22.3520998,
          lng: 114.1776896,
          description: 'Lion Rock',
        },
        {
          id: 22,
          en: 'The Mills',
          cn: '南豐紗廠',
          lat: 22.3750707,
          lng: 114.1079808,
          description: 'Lion Rock',
        },
        // new territories 
        { id: 9, en: 'sha-tin', cn: '沙田',lat: 22.381543, lng: 114.187728, area_id: 3 },
        { id: 10, en: 'tai-po', cn: '大埔',lat: 22.4423, lng: 114.1655, area_id: 3 },
        { id: 11, en: 'tuen-mun', cn: '屯門',lat: 22.3908, lng: 113.9725, area_id: 3 },
        { id: 12, en: 'yuen-long', cn: '元朗',lat: 22.4445, lng: 114.0222, area_id: 3 },
        {
          id: 20,
          en: 'Hong Kong Railway Museum',
          cn: '香港鐵路博物館',
          lat: 22.4474637,
          lng: 114.1633048,
          description: 'Lion Rock',
        },
        {
          id: 21,
          en: 'Nam Sang Wai',
          cn: '南生圍',
          lat: 22.4619704,
          lng: 114.0333437,
          description: 'Lion Rock',
        },
        {
          id: 23,
          en: 'Tai Mo Shan',
          cn: '大帽山',
          lat: 22.4088451,
          lng: 114.1204403,
          description: 'Lion Rock',
        },
        {
          id: 24,
          en: 'Castle Peak Bay Waterfront Promenade',
          cn: '青山灣海濱長廊',
          lat: 22.3796583,
          lng: 113.9755385,
          description: 'Lion Rock',
        },
        // outlying island 
        { id: 13, en: 'lantau-islan', cn: '大嶼山',lat: 22.293608, lng: 114.015598, area_id: 4 },
        { id: 14, en: 'lamma-island', cn: '南丫島',lat: 22.225928, lng: 114.112478, area_id: 4 },
        { id: 15, en: 'cheung-cha', cn: '長洲',lat: 22.2016, lng: 114.0265, area_id: 4 },
      ]);
    });
};
