const app = require('../server');
const supertest = require('supertest');

test('POST /v1/data-stock-in/create-stock-in', async () => {
    const dataStockIn = {
        itemId: 1,
        date: '2021-11-22',
        qty: 25,
    }

    const token = await supertest(app).post('/v1/admins/log-in').send({
        email: 'admin@gmail.com',
        password: 'admindieton',
    });

    await supertest(app)
    .post('/v1/data-stock-in/create-stock-in')
    .set('Authorization', 'Bearer ' + token.body.token)
    .send(dataStockIn)
    .expect(200)
    .then((res) => {
        expect(res.body.dataStockIn.itemId).toBe(dataStockIn.itemId)
        expect(res.body.dataStockIn.date).toBe(dataStockIn.date)
        expect(res.body.dataStockIn.qty).toBe(dataStockIn.qty)
    })
})

test('GET /v1/data-stock-in/get-data-stock-in', async () => {
    const token = await supertest(app).post('/v1/admins/log-in').send({
        email: 'admin@gmail.com',
        password: 'admindieton',
    });

    await supertest(app)
    .get('/v1/data-stock-in/get-data-stock-in')
    .set('Authorization', 'Bearer ' + token.body.token)
    .expect(200)
    .then((res) => {
        expect(Array.isArray(res.body.dataStockIn)).toBeTruthy()
    })
})

test('GET /v1/data-stock-in/get-data-in-range?minDate=&maxDate=', async () => {
    const token = await supertest(app).post('/v1/admins/log-in').send({
        email: 'admin@gmail.com',
        password: 'admindieton',
    });

    await supertest(app)
    .get('/v1/data-stock-in/get-data-in-range?minDate=' + '2021-11-22' + '&maxDate=' + '2021-11-22')
    .set('Authorization', 'Bearer ' + token.body.token)
    .expect(200)
    .then((res) => {
        expect(Array.isArray(res.body.dataStockIn)).toBeTruthy();
    })
})