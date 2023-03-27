import {Schema, model, models} from 'mongoose';

const historySchema = new Schema({
    id: Number,
    deliveryDate: Date,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipCode: Number
})

const History = models.History || model('History', historySchema);

export default History;