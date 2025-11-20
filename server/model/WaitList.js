import mongoose from "mongoose";

const WaitListSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [ true, 'Email address is required'],
        unique: [ true, 'Email address must be unique']
    },
    name: {
        type: String,
        required: [ true, 'Name is required' ]
    },
    mobileNumber: {
        type: String
    },
    country: {
        type: String
    }
},
{ 
    timestamps: true
}
)

const WaitListModel = mongoose.model('waitlist', WaitListSchema)
export default WaitListModel