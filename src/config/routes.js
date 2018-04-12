const express = require('express')
const auth = require('./auth')

module.exports = function(server){

    //Rotas aberas
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    //Rotas Protegidas por Token
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

        
    const billingCycleService = require('../api/bilingCycle/billingCycleService')
    billingCycleService.register(protectedApi, '/billingCycles')

    const billingSummaryService = require('../api/billingSummary/billingSummaryService')
    protectedApi.route('/billingSummary').get(billingSummaryService.getSummary)
}