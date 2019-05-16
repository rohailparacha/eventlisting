const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const EventsSchema = new Schema({
    
    title: {
        type: String
    },    
    description: {
        type: String
    },
    location:{
        type:String
    },
    lat:{
        type:String
    },
    long:{
        type:String
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: Date.now
    },
    color: {
        type: String,
        default: '#8c2b0e' 
    }
},{ versionKey: false });


module.exports = Events = mongoose.model('eventsN',EventsSchema);
