const request = require('supertest')
const {app} = require('../server') 

describe('sports and events API', () => {
    it('GET /api/all-sports --> array sports', () => {
        return request(app)
        .get('/api/all-sports')
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

    it('GET /api/event?id=601600 --> specific event', () => {
        return request(app)
        .get('/api/event?id=601600')
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

    it('GET /api/event-data?id=1889582200 --> specific events', () => {
        return request(app)
        .get('/api/event-data?id=1889582200')
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
