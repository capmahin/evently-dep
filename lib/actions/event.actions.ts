"use server"

import { CreateEventParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"

export const createEvent = async ({event, userId, path}: CreateEventParams)=>{
    try {
        await connectToDatabase();

        const organizer = await User.findById(userId);
    } catch (error) {
        handleError(error);
    }
}