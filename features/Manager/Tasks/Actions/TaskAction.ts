"use server"
import { TaskSchema, TaskFormData } from "../Schema/Schema";
import {createTaskServices} from "../Services/TasksServices";
import { revalidatePath } from 'next/cache'
import { ApiError } from "@/lib/api-error";
export async function taskAction(data: TaskFormData){
    const result= TaskSchema.safeParse(data);
    if(!result.success){
        return{
            success:false,
            message:"Invalid form data",
            fieldErrors:result.error.flatten().fieldErrors
        }
    }
    try{
       await createTaskServices(result.data);
       revalidatePath("/dashboard/tasks");
        return{
            success:true,
            message:"Task created successfuly"
        }
    }catch(error){
        if(error instanceof ApiError){
            return{
                success:false,
                message:error.message,
                fieldErrors: error.fieldErrors
            }
        }
return {
        success: false,
        message: "Something went wrong"
    };
    }
}