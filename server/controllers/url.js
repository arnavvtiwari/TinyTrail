const Url = require('../models/url');
const shortid = require('shortid');
 
async function createShortUrl(req, res) {
    const shortId = shortid();
    if(!req.body.url){
        return res.status(400).json({error: 'url is required'});
    }
    await Url.create({ shortId: shortId, redirectURL: req.body.url, visitHistory: [] });
    return res.status(201).json({shortId: shortId});
}
module.exports = { createShortUrl };