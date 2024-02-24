"use server"

import { CreateCategoryParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"



export const createCategory = async ({ categoryName }: CreateCategoryParams)=>{
   try {
     await connectToDatabase();
   } catch (error) {
     handleError(error)
   }
}