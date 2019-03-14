const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Quest = new Schema({
    name: String,
    userID: String,
    type: String,
    completed: Boolean,
    description: String,
});

module.exports = mongoose.model('quests', Quest);


/* 
    Different types of quests:
        1. Quantitive -> Gather certain ammount of something to complete
        2. Boolean -> finish certain task to complete
*/