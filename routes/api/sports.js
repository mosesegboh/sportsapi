const express = require("express")
const router = express.Router()
const {BaseUrl, translateText, addToCache, cache} = require("../../services")

router.get("/", cache, async (req, res) => {
    var id = req.query.lang ? req.query.lang : 'en'
    suportedLanguages = ['zh-CN', 'de', 'en']
    if (suportedLanguages.includes(id) == false){
        return res.json({
            status: "FAILED",
            msg: "Language Not supported",
        })
    }

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
        var resultArray = []
        for (let i = 0; i < response.data.result.sports.length; i++) {
            setTimeout(() => {
            translateText( response.data.result.sports[i].desc, id )
            .then((translatedLang) => {
                    resultArray.push(translatedLang)
                    if (resultArray.length == response.data.result.sports.length) {
                        addToCache(id, JSON.stringify(resultArray) )
                        return res.json({
                            status: "SUCCESS",
                            data: resultArray,
                        })
                    }
                }) 
            }, 2000)
        }  
    })
    .catch(function (error) {
        console.log(error);
        return res.json({
            status: "FAILED",
            message: "An error Occured",
        })
    })
})

module.exports = router