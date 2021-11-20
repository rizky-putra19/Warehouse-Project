const { admins } = require('../models');
const Joi = require('joi').extend(require('@joi/date'));
const { generateToken } = require('../helpers/jwt');
const { comparePass } = require('../helpers/bcrypt');

module.exports = {
    login: async (req,res) => {
        const body = req.body;

        try{
            const schema = Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            });

            const check = schema.validate(
                {
                    email: body.email,
                    password: body.password,
                },
                { abortEarly: false },
            );

            if(check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'bad request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    ),
                });
            }

            const cekData = await admins.findOne({
                where: {
                    email: body.email,
                },
            });

            if(!cekData) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'invalid email',
                })
            }

            const checkPass = comparePass(
                body.password,
                cekData.dataValues.password
            );

            if(!checkPass) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'wrong password',
                })
            };

            const payload = {
                id: cekData.dataValues.id,
                email: cekData.dataValues.email
            };

            const token = generateToken(payload);

            return res.status(200).json({
                status: 'success',
                message: 'login success',
                token: token,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            })
        };
    },
};