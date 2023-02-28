const express = require("express");
const router = express.Router()
const {BaseUrl} = require("../../services")

router.get("/", async (req, res) => {
    var axios = require('axios');

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
            resultArray.push(item.desc)
        })
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