const request = require('supertest')
const {app} = require('../server') 

describe('sports and events API', () => {
    it('GET /api/all-sports?lang=en --> array sports', () => {
        return request(app)
        .get('/api/all-sports?lang=en')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    data: expect.any(Array)
                })
            )
        })
    }) 

    it('GET `/api/events/${process.env.TEST_ID}?` --> specific event', () => {
        return request(app)
        .get(`/api/events/${process.env.TEST_EVENT_ID}?`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    data: expect.any(Array)
                })
            )
        })
    })

    it('GET /api/wrong-event --> 404 if not found', () => {
        return request(app)
        .get('/api/eventer')
        .expect(404)
    })

    it('GET `/api/event-data/${process.env.TEST_ID}` --> specific event data', () => {
        return request(app)
        .get(`/api/event-data/${process.env.TEST_ID}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    data: expect.any(Object)
                })
            )
        })
    })
})
