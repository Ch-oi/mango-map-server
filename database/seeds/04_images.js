exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex('images').insert([
    {
      blog_id: 1,
      url: 'https://picsum.photos/200/300',
      user_location_id: 1,private:false,
    },
    { url: 'https://picsum.photos/200/300', user_location_id: 2 ,private:false,},
    { url: 'https://picsum.photos/200/300', user_location_id: 2 ,private:false,},
    { url: 'https://i.imgur.com/JvVSFBd', user_location_id: 3 ,private:false,},
    { url: 'https://i.imgur.com/sJozf2d', user_location_id: 3 ,private:false,},
    { url: 'https://i.imgur.com/jOyOc61', user_location_id: 4 ,private:false,},
    { url: 'https://i.imgur.com/AfmJJXG', user_location_id: 4 ,private:false,},
    { url: 'https://i.imgur.com/PGbKjQe', user_location_id: 5 ,private:false,},
    { url: 'https://i.imgur.com/9cSJRtc', user_location_id: 5 ,private:false,},
    { url: 'https://i.imgur.com/ecsOfjy', user_location_id: 6 ,private:false,},
    { url: 'https://i.imgur.com/JJi9KTZ', user_location_id: 6 ,private:false,},
    { url: 'https://i.imgur.com/UAJvJSY', user_location_id: 7 ,private:false,},
    { url: 'https://i.imgur.com/tGaJgJE', user_location_id: 7 ,private:false,},
    { url: 'https://i.imgur.com/8FsT7lE', user_location_id: 8 ,private:false,},
    { url: 'https://i.imgur.com/d5XnzPy', user_location_id: 8 ,private:false,},
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
