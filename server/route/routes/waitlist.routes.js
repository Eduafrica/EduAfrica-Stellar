import express from 'express'
import * as controllers from '../../controllers/waitlist.controllers.js'
import { getLocation } from '../../middlewares/location.js'

const router = express.Router()

//POST
router.post('/join', controllers.newWaitList)

//GET
router.get('/count', getLocation, controllers.getWaitListMembersCount)
router.get('/', getLocation, controllers.getWaitListMembers)

export default router