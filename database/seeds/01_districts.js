exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex('districts')
    .insert([
      // The 18 districts of HK
      {
        en: 'Central and Western District',
        cn: '中西區',
        lat: 22.28666,
        lng: 114.15497,
      },
      {
        en: 'East District',
        cn: '東區',
        lat: 22.28411,
        lng: 114.22414,
      },
      {
        en: 'South District',
        cn: '南區',
        lat: 22.24725,
        lng: 114.15884,
      },
      {
        en: 'Wan Chai',
        cn: '灣仔區',
        lat: 22.27968,
        lng: 114.17168,
      },

      {
        en: 'Sham Shui Po District',
        cn: '深水埗區',
        lat: 22.33074,
        lng: 114.1622,
      },
      {
        en: 'Kowloon City District',
        cn: '九龍城區',
        lat: 22.3282,
        lng: 114.19155,
      },
      {
        en: 'Kwun Tong District',
        cn: '觀塘區',
        lat: 22.31326,
        lng: 114.22581,
      },
      {
        en: 'Wong Tai Sin District',
        cn: '黃大仙區',
        lat: 22.33353,
        lng: 114.19686,
      },
      {
        en: 'Yau Tsim Mong',
        cn: '油尖旺區',
        lat: 22.32138,
        lng: 114.1726,
      },
      {
        en: 'Islands District',
        cn: '離島區',
        lat: 22.26114,
        lng: 113.94608,
      },
      {
        en: 'Kwai Tsing District',
        cn: '葵青區',
        lat: 22.35488,
        lng: 114.08401,
      },
      {
        en: 'North District',
        cn: '北區',
        lat: 22.49471,
        lng: 114.13812,
      },
      {
        en: 'Sai Kung District',
        cn: '西貢區',
        lat: 22.38143,
        lng: 114.27052,
      },
      {
        en: 'Sha Tin District',
        cn: '沙田區',
        lat: 22.38715,
        lng: 114.19534,
      },
      {
        en: 'Tai Po',
        cn: '大埔區',
        lat: 22.45085,
        lng: 114.16422,
      },
      {
        en: 'Tsuen Wan District',
        cn: '荃灣區',
        lat: 22.36281,
        lng: 114.12907,
      },
      {
        en: 'Tuen Mun District',
        cn: '屯門區',
        lat: 22.39163,
        lng: 113.977089,
      },
      {
        en: 'Yuen Long',
        cn: '元朗區',
        lat: 22.44559,
        lng: 114.02218,
      },
    ])
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        {
          en: 'Art Lane',
          cn: '上環壁畫街',
          lat: 22.287205,
          lng: 114.141428,
          description: 'Lion Rock',
        },
        {
          en: 'Western District Waterfront Pier',
          cn: '西環貨運碼頭',
          lat: 22.288323,
          lng: 114.1329424,
          description: 'Lion Rock',
        },
        {
          en: 'Lion Rock',
          cn: '獅子山',
          lat: 22.3520998,
          lng: 114.1776896,
          description: 'Lion Rock',
        },
        {
          en: 'Tai Kwun',
          cn: '大館',
          lat: 22.2813657,
          lng: 114.1517856,
          description: 'Lion Rock',
        },
        {
          en: 'Hong Kong Railway Museum',
          cn: '香港鐵路博物館',
          lat: 22.4474637,
          lng: 114.1633048,
          description: 'Lion Rock',
        },
        {
          en: 'Nam Sang Wai',
          cn: '南生圍',
          lat: 22.4619704,
          lng: 114.0333437,
          description: 'Lion Rock',
        },
        {
          en: 'The Mills',
          cn: '南豐紗廠',
          lat: 22.3750707,
          lng: 114.1079808,
          description: 'Lion Rock',
        },
        {
          en: 'Tai Mo Shan',
          cn: '大帽山',
          lat: 22.4088451,
          lng: 114.1204403,
          description: 'Lion Rock',
        },
        {
          en: 'Castle Peak Bay Waterfront Promenade',
          cn: '青山灣海濱長廊',
          lat: 22.3796583,
          lng: 113.9755385,
          description: 'Lion Rock',
        },
        {
          en: 'Kung Wo Soy Bean Factory',
          cn: '公和荳品廠',
          lat: 22.329399,
          lng: 114.1870296,
          description:
            'A very generic Hong Kong local factory where you can enjoy soy bean products',
        },
        {
          en: 'Kowloon Walled City Park',
          cn: '九龍寨城公園',
          lat: 22.3315752,
          lng: 114.1885783,
          description:
            'This place was formerly known as Kowloon Walled City, and a signature location of Hong Kong',
        },
        {
          en: 'Hau Wong Temple',
          cn: '侯王廟',
          lat: 22.3349687,
          lng: 114.1862671,
          description:
            'A traditional Hong Kong temple that locates in Kowloon City, one of the many well-preserved heritage building',
        },
        {
          en: 'Stone Houses Family Garden',
          cn: '石屋家園',
          lat: 22.333092,
          lng: 114.1847532,
          description:
            'A few remaining residential stone buildings in Kowloon City in last century.',
        },
        {
          en: 'Sung Wong Toi',
          cn: '宋王台臺',
          lat: 22.3234115,
          lng: 114.1913538,
          description:
            'A historic relic where it is said that the last Song emperor temporarily lived in',
        },
      ]);
    });
};
