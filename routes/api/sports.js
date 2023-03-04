const express = require("express")
const router = express.Router()
const { translateText, addToCache, cache, preserveIndex, config } = require("../../services")
const axios = require('axios')

const supportedLanguages = ['zh-CN', 'de', 'en']

router.get("/", cache, async (req, res) => {
  const id = req.query.lang || 'en';

  if (!supportedLanguages.includes(id)) {
    return res.json({ status: "FAILED", msg: "Language Not supported" })
  }

  try {
    const response = await axios(config)
    const { sports } = response.data.result

    const resultArray = []
    const order = []

    for (const sport of sports) {
      order.push(sport.desc)
      const translatedLang = await translateText(sport.desc, id)
      resultArray.push(translatedLang)
    }

    addToCache(id, JSON.stringify(preserveIndex(order, resultArray)));
    return res.json({
      status: "SUCCESS",
      data: preserveIndex(order, resultArray),
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "FAILED",
      message: "An error Occured",
    })
  }
})

module.exports = router