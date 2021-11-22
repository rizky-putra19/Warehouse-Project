const app = require('../server');
const supertest = require('supertest');

test('POST /v1/categorie/create-category', async () => {
    const data = {
        name: 'perkakas'
    }

    const token = await supertest(app).post('/v1/admins/log-in').send({
        email: 'admin@gmail.com',
        password: 'admindieton',
    });

    await supertest(app)
        .post('/v1/categorie/create-category')
        .set('Authorization', 'Bearer ' + token.body.token)
        .send(data)
        .expect(200)
        .then((res) => {
            expect(res.body.data.name).toBe(data.name)
        })
});
