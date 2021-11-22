const app = require('../server');
const supertest = require('supertest');

test('POST /v1/admins/log-in', async () => {
    const token = {
        email: 'admin@gmail.com',
        password: 'admindieton',
    };
    await supertest(app)
    .post('/v1/admins/log-in')
    .send(token)
    .expect(200)
    .then((res) => {
        expect(res.body.status).toBe('success');
    });
});