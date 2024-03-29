const { Router } = require('express');
const router = Router();
const { Token } = require('../../DB');

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

        await response.save();
        const id = response._id;
        console.log(id);

        // Send the created token as the response
        res.status(201).json({
            msg: 'Created'
        });
    } catch (error) {
        console.error('Error creating token:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
