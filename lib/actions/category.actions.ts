"use server"

import { CreateCategoryParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"



export const createCategory = async ({ categoryName }: CreateCategoryParams)=>{
   try {
     await connectToDatabase();

     const newCategory = await Category.create({name: categoryName});
   } catch (error) {
     handleError(error)
   }
}