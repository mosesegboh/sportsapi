const express = require("express");
const router = express.Router()
var axios = require('axios');
const {BaseUrl} = require("../../services")

router.get("/", async (req, res) => {
    const id = req.query.id
    var config = {
      method: 'get',
      url: `${BaseUrl}`,
      headers: { 
        'Content-Type': 'application/json'
      }
    };
    
    axios(config)
    .then(function (response) {
        response.data.result.sports.forEach((item) => {
            // console.log('right track')
            if (item.comp.length > 0) {
                item.comp.forEach((newItem) => {
                    // console.log('right track')
                    newItem.events.forEach((event)=>{
                        // console.log(event.id)
                        if (event.id == +id) {
                            // console.log('i was inside here')
                            return res.json({
                                status: "SUCCESS", 
                                data: event,
                            })
                        }
                    })
                })
            }
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