import {apiFetch} from "@/lib/fetch"
import {TaskResponse, TaskQuery} from "../Types/Types"
export interface UpdateTaskStatusRequest {
  status: string;
}
export async function taskServices( 
  options:TaskQuery={}
):Promise<TaskResponse>{
  const{
    pageNumber=1,
    pageSize=10,
    title="",
    status=""
  }=options

  const params=new URLSearchParams({
    pageNumber:String(pageNumber),
    pageSize:String(pageSize)
  });

  if(title){
    params.set("title", title);
  }
  if(status){
    params.set("status", status)
  }

    return apiFetch<TaskResponse>(`/Task?${params.toString()}`,{
        next:{revalidate:60}
    })
}


export async function updateTaskStatusService(id: number, data: UpdateTaskStatusRequest) {
  return apiFetch(`/Task/${id}/change-status`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

