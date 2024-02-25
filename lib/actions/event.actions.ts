"use server"

import { CreateEventParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"

export const createEvent = async ({event, userId, path}: CreateEventParams)=>{
    try {
        await connectToDatabase();
    } catch (error) {
        handleError(error);
    }
}