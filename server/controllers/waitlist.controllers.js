import { sendResponse } from "../middlewares/utils.js"
import WaitListModel from "../model/WaitList.js"

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//add new user to waitlist
export async function newWaitList(req, res) {
    const { name, email, mobileNumber, country } = req.body
    if(!name) return sendResponse(res, 400, false, null, 'Provide a name')
    if(!email) return sendResponse(res, 400, false, null, 'Provide a valid email address')
    if(!emailRegex.test(email)) return sendResponse(res, 400, false, null, 'Provide a valid email address')

    try {
        const isExist = await WaitListModel.findOne({ email })
        if(isExist) return sendResponse(res, 400, false, null, 'Email already exist')

        const newUser = await WaitListModel.create({
            name, email, mobileNumber, country
        })

        sendResponse(res, 201, true, null, 'Email added to waitlist successfully')
    } catch (error) {
        console.log('UNABLE TO ADD USER TO WAITLIST', error)
        sendResponse(res, 500, false, null, 'Unable to add user to waitlist')
    }
}

//get all waitlist members
export async function getWaitListMembersCount(req, res) {
    
    try {
        const waitlists = await WaitListModel.find()

        sendResponse(res, 200, true, { totalMembers: 1827 + waitlists.length, }, 'Wait list fetched successfull')
    } catch (error) {
        console.log('UNABE TO GET WAITLIST USER', error)
        sendResponse(res, 500, false, null, 'Unable to get waitlist users')
    }
}