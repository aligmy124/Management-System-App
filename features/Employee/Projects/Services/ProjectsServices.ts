import { apiFetch } from "@/lib/fetch";
import { Project, ProjectResponse, ProjectQuery} from "../Types/Types";
export async function projectServices(
  options:ProjectQuery={},
): Promise<ProjectResponse> {
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
  return apiFetch<ProjectResponse>(`/Project/employee?${params.toString()}`, {
    next: {
      revalidate: 60,
    },
  });
}