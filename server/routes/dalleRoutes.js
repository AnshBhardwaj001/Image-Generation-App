// import express from 'express'
// import * as dotenv from 'dotenv'
// import {Configuration , OpenAIApi} from 'openai'

// dotenv.config()

// const router = express.Router()

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// })

// const openai = new OpenAIApi(configuration)

// router.route('/').get((req,res) => {
//     res.send("HEllo from operai...")
// })

// export default router

import express, { response } from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai'; // Import the OpenAI class directly

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req, res) => {
  res.send("Hello from OpenAI...");
});

// router.route('/').post(async (req , res) => {
//     try {
//         const {prompt} = req.body
//         const ai_Res = await openai.images.generate({
//             prompt,n:1,size: '1024x1024',response_format: 'b64_json'
//         })
//         const image = ai_Res.data.data[0].b64_json;
//         res.status(200).json({photo: image});
//     }catch(e){
//         console.log(e)
//         res.status(500).send(e)
//     }
// })

router.route('/').post(async (req, res) => {
    try {
      const { prompt } = req.body;
  
      const image = await openai.images.generate({
        model:"dall-e-2",
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      });
  
      const imageData = image.data.data[0].b64_json;
      res.status(200).json({ photo: imageData });
    } catch (e) {
        console.error(e); // Use console.error for error messages
        if(e.status == 400){
            res.status(400).send('Billing hard limit has been reached.')
        }else{
            res.status(500).send({ error: 'Image generation failed' }); // Send a more informative error message
        }
    }
  });

export default router;