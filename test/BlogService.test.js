const BlogService = require('../services/BlogService');

const knex = require('../database/config');

//complete get & add test

describe('BlogService testing with blogservice', () => {
  let blogService;

  let new_post = {
    title: 'title4',
    body: 'body4',
    userDistrict_id: 2,
  };

  let new_comment = {
    body: 'comment4',
    ref_comment_id: '1',
    user_id: 1,
    blog_id: 1,
  };

  let new_category = ['Speculation', 'News'];

  let blog_id = 1;
  let categories_id = [1, 2];
  let new_urls = [
    'https://images.pexels.com/photos/4115131/pexels-photo-4115131.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/3886285/pexels-photo-3886285.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  ];

  let altered_post = {
    title: 'The world is stuffed',
    body: 'We should be okay through',
    user_id: 1,
  };

  let altered_picture = {
    picture_URL:
      'https://images.pexels.com/photos/4115131/pexels-photo-4115131.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    blog_id: 3,
  };

  let altered_category = {
    category: 'News',
    blog_id: 2,
  };

  beforeEach(async () => {
    await knex.migrate.rollback([{ directory: '../database/migrations' }]);
    await knex.migrate.latest([{ directory: '../database/migrations' }]);
    await knex.seed.run([{ directory: '../database/seeds' }]);

    blogService = new BlogService();
  });

  afterAll(async () => {
    await knex.migrate.rollback([{ directory: '../database/migrations' }]);
    await knex.migrate.latest([{ directory: '../database/migrations' }]);
    await knex.seed.run([{ directory: '../database/seeds' }]);
    await knex.destroy();
  });

  test('list all Blogs ', () => {
    return blogService.listBlogs().then((results) => {
      expect(results.length).toBe(3);
      expect(results[0].title).toBe('title1');
      expect(typeof results[0].images).toEqual('object');
      expect(typeof results[0].categories).toEqual('object');
      expect(typeof results[0].comments).toEqual('object');
    });
  });

  test('list all Categories ', () => {
    return blogService.listCategories().then((results) => {
      expect(results.length).toBe(3);
      expect(results[0].category).toBe('apply');
    });
  });

  test('get one Blog ', () => {
    return blogService.getBlog(2).then((results) => {
      expect(results.length).toBe(1);
      expect(results[0].title).toBe('title2');
      expect(typeof results[0].images).toEqual('object');
      expect(typeof results[0].categories).toEqual('object');
      expect(typeof results[0].comments).toEqual('object');
    });
  });
  test('get one particular BlogImages ', () => {
    return blogService.getBlogImages(1).then((results) => {
      expect(typeof results[0].url).toBe('string');
    });
  });
  test('get one particular BlogCategories ', () => {
    return blogService.getBlogCategories(1).then((results) => {
      expect(results.length).toBe(3);
      expect(results[0].category).toBe('apply');
    });
  });
  test('get one particular BlogComments ', () => {
    return blogService.getBlogComments(1).then((results) => {
      expect(results.length).toBe(3);
      expect(results[0].body).toBe('comment1');
    });
  });
  test('add new blog', () => {
    return blogService.addBlog(new_post).then((res) => {
      console.log(res);
      expect(res.title).toBe('title4');
    });
  });
  test('add new blogComment', () => {
    return blogService.addBlogComment(new_comment).then((res) => {
      expect(res.body).toBe('comment4');
    });
  });
  test('add new blogImages', () => {
    return blogService.addBlogImages(new_urls, 1).then((res) => {
      console.log(res);
      expect(res.length).toBe(2);
      expect(typeof res[0].url).toBe('string');
    });
  });
  test('add new categories', () => {
    return blogService.addCategories(new_category).then((res) => {
      expect(res.length).toBe(2);
      expect(res[0].category).toBe('Speculation');
      expect(res[0].id).toBe(4);
    });
  });

  test('add new blog categories', () => {
    return blogService.addBlogCategories(categories_id, blog_id).then((res) => {
      expect(res.length).toBe(2);
      expect(res[0].category_id).toBe(1);
      expect(res[1].category_id).toBe(2);
      expect(res[1].blog_id).toBe(1);
    });
  });
});
