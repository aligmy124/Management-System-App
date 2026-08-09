"use client"
import {
  Search,
} from "lucide-react";
import useDebounce from "@/hooks/useDebounce"
import {useSearchParams, usePathname, useRouter} from "next/navigation"
import {useState, useEffect} from "react"
interface Props{
    search:string
}
export default function Searchinputs({search}:Props){
    const [searchInput, setSearchInput] = useState(search);
    const debounced= useDebounce(searchInput, 500);
    const searchParams=useSearchParams();
    const pathname=usePathname();
    const router=useRouter();

    useEffect(() => {
        setSearchInput(search);
    }, [search]);


    useEffect(()=>{
        const params=new URLSearchParams(searchParams.toString());
        if(debounced){
            params.set("title", debounced);
            params.set("pageNumber","1");
        }else{
            params.delete("title");
            params.delete("pageNumber")
        }
        router.replace(`${pathname}?${params.toString()}`)
    },[debounced])
    return(
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E95A9]"
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-48 rounded-lg border border-[#EFF0F4] py-1.5 pl-9 pr-3 text-sm text-[#191C1E] placeholder:text-[#8E95A9] focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
            />
          </div>
    )
}