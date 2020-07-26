exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex('images').insert([
    {
      blog_id: 1,
      url: 'https://picsum.photos/200/300',
      userDistrict_id: 1,
    },
    { url: 'https://picsum.photos/200/300', userDistrict_id: 2 },
    { url: 'https://picsum.photos/200/300', userDistrict_id: 3 },
    { url: 'https://i.imgur.com/JvVSFBd', user_id: 1, locations_id: 16 },
    { url: 'https://i.imgur.com/sJozf2d', user_id: 1, locations_id: 16 },
    { url: 'https://i.imgur.com/jOyOc61', user_id: 1, locations_id: 17 },
    { url: 'https://i.imgur.com/AfmJJXG', user_id: 1, locations_id: 17 },
    { url: 'https://i.imgur.com/PGbKjQe', user_id: 1, locations_id: 19 },
    { url: 'https://i.imgur.com/9cSJRtc', user_id: 1, locations_id: 19 },
    { url: 'https://i.imgur.com/ecsOfjy', user_id: 1, locations_id: 18 },
    { url: 'https://i.imgur.com/JJi9KTZ', user_id: 1, locations_id: 18 },
    { url: 'https://i.imgur.com/UAJvJSY', user_id: 1, locations_id: 22 },
    { url: 'https://i.imgur.com/tGaJgJE', user_id: 1, locations_id: 22 },
    { url: 'https://i.imgur.com/8FsT7lE', user_id: 1, locations_id: 20 },
    { url: 'https://i.imgur.com/d5XnzPy', user_id: 1, locations_id: 20 },
    { url: 'https://i.imgur.com/0k8n9xE', user_id: 1, locations_id: 21 },
    { url: 'https://i.imgur.com/vCwSycv', user_id: 1, locations_id: 21 },
    { url: 'https://i.imgur.com/7GO7lXQ', user_id: 1, locations_id: 23 },
    { url: 'https://i.imgur.com/cleGBLC', user_id: 1, locations_id: 23 },
    { url: 'https://i.imgur.com/mWTKbgp', user_id: 1, locations_id: 24 },
    { url: 'https://i.imgur.com/LBIeKfa', user_id: 1, locations_id: 24 },
  ]);
};

// //Art lane
// https://i.imgur.com/undefined
// https://i.imgur.com/sJozf2d

// //Lion rock
// https://i.imgur.com/ecsOfjy
// https://i.imgur.com/JJi9KTZ

// // Nam sa
// https://i.imgur.com/tGaJgJE
// https://i.imgur.com/UAJvJSY

// // Nam seng
// https://i.imgur.com/0k8n9xE
// https://i.imgur.com/vCwSycv

// // Railway
// https://i.imgur.com/8FsT7lE
// https://i.imgur.com/d5XnzPy

// // Tai kwun
// https://i.imgur.com/PGbKjQe
// https://i.imgur.com/9cSJRtc

// // Tai mao
// https://i.imgur.com/7GO7lXQ
// https://i.imgur.com/cleGBLC

// // Tsing shan
// https://i.imgur.com/mWTKbgp
// https://i.imgur.com/LBIeKfa

// // Pier
// https://i.imgur.com/jOyOc61
// https://i.imgur.com/AfmJJXG
