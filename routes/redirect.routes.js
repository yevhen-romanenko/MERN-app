const { Router, request } = require('express');
const Link = require('../models/Link');
const { route } = require('./link.routes');
const router = Router();

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({ code: req.params.code });

        if (link) {
            link.clicks++;
            await link.save();
            return res.redirect(link.from);
        }

        res.status(404).json({ message: 'Link not found' });
    } catch (e) {
        res.status(500).json({ message: 'Something going wrong, try again' });
    }
});

module.exports = router;
