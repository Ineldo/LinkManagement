const express = require('express');
const route = express.Router();
const services= require('../services/render');
const links = require('../controller/controller')





/**
 * @description Root route
 * @method GET
 */
route.get('/',services.homeRoutes);
route.get('/add-link',services.addLink);
route.get('/update-link', services.updateLink);

//API
route.put('/api/link/:id',links.update);
route.delete('/api/links/:id',links.delete);
route.get('/api/link/:id',links.getSingleLink);
route.post('/api/links',links.createLink);
route.get('/api/links',links.findLink);


module.exports=route