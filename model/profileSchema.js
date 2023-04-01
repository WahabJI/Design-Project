import {Schema, model, models} from 'mongoose';

const profileSchema = new Schema({
    id: Number,
    email: String,
    profilePage: [{
        firstName: String,
        lastName: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        zip: String,
    }]
    
})

const Profile = models.Profile || model('Profile', profileSchema);

export default Profile;