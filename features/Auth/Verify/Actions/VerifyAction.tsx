"use server"
import {VerifyFormData, VerifySchema} from "../Schema/Schema"
import { ApiError } from "@/lib/api-error";
import { verifyServices } from "../Services/VerfiyServices";
export async function verifyAction(data:VerifyFormData){
    const result=VerifySchema.safeParse(data);
    if(!result.success){
        return{
            success:false,
            message:"Invalid form data "
        }
    }
    try{
        await verifyServices(result.data);
        return{
            success:true,
            message:"Verify Successfully"
        }
    }catch(error){
        if(error instanceof ApiError){
            return{
                success:false,
                message:error.message
            }
        }
          return {
    success: false,
    message: "Unexpected error occurred",
  };
    }
}