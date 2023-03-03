const BaseUrl = 'https://partners.betvictor.mobi/en-gb/in-play/1/events'
require('dotenv').config()

const redis = require('redis')
const REDIS_PORT = process.env.PORT || 6379
const client = redis.createClient(REDIS_PORT)
client.connect()

const {Translate} = require('@google-cloud/translate').v2;
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

const translateText = async (text, targetLanguage) => {
    try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
};

const addToCache = ($key, $value) => {
    client.setEx($key, process.env.EXPIRY, $value)
}

const cache = async (req, res, next) => {
    const {id} = req.params.id ? req.params : { id: 'en'}
   
    try {
        const  data = await client.get(id)
        if(data !== null){
            return res.json({
                status: "SUCCESS", 
                data: JSON.parse(data),
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error.message)
        return res.json({
            status: "FAILED", 
            data: "An error Occured",
        })
    } 
}

module.exports = {BaseUrl, addToCache, cache, translateText}