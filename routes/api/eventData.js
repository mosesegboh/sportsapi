const express = require("express")
const router = express.Router()
var axios = require('axios')
const {BaseUrl, addToCache, cache, config} = require("../../services")

router.get("/:id", cache, async (req, res) => {
    const { id } = req.params;

    try {

        const response = await axios(config);

        for (const item of response.data.result.sports) {
            for (const newItem of item.comp) {
                for (const event of newItem.events) {
                    if (event.id === +id) {
                        addToCache(id, JSON.stringify(event));
                        return res.json({
                            status: "SUCCESS", 
                            data: event,
                        });
                    }
                }
            }
        }

        throw new Error('ID not found');
    } catch (error) {
        console.log(error);
        return res.json({
            status: "FAILED",
            message: error.message,
        });
    }
});

module.exports = router;