const { categories } = require('../models');
const Joi = require('joi');

module.exports = {
    create: async (req, res) => {
        const body = req.body

        try{
            const schema = Joi.object({
                name: Joi.string().required()
            });

            const check = schema.validate({
                name: body.name
            });

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'bad request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    ), 
                })
            };

            const createCategory = await categories.create({
                name: body.name
            })

            return res.status(200).json({
                status: 'success',
                message: 'success create category',
                data: createCategory,
            })
        } catch (error) {

        }
    }
}