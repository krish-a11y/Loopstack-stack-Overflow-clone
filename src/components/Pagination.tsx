"use client"
// this component controls the navigation from one page to other where each page contain some questions and  a prev and next button
import {usePathname,useRouter,useSearchParams} from "next/navigation"
import React from "react"

const Pagination=({
    className,
    total,//total number of pages
    limit,//question per page
}:{className?:string,
    limit:number,
    total:number,
})=>
{
// copies what are the params of the URL like page sort
    const searchParams=useSearchParams();

    // get which on which page number we are on (from the URL)
    const page=searchParams.get("page")||"1";

    // count how many total pages are needed to show total question
    const totalPages=Math.ceil(total/limit);
    const router=useRouter();

    // it stores on which path we are currently on (like ---/question)
    const pathname=usePathname();

    // for going to the last page
    const prev = () => {
        // if we are currently on 1st page we cant go to last page
      if (page <= "1") return;
      const pageNumber = parseInt(page);

    //   chaging the  param page 
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", `${pageNumber - 1}`);

    //   redirecting  to the prev page
      router.push(`${pathname}?${newSearchParams}`);
    };

    // for going next page
       const next = () => {
        // if we are on the last page
         if (page >= `${totalPages}`) return;
         const pageNumber = parseInt(page);

        //  changing the params 
         const newSearchParams = new URLSearchParams(searchParams);
         newSearchParams.set("page", `${pageNumber + 1}`);

        //  redirecting  to new page

         router.push(`${pathname}?${newSearchParams}`);
       };
    return (
      <div className="flex items-center justify-center gap-4">
        <button
          className={`${className} rounded-lg bg-white/10 px-2 py-0.5 duration-200 hover:bg-white/20`}
          onClick={prev}
          disabled={page <= "1"}
        >
          Previous
        </button>
        <span>
          {page} of {totalPages || "1"} {/* incase totalPage is 0 */}
        </span>
        <button
          className={`${className} rounded-lg bg-white/10 px-2 py-0.5 duration-200 hover:bg-white/20`}
          onClick={next}
          disabled={page >= `${totalPages}`}
        >
          Next
        </button>
      </div>
    );
}

export default Pagination