exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex('images').insert([
    {
      blog_id: 1,
      url: 'https://picsum.photos/200/300',
      user_location_id: 1,
      private: false,
    },
    {
      url: 'https://picsum.photos/200/300',
      user_location_id: 2,
      private: false,
    },
    {
      url: 'https://picsum.photos/200/300',
      user_location_id: 2,
      private: false,
    },
    {
      url: 'https://i.imgur.com/JvVSFBd.jpg',
      user_location_id: 3,
      private: false,
    },
    {
      url: 'https://i.imgur.com/sJozf2d.jpg',
      user_location_id: 3,
      private: false,
    },
    {
      url: 'https://i.imgur.com/jOyOc61.jpg',
      user_location_id: 4,
      private: false,
    },
    {
      url: 'https://i.imgur.com/AfmJJXG.jpg',
      user_location_id: 4,
      private: false,
    },
    {
      url: 'https://i.imgur.com/PGbKjQe.jpg',
      user_location_id: 5,
      private: false,
    },
    {
      url: 'https://i.imgur.com/9cSJRtc.jpg',
      user_location_id: 5,
      private: false,
    },
    {
      url: 'https://i.imgur.com/ecsOfjy.jpg',
      user_location_id: 6,
      private: false,
    },
    {
      url: 'https://i.imgur.com/JJi9KTZ.jpg',
      user_location_id: 6,
      private: false,
    },
    {
      url: 'https://i.imgur.com/UAJvJSY.jpg',
      user_location_id: 7,
      private: false,
    },
    {
      url: 'https://i.imgur.com/tGaJgJE.jpg',
      user_location_id: 7,
      private: false,
    },
    {
      url: 'https://i.imgur.com/8FsT7lE.jpg',
      user_location_id: 8,
      private: false,
    },
    {
      url: 'https://i.imgur.com/d5XnzPy.jpg',
      user_location_id: 8,
      private: false,
    },
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
