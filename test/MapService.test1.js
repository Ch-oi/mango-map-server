const MapService = require('../services/MapService')

const knex = require('../database/config')

describe('test user services', () => {
    let mapService
    let district_id = 1
    let area_id = 1
    let districtUsers =
        [
            {
                id: 1,
                user_id: 1,
                user_name:
                    'Edwin'
            },
            {
                id: 2,
                user_id: 2,
                user_name:
                    'Pulips'
            }
        ]
    let new_district =
    {
        name: 'demo',
        lat: 22.282,
        lng: 114.158238,
        area_id: 1
    }

        beforeEach(async () => {
            await knex.migrate.rollback([{ directory: '../database/migrations' }])
            await knex.migrate.latest([{ directory: '../database/migrations' }])
            await knex.seed.run([{ directory: '../database/seeds' }])

            return mapService = new MapService()
        })

    afterAll(async () => {
        await knex.migrate.rollback([{ directory: '../database/migrations' }])
        await knex.migrate.latest([{ directory: '../database/migrations' }])
        await knex.seed.run([{ directory: '../database/seeds' }])
        return await knex.destroy()
    })

    test('list all area', () => {
        return mapService.listAreas()
            .then(res => {
                expect(res.length).toBe(4)
                expect(res[0].name).toBe('HK_Island')
            })
    })
    test('list all districts', () => {
        return mapService.listDistricts()
            .then(res => {
                expect(res.length).toBe(15)
                expect(res[0].name).toBe('central')
            })
    })

    test('list all districts in an area', () => {
        return mapService.getAreaDistricts(area_id)
            .then(res => {
                expect(res.length).toBe(4)
                expect(res[3].name).toBe('north-point')
            })
    })

    test('get one districts all users', () => {
        return mapService.getDistrictUsers(district_id)
            .then(res => {
                console.log(res)
                expect(res[0].user_name).toBe('Edwin')
            })
    })
    test('get users\'s blogs at one district', () => {
        return mapService.getDistrictUserBlogs(districtUsers)
            .then(res => {
                console.log(res[0].userBlogs)
                expect(res[0].userBlogs[0].title).toBe('title1')
            })
    })
    test('get all images at one district', () => {
        return mapService.getDistrictImages(district_id)
            .then(res => {
                console.log(res)
                expect(typeof res[0].url).toBe('string')
            })
    })
    test('add new district', () => {
        return mapService.addDistrict(new_district)
            .then(res => {
                console.log(res)
                expect(res[0].name).toBe('demo')
            })
    })

})