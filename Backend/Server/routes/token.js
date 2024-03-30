const { Router } = require('express');
const { Token } = require('../../DB');
const router = Router();

router.post('/token', async (req, res) => {
    try {
        const { name, symbol, decimals, creator, tokenAddress } = req.body;

        // Create a new token in the database using Token.create()
        const response = await Token.create({
            name,
            symbol,
            decimals,
            creator,
            tokenAddress
        });

        const id = response._id;

        // Send the created token and its id as the response
        res.status(201).json({
            msg: 'Token created',
            token: response,
            id: id
        });
    } catch (error) {
        console.error('Error creating token:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/token', async(req, res) => {
    const response = await Token.find({})
    res.json({
        data: response
    })
});

module.exports = router;
