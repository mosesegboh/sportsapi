const express = require("express")
const router = express.Router()
var axios = require('axios')
const {BaseUrl, addToCache, cache} = require("../../services")

router.get("/:id?", cache, async (req, res) => {
    const { id = 'all' } = req.params

    try {
        const config = {
            method: 'get',
            url: `${BaseUrl}`,
            headers: { 
                'Content-Type': 'application/json'
            }
        };
        const response = await axios(config)
        const resultArray = []

        response.data.result.sports.forEach((item) => {
            if (id === 'all' || item.id === +id) {
                item.comp.forEach((newItem) => {
                    newItem.events.forEach((event)=>{
                        resultArray.push(event.desc)
                    }) 
                })
            }
        })

        addToCache(id, JSON.stringify(resultArray))

        return res.json({
            status: "SUCCESS",
            data: resultArray,
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status: "FAILED",
            message: "An error Occured",
        })
    }
});

module.exports = router