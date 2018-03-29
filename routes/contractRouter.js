const express = require('express');
let contractRouter = express.Router();
const ContractService = require('../services/ContractService');
const TokenService = require('../services/TokenService');

const apiResponseModel = require('../models/ApiResponseModel');

// Pause or Unpause contract
contractRouter.post('/contract/paused/:pausestate', async function(req, res){
  let privateKey = req.app.locals.privateKey;      
  let contractService = new ContractService(privateKey);
  let setPausedStateResponse = await contractService.setPausedState(req.params.pausestate);
  let responseModel = apiResponseModel(setPausedStateResponse);  
  return res.json(responseModel);
 });

 // Get current paused state for contract
 contractRouter.get('/contract/pausestate', async function(req, res){
  let privateKey = req.app.locals.privateKey;      
  let contractService = new ContractService(privateKey);
  let pauseStateResponse = await contractService.getPauseState();
  let responseModel = apiResponseModel(pauseStateResponse);  
  return res.json(responseModel);  
 });

// Get total FRTs for current round
contractRouter.get('/contract/currentroundtotal', async function(req, res){
  let privateKey = req.app.locals.privateKey;    
  let tokenService = new TokenService(privateKey);
  let currentAmountRaised = await tokenService.getCurrentRaisedFrtAmount();
  let responseModel = apiResponseModel(currentAmountRaised);
  return res.json(responseModel);
});


// Update the end time for the contract
contractRouter.post('/contract/updateendtime/:datetime', async function(req, res){
  let privateKey = req.app.locals.privateKey;      
  let contractService = new ContractService(privateKey);
  let updateEndtimeResponse = await contractService.updateEndtime(req.params.datetime);
  let responseModel = apiResponseModel(updateEndtimeResponse);
  return res.json(responseModel);
});

module.exports = contractRouter;