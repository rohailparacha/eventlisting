const express = require('express')

const router =express.Router();
const _ = require('lodash');

const Event  = require('../../models/events');



router.post('/events',async (req,res,next)=>{

    try {

        var reqBody = {
            "title": req.body.title,
            "description": req.body.description,
            "location": req.body.location,
            "start":req.body.start,
            "end":req.body.end,
            "lat":req.body.lat,
            "long":req.body.long
        };

        console.log(JSON.stringify(reqBody));
        
        var event = await createEvent(reqBody);

        //res.status(201).json(event);

        res.redirect('/api/events');

    } catch (err) {

        console.log('Exception');
        console.error(err);
        next({
            status: 500,
            message: err
        });
    }

});


router.get('/events',async (req,res,next)=>{

    try {

        var events =await getEvents({})
        
        console.log(events);
        res.render("events", {
            data: events
        });
        

    } catch (err) {

        console.log(err);
        next({
            status: 500,
            message: err
        });
    }
     
});

router.get('/events/:id',async (req,res,next)=>{

    try {

        
        var events =await getEvents({_id:req.body.id});

        res.status(200).json(events);

    } catch (err) {

        console.log(err);
        next({
            status: 500,
            message: err
        });
    }
     
});


async function getEvents(query){
    return new Promise((resolve, reject) => {
        Event.find(query)
        .then((events)=>{

            resolve(events);
        }).catch(e=>{
            reject(e);
        });
    });

}

async function createEvent(feelingReq){

    return new Promise((resolve, reject) => {
        const event = new Event(feelingReq);

        event.save().then((savedObj)=>{
            console.log('event saved successfully')
            resolve(savedObj);
        }).catch(err=>{
            reject(err);
        });

    });
}

async function updateDeviceMap(query,updateQuery){

    return new Promise((resolve, reject) => {
      
        DeviceMap.updateOne(query, { $set: updateQuery })
        .then((updateObj)=>{
            console.log('Device map updated successfully')
            resolve(updateObj);
        }).catch(err=>{
            reject(err);
        });

    });
}




module.exports = router;