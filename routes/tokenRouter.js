const express = require('express');
let tokenRouter = express.Router();
const TokenService = require('../services/TokenService');
const apiResponseModel = require('../models/ApiResponseModel');

tokenRouter.get('/tokens/balance/yieldcoin/:address', async function(req, res){
    let privateKey = req.app.locals.privateKey;    
    let tokenService = new TokenService(privateKey);
    let responseJson = await tokenService.getYcBalanceForAddress(req.params.address);
    return res.json(responseJson);
});

tokenRouter.get('/tokens/balance/:address', async function(req, res){
    let privateKey = req.app.locals.privateKey;    
    let tokenService = new TokenService(privateKey);
    let tokenBalanceResponse = await tokenService.getTokenBalanceForAddress(req.params.address);
    let responseModel = apiResponseModel(tokenBalanceResponse);
    return res.json(responseModel);
});

tokenRouter.post('/tokens/migrate', async function(req, res){
    let privateKey = req.app.locals.privateKey;    
    let tokenService = new TokenService(privateKey);
    let migratedTokens = await tokenService.migrateTokens();
    let responseModel = apiResponseModel(migratedTokens);
    return res.json(responseModel);
});

tokenRouter.post('/tokens/purchase/:beneficiary/:currency/:currencyAmount/:tokenAmount', async function(req, res){
    let privateKey = req.app.locals.privateKey;
    let tokenService = new TokenService(privateKey);
    let currencyPurchaseResponse = await tokenService.currencyTokenPurchase(req.params.beneficiary, req.params.currency, req.params.currencyAmount, req.params.tokenAmount);
    let responseModel = apiResponseModel(currencyPurchaseResponse);
    return res.json(responseModel);
});




module.exports = tokenRouter;