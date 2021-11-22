const app = require('../server');
const supertest = require('supertest');

test('POST /v1/data-stock-out/create-stock-out', async () => {
    const dataStockOut = {
        itemId: 1,
        date: '2021-11-22',
        qty: 25,
    }

    const token = await supertest(app).post('/v1/admins/log-in').send({
        email: 'admin@gmail.com',
        password: 'admindieton',
    });

    await supertest(app)
    .post('/v1/data-stock-out/create-stock-out')
    .set('Authorization', 'Bearer ' + token.body.token)
    .send(dataStockOut)
    .expect(200)
    .then((res) => {
        expect(res.body.dataStockOut.itemId).toBe(dataStockOut.itemId)
        expect(res.body.dataStockOut.date).toBe(dataStockOut.date)
        expect(res.body.dataStockOut.qty).toBe(dataStockOut.qty)
    })
})

test('GET /v1/data-stock-out/get-data-stock-out', async () => {
    const token = await supertest(app).post('/v1/admins/log-in').send({
        email: 'admin@gmail.com',
        password: 'admindieton',
    });

    await supertest(app)
    .get('/v1/data-stock-out/get-data-stock-out')
    .set('Authorization', 'Bearer ' + token.body.token)
    .expect(200)
    .then((res) => {
        expect(Array.isArray(res.body.dataStockOut)).toBeTruthy()
    })
})

test('GET /v1/data-stock-out/get-data-out-range?minDate=&maxDate=', async () => {
    const token = await supertest(app).post('/v1/admins/log-in').send({
        email: 'admin@gmail.com',
        password: 'admindieton',
    });

    await supertest(app)
    .get('/v1/data-stock-out/get-data-out-range?minDate=' + '2021-11-22' + '&maxDate=' + '2021-11-22')
    .set('Authorization', 'Bearer ' + token.body.token)
    .expect(200)
    .then((res) => {
        expect(Array.isArray(res.body.dataStockOut)).toBeTruthy();
    })
})