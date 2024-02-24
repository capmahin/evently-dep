"use server"

import { CreateCategoryParams } from "@/types"
import { handleError } from "../utils"



export const createCategory = async ({ categoryName }: CreateCategoryParams)=>{
   try {
    
   } catch (error) {
     handleError(error)
   }
}