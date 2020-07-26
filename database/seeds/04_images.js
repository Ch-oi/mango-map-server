exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex('images').insert([
    {
      blog_id: 1,
      url: 'https://picsum.photos/200/300',
      userLocation_id: 1,
    },
    { url: 'https://picsum.photos/200/300', userLocation_id: 2 },
    { url: 'https://picsum.photos/200/300', userLocation_id: 2 },
    { url: 'https://i.imgur.com/JvVSFBd', userLocation_id: 3 },
    { url: 'https://i.imgur.com/sJozf2d', userLocation_id: 3 },
    { url: 'https://i.imgur.com/jOyOc61', userLocation_id: 4 },
    { url: 'https://i.imgur.com/AfmJJXG', userLocation_id:  4},
    { url: 'https://i.imgur.com/PGbKjQe', userLocation_id: 5 },
    { url: 'https://i.imgur.com/9cSJRtc', userLocation_id: 5 },
    { url: 'https://i.imgur.com/ecsOfjy', userLocation_id: 6 },
    { url: 'https://i.imgur.com/JJi9KTZ', userLocation_id: 6 },
    { url: 'https://i.imgur.com/UAJvJSY', userLocation_id: 7 },
    { url: 'https://i.imgur.com/tGaJgJE', userLocation_id: 7 },
    { url: 'https://i.imgur.com/8FsT7lE', userLocation_id: 8 },
    { url: 'https://i.imgur.com/d5XnzPy', userLocation_id: 8 },
    { url: 'https://i.imgur.com/0k8n9xE', userLocation_id: 9 },
    { url: 'https://i.imgur.com/vCwSycv', userLocation_id: 9 },
    { url: 'https://i.imgur.com/7GO7lXQ', userLocation_id: 10 },
    { url: 'https://i.imgur.com/cleGBLC', userLocation_id: 10 },
    { url: 'https://i.imgur.com/mWTKbgp', userLocation_id: 11 },
    { url: 'https://i.imgur.com/LBIeKfa', userLocation_id: 11 },
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
