"use client"; 
 
type PaginationProps = { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void; 
}; 
 
export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
}: PaginationProps) { 
  if (totalPages <= 1) { 
    return null; 
  } 
 
  return ( 
    <div 
      className=" 
        flex 
        items-center 
        justify-center 
        gap-2 
        pt-10 
        pb-4 
      " 
    > 
      {/* PREVIOUS */} 
 
      <button 
        type="button" 
        disabled={currentPage === 1} 
        onClick={() => 
          onPageChange(currentPage - 1) 
        } 
        className=" 
          flex 
          h-[46px] 
          items-center 
          gap-2 
          rounded-[9px] 
          border 
          border-[#e1e5eb] 
          bg-white 
          px-5 
          text-[15px] 
          font-medium 
          text-[#27304a] 
          transition-all 
          duration-200 
 
          hover:border-[#cfd4dc] 
          hover:bg-[#fafafa] 
 
          disabled:cursor-not-allowed 
          disabled:text-[#b5b8bd] 
          disabled:hover:border-[#e1e5eb] 
          disabled:hover:bg-white 
        " 
      > 
        <span 
          className=" 
            text-[21px] 
            leading-none 
          " 
        > 
          ‹ 
        </span> 
 
        <span> 
          Previous 
        </span> 
      </button> 
 
      {/* PAGE NUMBERS */} 
 
      <div 
        className=" 
          flex 
          items-center 
          gap-2 
        " 
      > 
        {Array.from( 
          { length: totalPages }, 
          (_, index) => index + 1, 
        ).map((page) => ( 
          <button 
            key={page} 
            type="button" 
            onClick={() => 
              onPageChange(page) 
            } 
            className={` 
              flex 
              h-[46px] 
              min-w-[46px] 
              items-center 
              justify-center 
              rounded-[9px] 
              px-3 
              text-[15px] 
              font-medium 
              transition-all 
              duration-200 
 
              ${ 
                page === currentPage 
                  ? ` 
                    bg-[#cf0006] 
                    text-white 
                    shadow-[0_2px_6px_rgba(207,0,6,0.18)] 
                  ` 
                  : ` 
                    border 
                    border-[#e1e5eb] 
                    bg-white 
                    text-[#27304a] 
 
                    hover:border-[#cfd4dc] 
                    hover:bg-[#fafafa] 
                  ` 
              } 
            `} 
          > 
            {page} 
          </button> 
        ))} 
      </div> 
 
      {/* NEXT */} 
 
      <button 
        type="button" 
        disabled={ 
          currentPage === totalPages 
        } 
        onClick={() => 
          onPageChange(currentPage + 1) 
        } 
        className=" 
          flex 
          h-[46px] 
          items-center 
          gap-2 
          rounded-[9px] 
          border 
          border-[#e1e5eb] 
          bg-white 
          px-5 
          text-[15px] 
          font-medium 
          text-[#27304a] 
          transition-all 
          duration-200 
 
          hover:border-[#cfd4dc] 
          hover:bg-[#fafafa] 
 
          disabled:cursor-not-allowed 
          disabled:text-[#b5b8bd] 
          disabled:hover:border-[#e1e5eb] 
          disabled:hover:bg-white 
        " 
      > 
        <span> 
          Next 
        </span> 
 
        <span 
          className=" 
            text-[21px] 
            leading-none 
          " 
        > 
          › 
        </span> 
      </button> 
    </div> 
  ); 
}
