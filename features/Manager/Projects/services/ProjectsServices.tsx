import { apiFetch } from "@/lib/fetch";
import { ProjectResponse, ProjectCreation, ProjectQuery, ResponseCreateProduct } from "../Types/Types";
export async function projectManagerServices(
  options:ProjectQuery={},
):Promise<ProjectResponse> {
  const{
    pageNumber=1,
    pageSize=10,
    title=""
  }=options;
  const params=new URLSearchParams({
    pageNumber:String(pageNumber),
    pageSize:String(pageSize)
  });

  if(title){
    params.set("title",title)
  }
  return apiFetch<ProjectResponse>(`/Project/manager?${params.toString()}`, {
    next: {
      revalidate: 0,
    },
  });
}
export async function createProject(data:ProjectCreation){
  return apiFetch<ResponseCreateProduct>("/Project",{
    method:"POST",
    body:JSON.stringify(data)
  })
}
export async function deleteProject(id:number){
  return apiFetch(`/Project/${id}`,{
    method:"DELETE",
  })
}

export async function editProject(data:ProjectCreation , id: number){
  return apiFetch(`/Project/${id}`,{
    method:"PUT",
    body:JSON.stringify(data)
  })
}