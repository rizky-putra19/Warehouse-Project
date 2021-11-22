const { dataStockIns, items, categories } = require('../models');
const Joi = require('joi').extend(require('@joi/date'));
const { Op } = require('sequelize');

module.exports = {
    postItemStockIn: async (req, res) => {
        const body = req.body;

        try {
            const schema = Joi.object({
                itemId: Joi.number().required(),
                date: Joi.date().format('YYYY-MM-DD').required(),
                qty: Joi.number().required(),
            })

            const check = schema.validate({
                itemId: body.itemId,
                date: body.date,
                qty: body.qty,
            }, { abortEarly: false });

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'bad request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    ),
                });
            }

            const createStockIn = await dataStockIns.create({
                itemId: body.itemId,
                date: body.date,
                qty: body.qty,
            });

            if (!createStockIn) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'input error',
                })
            };

            const findItem = await items.findOne({
                where: {
                    id: body.itemId
                }
            });

            if (!findItem) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'data not found',
                })
            }

            await items.update(
                {
                    stock: body.qty + findItem.dataValues.stock
                },
                {
                    where: {
                        id: body.itemId
                    }
                }
            );

            const finalDataStockIn = await dataStockIns.findAll({
                where: {
                    date: body.date,
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: items,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        include: [{
                            model: categories,
                            as: 'itemscategory',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        }
                        ],
                        where: {
                            id: body.itemId
                        },
                    }
                ],
            });

            return res.status(200).json({
                status: 'success',
                message: 'input data stock in success',
                dataStockIn: finalDataStockIn
            })

        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error'
            });
        }
    },

    getAllStockInByDate: async (req, res) => {
        const body = req.body;

        try {
            const schema = Joi.object({
                date: Joi.date().format('YYYY-MM-DD')
            });

            const check = schema.validate({
                date: body.date
            }, { abortEarly: false });

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'bad request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    ),
                });
            }

            const getAllData = await dataStockIns.findAll({
                where: {
                    date: body.date
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model:items,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        include: [{
                            model: categories,
                            as: 'itemscategory',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        }]
                    }
                ]
            })

            return res.status(200).json({
                status: 'success',
                message: 'get data stock in success',
                dataStockIn: getAllData,
            })

        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }

    },

    getDataStockInByRange: async (req, res) => {
        const query = req.query;

        try {
            const schema = Joi.object({
                minDate: Joi.date().format('YYYY-MM-DD'),
                maxDate: Joi.date().format('YYYY-MM-DD'),
            });

            const check = schema.validate({
                minDate: query.minDate,
                maxDate: query.maxDate,
            }, { abortEarly: false });

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'bad request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    ),
                });
            }

            const getAllData = await dataStockIns.findAll({
                where: {
                    date: {
                        [Op.gte]: query.minDate,
                        [Op.lte]: query.maxDate,
                    }
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: items,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        include: [{
                            model: categories,
                            as: 'itemscategory',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        }]
                    }
                ]
            })

            return res.status(200).json({
                status: 'success',
                message: 'get data stock in success',
                dataStockIn: getAllData,
            })

        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    }

}