const shortid = require('shortid');
const URL = require('../models/url')
const handleGenerateNewShortUrl = async (req, res) => {
    const shortID = shortid.generate();
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'Url is required' })
    await URL.create({
        shortId: shortID,
        redirectUrl: url,
        visitHistory: []
    })
    res.json({ id: shortID })
}


const handleRedirectToUrl = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: { timeStamp: Date.now() }
            }
        }
    );
    res.redirect(entry.redirectUrl)
}

const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    res.json({ totalClick: result.visitHistory.length, analytics: result.visitHistory })
}

module.exports = {
    handleGenerateNewShortUrl,
    handleRedirectToUrl,
    handleGetAnalytics
}