const { items, categories, dataStockIns, dataStockOuts } = require('../models');
const Joi = require('joi').extend(require('@joi/date'));
const moment = require('moment');
const { Op } = require('sequelize')

module.exports = {
    createItem: async (req, res) => {
        const body = req.body;

        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                price: Joi.number().required(),
                stock: Joi.number(),
                categoryId: Joi.number().required(),
            });

            const check = schema.validate(
                {
                    name: body.name,
                    price: body.price,
                    stock: body.stock,
                    categoryId: body.categoryId,
                },
                { abortEarly: false }
            );

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'bad request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    ),
                });
            }

            if (body.stock) {
                const checkNameItem = await items.findOne({
                    where: {
                        name: body.name
                    }
                })

                if (checkNameItem) {
                    return res.status(400).json({
                        status: 'failed',
                        message: 'cannot input same item name'
                    })
                }

                const createItem = await items.create({
                    name: body.name,
                    price: body.price,
                    stock: body.stock,
                    categoryId: body.categoryId,
                });

                if (!createItem) {
                    return res.status(400).json({
                        status: 'failed',
                        message: 'please create item again',
                    })
                }


                await dataStockIns.create({
                    itemId: createItem.dataValues.id,
                    date: moment.utc(new Date()).local().format('YYYY-MM-DD'),
                    qty: body.stock,
                })

                const findItem = await items.findOne({
                    where: {
                        name: body.name,
                    },
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [
                        {
                            model: categories,
                            as: 'itemscategory',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        },
                        {
                            model: dataStockIns,
                            as: 'datastockins',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        },
                    ],
                });

                return res.status(200).json({
                    status: 'success',
                    message: 'success create item and stock in',
                    data: findItem
                })
            }

            const checkNameItem = await items.findOne({
                where: {
                    name: body.name
                }
            })

            if (checkNameItem) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'cannot input same item name'
                })
            }

            const createWithoutStockIn = await items.create({
                name: body.name,
                price: body.price,
                categoryId: body.categoryId,
            })

            return res.status(200).json({
                status: 'success',
                message: 'success create item without stock in',
                data: createWithoutStockIn,
            });
        } catch (error) {
            console.log("🚀 ~ file: itemsControllers.js ~ line 100 ~ createItem: ~ error", error)
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error'
            });
        }
    },

    deleteItemById: async (req, res) => {
        const id = req.params.id;

        try {
            const findItem = await items.findOne({
                where: {
                    id: id
                }
            });

            if (!findItem) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'item not found'
                })
            };

            await items.destroy({
                where: {
                    id: id
                }
            });

            return res.status(200).json({
                status: 'success',
                message: 'success deleted item',
            })
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            })
        }
    },

    getItemByName: async (req, res) => {
        const query = req.query;

        try {
            const schema = Joi.object({
                name: Joi.string()
            });

            const check = schema.validate({
                name: query.name
            }, { abortEarly: false });

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'bad request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    )
                });
            }

            if (!query.name) {
                const getAllItem = await items.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                });

                return res.status(200).json({
                    status: 'success',
                    message: 'success retrieved all item',
                    data: getAllItem,
                })
            }

            const findItem = await items.findOne({
                where: {
                    name: query.name
                }
            })

            if (!findItem) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'item not found',
                })
            }

            return res.status(200).json({
                status: 'success',
                message: 'success retrieved data item',
                data: findItem,
            })
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            })
        }
    },

    getItemByRangePrice: async (req, res) => {
        const query = req.query;

        try {
            const schema = Joi.object({
                minPrice: Joi.number().required(),
                maxPrice: Joi.number().required(),
            });

            const check = schema.validate({
                minPrice: query.minPrice,
                maxPrice: query.maxPrice,
            }, { abortEarly: false });

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'bad request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    )
                });
            }

            const itemByPrice = await items.findAll({
                where: {
                    price: {
                        [Op.gte]: query.minPrice,
                        [Op.lte]: query.maxPrice,
                    }
                }
            });

            if (!itemByPrice) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'data not found',
                })
            };

            return res.status(200).json({
                status: 'success',
                message: 'success data item by range price',
                data: itemByPrice,
            })
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            })
        }
    },

    updateItem: async (req, res) => {
        const body = req.body;

        try {
            const schema = Joi.object({
                name: Joi.string(),
                price: Joi.number(),
                categoryId: Joi.number(),
            });

            const check = schema.validate({
                name: body.name,
                price: body.price,
                categoryId: body.categoryId,
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

            const findItem = await items.findOne({
                where: {
                    id: req.params.id
                }
            });

            if (!findItem) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'data not found',
                })
            };

            await items.update(
                {
                    name: body.name,
                    price: body.price,
                    categoryId: body.categoryId,
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            );

            const dataAfterUpdate = await items.findOne({
                where: {
                    id: req.params.id
                }
            })

            return res.status(200).json({
                status: 'success',
                message: 'success update data',
                data: dataAfterUpdate,
            })


        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },

    getAllDataInAndOut: async (req, res) => {
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
            };

            const getAllItemIn = await items.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: dataStockIns,
                        as: 'datastockins',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        where: {
                            date: {
                                [Op.gte]: query.minDate,
                                [Op.lte]: query.maxDate, 
                            }
                        }
                    },
                    {
                        model: categories,
                        as: 'itemscategory',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                    }
                ]
            });

            const getAllItemOut = await items.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: dataStockOuts,
                        as: 'datastockouts',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        where: {
                            date: {
                                [Op.gte]: query.minDate,
                                [Op.lte]: query.maxDate, 
                            }
                        }
                    },
                    {
                        model: categories,
                        as: 'itemscategory',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                    }
                ]
            });

            if (!getAllItemIn || !getAllItemOut) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'data not found',
                })
            };

            return res.status(200).json({
                status: 'success',
                message: 'success retrieved data',
                itemStockIn: getAllItemIn,
                itemStockOut: getAllItemOut,
            })
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    },

    getAllItem: async (req, res) => {
        try{
            const allItem = await items.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });

            if (!allItem) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'data not found',
                })
            };

            return res.status(200).json({
                status: 'success',
                message: 'success retrieved data',
                data: allItem,
            })
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error',
            });
        }
    }
}
