exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex('blogs')
    .insert([
      {
        title: 'Tung Chung Day Tour',
        body: `
        • Visit Tung Chung North Park
        • Learn more about Chinese Medicine at Pok Oi Hospital Chinese Medicine Culture and Health Museum
        • Lunch at Tai O
        • Experience fisherfolk life in Tai O fishing village`,
        modified: false,
        user_location_id: 1,
      },
      {
        title: 'Cruise Tour',
        body: `
        Pre-dinner Sunset Cruise
        • Watch the world's greatest view turns into the world's greatest light show
        
        Harbour Night Cruise
        • Relax and enjoy the world famous glittering harbour views by night
        
        Symphony of Lights Cruise
        • The cruise climatises as the Symphony of Lights show brightens up the skyline`,
        modified: false,
        user_location_id: 2,
      },
      {
        title: 'The Hidden Treasures of Central',
        body: ` 
        Treasure hunt at mom-and-pop stores and traditional roadside groceries stores
        • Hear stories about Dr Sun Yat-sen along the historical trail
        • Wander through renovated heritage buildings to discover the city’s art and culture
        • Visit special stores featuring antiques, curios, homewares, niche parfume`,
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
        title: 'Tung Lung Island',
        body: 'Return to the primordial nature and zip through the jungle like a man in the wild. Embark on a special adventure combining beautiful nature and extreme sports. Get outfitted in top quality gears and embrace this once-in-a-lifetime adventure under the lead of professional guides',
        user_location_id: 5,
      },
      {
        title: 'Back to Childhood',
        body: 'At Hong Kong Disneyland, every moment is a magical one that brings you closer to your loved ones. From now to 31 August, 2020, guests can buy two 1-Day park tickets and receive an additional 1-Day ticket for free! It’s a wonderful way to share the Disney magic and happiness with all your loved ones!',
        user_location_id: 6,
      },
      {
        title: 'Aggressive shopper',
        body: `The biggest and best factory outlet center in Hong Kong is Citygate Outlets. Most of the shops here are clothes, shoe and accessory shops, including high-end retailers like Armani Outlet, Burberry, and Diane Von Furstenberg selling off catwalk classics and more moderately priced international brands such as Levi's, Nike, and Crocs.

        The mall claims discounts of between 30% and 70% on items. You’ll actually get something around 30% off, but that's still a pretty hefty cut considering some of the premium names available. There is a food court inside, including McDonald's, and mediocre but kid-friendly restaurants like Pizza Express.
        
        As is traditional with outlet stores, this mall of eighty shops is inconveniently parked outside of the city center in Tung Chung on Lantau Island. Luckily it's only about 30 minutes on the metro from Central.
        
        Address: Citygate Outlets, Tung Chung
        Nearest MTR: Tung Chung`,
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
        { id: 1, category: 'Art' },
        { id: 2, category: 'Culture' },
        { id: 3, category: 'Food' },
        { id: 4, category: 'Outdoor'},
        { id: 5, category: 'Sports'},
        { id: 6, category: 'Shopping' },
        { id: 7, category: 'Nature' },
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('categories_blogs').insert([
        { id: 1, blog_id: 1, category_id: 1 },
        { id: 2, blog_id: 1, category_id: 2 },
        { id: 3, blog_id: 1, category_id: 3 },
        { id: 4, blog_id: 2, category_id: 4 },
        { id: 5, blog_id: 2, category_id: 5 },
        { id: 6, blog_id: 3, category_id: 6 },
        { id: 7, blog_id: 3, category_id: 7 },
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
