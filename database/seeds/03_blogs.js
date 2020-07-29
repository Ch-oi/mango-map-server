exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex('blogs')
    .insert([
      {
        title: 'title1',
        body: 'body1',
        modified: false,
        user_location_id: 1,
      },
      {
        title: 'title2',
        body: 'body2',
        modified: false,
        user_location_id: 2,
      },
      {
        title: 'title3',
        body: 'body3',
        modified: false,
        user_location_id: 3,
      },
      {
        title: 'Mini Trip in HK',
        body: `Hope. Fear. Excitement. Traveling for the first time produced a wave of emotions.
  
          When I left to travel the world on my first round-the-world trip, I didn’t know what to expect.
          
          Now, with fifteen years of travel experience under my belt, I know better. Traveling is second nature to me now. I land in an airport and I just go on autopilot.
          
          But, back then, I was as green as they come.
          
          To compensate for my lack of experience, I followed my guidebooks and wet my feet by going on organized tours. I was young and inexperienced and I made a lot of rookie travel mistakes.
          
          I know what it’s like to just be starting out and have a mind filled with questions, anxieties, and concerns.
          
          So, if you’re new to travel and looking for advice to help you prepare, here are 12 tips that I’d tell a new traveler to help them avoid some of my early mistakes:
        `,
        user_location_id: 4,
      },
      {
        title: 'My First Trip',
        body: 'Very nice first trip I had in Hong Kong',
        user_location_id: 5,
      },
      {
        title: 'My Second Trip',
        body: 'Very nice second trip I had in Hong Kong',
        user_location_id: 6,
      },
      {
        title: 'My Third Trip',
        body: 'Very nice third trip I had in Hong Kong',
        user_location_id: 7,
      },
    ])
    .then(function () {
      // Inserts seed entries
      return knex('users_fav_blogs').insert([
        { id: 1, user_id: 1, blog_id: 1 },
        { id: 2, user_id: 1, blog_id: 2 },
        { id: 3, user_id: 1, blog_id: 3 },
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        { id: 1, category: 'apply' },
        { id: 2, category: 'pen' },
        { id: 3, category: 'penapple' },
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('categories_blogs').insert([
        { id: 1, blog_id: 1, category_id: 1 },
        { id: 2, blog_id: 1, category_id: 2 },
        { id: 3, blog_id: 1, category_id: 3 },
      ]);
    });
  // .then(function () {
  //   // Inserts seed entries
  //   return knex('images').insert([
  //     {
  //       id: 1,
  //       blog_id: 1,
  //       url: 'https://picsum.photos/200/300',
  //       user_location_id: 1,
  //     },
  //     { id: 2, url: 'https://picsum.photos/200/300', user_location_id: 2 },
  //     { id: 3, url: 'https://picsum.photos/200/300', user_location_id: 3 },
  //   ]);
  // });
};
