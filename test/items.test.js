const app = require('../server');
const supertest = require('supertest');

test('POST /v1/items/create-item', async () => {
    const data = {
        name: 'sabun',
        price: 5000,
        stock: 100,
        categoryId: 5,
    }

    const token = await supertest(app).post('/v1/admins/log-in').send({
        email: 'admin@gmail.com',
        password: 'admindieton',
    });

    await supertest(app)
        .post('/v1/items/create-item')
        .set('Authorization', 'Bearer ' + token.body.token)
        .send(data)
        .expect(200)
        .then((res) => {
            expect(res.body.data.name).toBe(data.name)
            expect(res.body.data.price).toBe(data.price)
            expect(res.body.data.stock).toBe(data.stock)
            expect(res.body.data.categoryId).toBe(data.categoryId)
        })
});

test('DELETE /v1/items/:id', async () => {
    const token = await supertest(app).post('/v1/admins/log-in').send({
        email: 'admin@gmail.com',
        password: 'admindieton',
    });

    const data = {
        name: 'test delete',
        price: 5000,
        stock: 100,
        categoryId: 5,
    }

    const createData = await supertest(app)
        .post('/v1/items/create-item')
        .set('Authorization', 'Bearer ' + token.body.token)
        .send(data);

    await supertest(app)
        .delete('/v1/items/' + createData.body.data.id)
        .set('Authorization', 'Bearer ' + token.body.token)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe('success')
        });
});

test('GET /v1/items?name=', async () => {
    const token = await supertest(app).post('/v1/admins/log-in').send({
        email: 'admin@gmail.com',
        password: 'admindieton',
    });

    const name = 'Sabun'

    await supertest(app)
        .get('/v1/items?name=' + name)
        .set('Authorization', 'Bearer ' + token.body.token)
        .expect(200)
        .then((res) => {
            expect(typeof res.body).toBe('object');
        })
});

test('GET /v1/items/price?minPrice=&maxPrice=', async () => {
    const token = await supertest(app).post('/v1/admins/log-in').send({
        email: 'admin@gmail.com',
        password: 'admindieton',
    });

    const createData1 = await supertest(app)
        .post('/v1/items/create-item')
        .set('Authorization', 'Bearer ' + token.body.token)
        .send({
            name: 'shampoo',
            price: 5000,
            stock: 100,
            categoryId: 5,
        })

    const createData2 = await supertest(app)
        .post('/v1/items/create-item')
        .set('Authorization', 'Bearer ' + token.body.token)
        .send({
            name: 'face wash',
            price: 6000,
            stock: 100,
            categoryId: 5,
        })

    await supertest(app)
        .get('v1/items/price?minPrice=' + createData1.body.data.price + '&maxPrice=' + createData2.body.data.price)
        .set('Authorization', 'Bearer ' + token.body.token)
        .expect(200)
        .then((res) => {
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
});

test('PUT /v1/items/update-item/:id', async () => {
    const token = await supertest(app).post('/v1/admins/log-in').send({
        email: 'admin@gmail.com',
        password: 'admindieton',
    });

    const updateData = {
        price: 6500
    };

    await supertest(app)
    .put('/v1/items/update-item/1')
    .set('Authorization', 'Bearer ' + token.body.token)
    .send(updateData)
    .expect(200)
    .then((res) => {
        expect(typeof res.body).toBe('object')
    })
});

test('GET /v1/items/get-all-stock-in-and-out?minDate=&maxDate=', async () => {
    const token = await supertest(app).post('/v1/admins/log-in').send({
        email: 'admin@gmail.com',
        password: 'admindieton',
    });

    await supertest(app)
    .get('/v1/items/get-all-stock-in-and-out?minDate=' + '2021-11-22' + '&maxDate=' + '2021-11-22')
    .set('Authorization', 'Bearer ' + token.body.token)
    .expect(200)
    .then((res) => {
        expect(Array.isArray(res.body.data)).toBeTruthy();
    })
})
