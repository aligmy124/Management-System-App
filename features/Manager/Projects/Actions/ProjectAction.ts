"use server"
import {ProjectSchema, ProjectFormData} from "../Schema/Schema"
import { ApiError } from "@/lib/api-error";
import {createProject} from "../services/ProjectsServices"
import { revalidatePath } from 'next/cache'
export async function projectAction(data:ProjectFormData){
    const result=ProjectSchema.safeParse(data);
    if(!result.success){
        return{
            success:false,
            message:"Invalid form data",
            fieldErrors:result.error.flatten().fieldErrors
        }
    }
    try{
        await createProject(result.data);
        revalidatePath("/dashboard/projects");
        return{
            success:true,
            message:"create project Successfully"
        }
    }catch (error) {
    if (error instanceof ApiError) {
        return {
            success: false,
            message: error.message,
            fieldErrors: error.fieldErrors
        };
    }
    return {
        success: false,
        message: "Something went wrong"
    };
}
}