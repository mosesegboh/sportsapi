const express = require("express")
const router = express.Router()
const {BaseUrl, translateText, addToCache, cache} = require("../../services")

router.get("/", cache, async (req, res) => {
    suportedLanguages = ['zh-CN', 'de', 'en']
    if (suportedLanguages.includes(req.query.lang) == false){
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
            translateText( response.data.result.sports[i].desc, req.query.lang ? req.query.lang : 'en' )
            .then((translatedLang) => {
                resultArray.push(translatedLang)
                // console.log(resultArray)
                if (i == response.data.result.sports.length - 1){
                    addToCache( id = req.query.lang ? req.query.lang : 'en' , JSON.stringify(resultArray) )
                    return res.json({
                        status: "SUCCESS",
                        data: resultArray,
                    })
                }
            }) 
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