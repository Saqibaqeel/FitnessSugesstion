const Router = require('express').Router();
const { fitnessPlanService } = require('../controllers/dietSuggesstion');



Router.post('/diet-suggestion', fitnessPlanService);
module.exports = Router;