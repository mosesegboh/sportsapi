const express = require("express")
const router = express.Router()
var axios = require('axios')
const {BaseUrl, addToCache, cache} = require("../../services")

router.get("/:id",  cache, async (req, res) => {
    const {id} = req.params
    var config = {
      method: 'get',
      url: `${BaseUrl}`,
      headers: { 
        'Content-Type': 'application/json'
      }
    };
    
    axios(config)
    .then(function (response) {
        var idFound = false
        response.data.result.sports.forEach((item) => {
            if (item.comp.length > 0) {
                item.comp.forEach((newItem) => {
                    newItem.events.forEach((event)=>{
                        if (event.id == +id) {
                            idFound = true
                            addToCache(id, JSON.stringify(event))
                            return res.json({
                                status: "SUCCESS", 
                                data: event,
                            })
                        }
                    })
                    if (idFound !== true) throw new Error('ID not found')
                })
            }
        })
    })
    .catch(function (error) {
        console.log(error);
        return res.json({
            status: "FAILED",
            message: error.message,
        })
    })
})

module.exports = router; 