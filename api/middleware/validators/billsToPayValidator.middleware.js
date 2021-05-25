const { body } = require('express-validator');
const { moment } = require('moment');

exports.createBillToPaySchema = [
    body('name')
        .exists()
        .withMessage('O campo Nome é obrigatório.')
        .isLength({ min: 3 })
        .withMessage('Precisa de no mínimo 3 caracteres.'),
    body('original_value')
        .exists()
        .withMessage('O campo Valor Original é obrigatório.')
        .isDecimal()
        .withMessage('O campo Valor Original precisa ser Decimal.'),
    body('duedate')
        .exists()
        .withMessage('O campo Data de Vencimento é obrigatório.')
        .isDate()
        .withMessage('Por favor, informe uma data válida no formato YYYY-MM-DD.'),
    body('payday')
        .exists()
        .withMessage('O campo Data de Vencimento é obrigatório.')
        .isDate()
        .withMessage('Por favor, informe uma data válida no formato YYYY-MM-DD.'),
];

exports.updateBillToPaySchema = [
    body('name')
        .exists()
        .withMessage('O campo Nome é obrigatório.')
        .isLength({ min: 3 })
        .withMessage('Precisa de no mínimo 3 caracteres.'),
    body('original_value')
        .exists()
        .withMessage('O campo Valor Original é obrigatório.')
        .isDecimal()
        .withMessage('O campo Valor Original precisa ser Decimal.'),
    body('duedate')
        .exists()
        .withMessage('O campo Data de Vencimento é obrigatório.')
        .isDate()
        .withMessage('Por favor, informe uma data válida no formato YYYY-MM-DD.'),
    body('payday')
        .exists()
        .withMessage('O campo Data de Vencimento é obrigatório.')
        .isDate()
        .withMessage('Por favor, informe uma data válida no formato YYYY-MM-DD.'),
];