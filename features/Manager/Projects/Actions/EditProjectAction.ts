"use server"
import {ProjectFormData, ProjectSchema} from "../Schema/Schema"
import { editProject } from "../services/ProjectsServices";
import { ApiError } from "@/lib/api-error";
import {revalidatePath} from "next/cache"
export async function editProjectAction(data:ProjectFormData , id: number){

    const result=ProjectSchema.safeParse(data);
    if(!result.success){
        return{
            success:false,
            message:"Invalid form data",
            fieldErrors: result.error.flatten().fieldErrors
        }
    }
    try {
        const res=await editProject(result.data , id); 
        revalidatePath("/dashboard/projects");
        return{
            success:true,
            message:"Edit Project Successfully",
        }
       
    } catch (error) {
        if(error instanceof ApiError){
            return{
                success:false,
                message:error.message,
                fieldErrors:error.fieldErrors
            }
        }
        return{
            success:false,
            message:"Unexpected error occurred",
        }
    }
    
}