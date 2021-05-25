const BillToPayModel = require('../models/billToPay.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
const moment = require('moment');
dotenv.config();

/******************************************************************************
 *                              BillToPay Controller
 ******************************************************************************/
class BillToPayController {
    getAllBills = async (req, res, next) => {
        let billList = await BillToPayModel.find();

        if (!billList.length) {
            billList = [];
        }

        billList.forEach(function (element) {
            let now = moment(element.duedate);
            let end = moment(element.payday);
            let duration = moment.duration(now.diff(end));
            let days = duration.asDays() * -1;

            if (days < 0) {
                days = 0;
            }

            element.days_delayed = days;
            let original_value = parseFloat(element.original_value);
            let fixed_value_by_fine = 0;
            let fixed_value_by_fees = 0;
            if(days > 0) {
                fixed_value_by_fees = original_value * parseFloat(element.fees_day * days) / 100;
                fixed_value_by_fine = original_value * parseFloat(element.fine_applied) / 100;
            }
            element.fixed_value = (original_value + fixed_value_by_fees + fixed_value_by_fine).toFixed(2);
        });

        res.send(billList);
    };

    createBill = async (req, res, next) => {
        this.checkValidation(req);

        req.body.fine_applied = 0;
        req.body.fees_day = 0;

        let now = moment(req.body.duedate);
        let end = moment(req.body.payday);
        let duration = moment.duration(now.diff(end));
        let days = duration.asDays() * -1;

        if (days < 0) {
            days = 0;
        }

        if (days > 0 && days <= 3) {
            req.body.fine_applied = 2;
            req.body.fees_day = 0.1;
        }

        if (days > 0 && days > 3 && days <= 5) {
            req.body.fine_applied = 3;
            req.body.fees_day = 0.2;
        }

        if (days > 0 && days > 5) {
            req.body.fine_applied = 5;
            req.body.fees_day = 0.3;
        }

        const result = await BillToPayModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Erro ao criar conta a pagar.');
        }

        res.status(201).send({message: 'Conta a pagar criada com sucesso.'});
    };

    updateBill = async (req, res, next) => {
        this.checkValidation(req);

        const { ...restOfUpdates } = req.body;

        const result = await BillToPayModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Erro ao atualizar conta a pagar.');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Conta a pagar não encontrada.' :
            affectedRows && changedRows ? 'Conta a pagar atualizada com sucesso.' : 'Erro ao atualizar conta a pagar.';

        res.send({ message, info });
    };

    deleteBill = async (req, res, next) => {
        const result = await BillToPayModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Conta a pagar não encontrada.');
        }
        res.send({message: 'Conta a pagar deletada com sucesso.'});
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Erro ao validar.', errors);
        }
    }
}

module.exports = new BillToPayController;