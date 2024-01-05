import express from "express";
import wikiscrapper from '../Scrapper/scrapper.js';
const router  = express.Router();


// router.get('/:key',async (req,res)=>{
//     let search_key = req.params.key;
//     search_key = search_key.toLowerCase();
//     let data;
//     await wikiscrapper(search_key)
//         .then((scrape)=>{
//             data=scrape
//         })
//     await res.send(data)
// })

router.get('/',async (req,res)=>{
    let {search} = req.query;
    let data;
    if(!search){
        return res.status(401).json({msg:'Please enter a valid query'})
    }
    await wikiscrapper(search)
        .then((scrape)=>{
            data=scrape
        })
        .catch((err)=>{
            res.send("Error Occured")
        })
    await res.send(data)
})

export default router;