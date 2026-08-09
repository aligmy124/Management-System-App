import {apiFetch} from "@/lib/fetch"
import {TaskResponse, TaskQuery, CreateTask, TaskUpdateRequest} from "../Types/Types"
export async function taskManagerServices(
    options: TaskQuery ={}
): Promise<TaskResponse>{
    const{
        pageNumber=1,
        pageSize=10,
        title="",
        status
    }=options;

    const params=new URLSearchParams({
        pageNumber:String(pageNumber),
        pageSize:String(pageSize)
    });

    if(title){
        params.set("title", title);
    }

    if(status){
        params.set("status", status);
    }

    return apiFetch<TaskResponse>(`/Task/manager?${params.toString()}`,{
        next:{revalidate:60}
    })
}

export async function createTaskServices(data:CreateTask){
    return apiFetch('/Task',{
        method:'POST',
        body:JSON.stringify(data)
    })
}
export async function deleteTaskServices(id:number){
    return apiFetch(`/Task/${id}`,{
        method:'DELETE',
    })
}

export async function updateTaskService(data: TaskUpdateRequest, id: number) {
  return apiFetch(`/Task/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}