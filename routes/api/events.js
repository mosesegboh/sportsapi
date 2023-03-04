const express = require("express");
const router = express.Router()
var axios = require('axios');
const {BaseUrl, addToCache, cache} = require("../../services")

router.get("/:id?", cache, async (req, res) => {
    var {id} = req.params.id ? req.params : {id : 'all'}
    var config = {
      method: 'get',
      url: `${BaseUrl}`,
      headers: { 
        'Content-Type': 'application/json'
      }
    };
    
    axios(config)
    .then(function (response) {
        let resultArray = []
        response.data.result.sports.forEach((item) => {
            if (id == 'all') {
                item.comp.forEach((newItem) => {
                    newItem.events.forEach((event)=>{
                        resultArray.push(event.desc)
                    }) 
                })
            }

            if (item.id == +id){
                if (item.comp.length > 0) {
                    item.comp.forEach((newItem) => {
                        newItem.events.forEach((event)=>{
                            resultArray.push(event.desc)
                        }) 
                    })
                }
            }
        })
        addToCache(id, JSON.stringify(resultArray))
        return res.json({
            status: "SUCCESS",
            data: resultArray,
        })
    })
    .catch(function (error) {
        console.log(error);
        return res.json({
            status: "FAILED",
            message: "An error Occured",
        })
    });
});

module.exports = router;