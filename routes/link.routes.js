const { Router } = require('express');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');
const config = require('config');
const shortid = require('shortid');
const router = Router();

// link generation page
router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const { from } = req.body;

        const code = shortid.generate();

        const existLink = await Link.findOne({ from });

        if (!existLink) {
            return res.json({ link: existLink });
        }

        const to = baseUrl + '/t/' + code;

        const link = new Link({
            code,
            to,
            from,
            owner: req.user.userId,
        });

        await link.save();

        res.status(201).json({ link });
    } catch (e) {
        res.status(500).json({ message: 'Something going wrong, try again' });
    }
});

// page of user links
router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId });
        res.json(links);
    } catch (e) {
        res.status(500).json({ message: 'Something going wrong, try again' });
    }
});

// page with link ID
router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    } catch (e) {
        res.status(500).json({ message: 'Something going wrong, try again' });
    }
});

module.exports = router;
