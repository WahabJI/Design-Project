import {Schema, model, models} from 'mongoose';

const historySchema = new Schema({
    id: Number,
    email: String,
    quoteHistory: [{
        deliveryDate: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        zipCode: String,
        gallonsRequested: Number,
        pricePerGallon: Number,
        totalAmountDue: Number
    }]
    
})

const History = models.History || model('History', historySchema);

export default History;