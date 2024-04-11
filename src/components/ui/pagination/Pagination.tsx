import Image from "next/image";
import { useEffect, useState } from "react";
import styles from './dist/Pagination.module.css';
import { Icon } from "@iconify/react/dist/iconify.js";

const Pagination = ({
    currentPage = 1,
    totalPages = 1,
    result = (val) => {},
}:{
    currentPage: number,
    totalPages: number,
    result?: (val:number) => void,
}) => {

    const [PageList, setPageList] = useState<number[]>([])
    const [pageNum, setPageNum] = useState<number>(1)
    useEffect(() => setPageNum(currentPage), [currentPage])

    const [lastNum, setLastNum] = useState<number>(1)
    useEffect(() => setLastNum(totalPages), [totalPages])

    const [lastPageNum, setLastPageNum] = useState<number>(0)

    const PAGE_LENGTH = 10 // 페이지당 리스트 수
    const MAX_PAGE_PER_GROUP = 5; // 한 그룹당 보여줄 페이지 수

    function goToPage(page:number) {
        if (page >= 1 && page <= lastNum) {
        setPageNum(page);
        result(page)
        }
    }

    function goToPrevPage() {
        if (pageNum > 1) {
            setPageNum(prev => prev - 1);
            result(pageNum - 1)
        }
    }
    function goToPrevGroup() {
        let thisGroup = Math.floor((pageNum - 1) / MAX_PAGE_PER_GROUP) // 0,1,2 ...
        let newInit = ((thisGroup - 1) * MAX_PAGE_PER_GROUP) + 1

        
        if(thisGroup > 0){
            setPageNum(newInit)
            setPageList(getPages());
            result(newInit)
        }
        
    }

    function goToNextPage() {
        if (pageNum < lastNum) {
            setPageNum(prev => prev + 1);
            result(pageNum + 1)
        }
    }
    function goToNextGroup() {


        let thisGroup = Math.floor((pageNum - 1) / MAX_PAGE_PER_GROUP)
        let newInit = ((thisGroup + 1) * MAX_PAGE_PER_GROUP) + 1

        let lastGroup = Math.floor((lastPageNum - 1) / MAX_PAGE_PER_GROUP)
        let lastNewGroup = ((lastGroup + 1) * MAX_PAGE_PER_GROUP) + 1
        
        if(totalPages >= newInit){
            if(newInit <= lastNewGroup){
                setPageNum(newInit)
                setPageList(getPages());
                result(newInit)
              }
        }

   
        

    }
    function getPages() {
        const pages = [];

        setLastPageNum(Math.ceil(lastNum / PAGE_LENGTH))

        // 전체 페이지 수가 MAX_PAGE_PER_GROUP보다 작은 경우
        if (lastNum <= MAX_PAGE_PER_GROUP) {
        for (let i = 1; i <= lastNum; i++) {
            pages.push(i);
        }
        }
        // 전체 페이지 수가 MAX_PAGE_PER_GROUP보다 큰 경우
        else {
        const startPage = Math.floor((pageNum - 1) / MAX_PAGE_PER_GROUP) * MAX_PAGE_PER_GROUP + 1;
        const endPage = Math.min(startPage + MAX_PAGE_PER_GROUP - 1, lastNum);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        }

        return pages;
    }
  

    useEffect(() => {

        function getPages() {
            const pages = [];
    
            setLastPageNum(Math.ceil(lastNum / PAGE_LENGTH))
    
            // 전체 페이지 수가 MAX_PAGE_PER_GROUP보다 작은 경우
            if (lastNum <= MAX_PAGE_PER_GROUP) {
            for (let i = 1; i <= lastNum; i++) {
                pages.push(i);
            }
            }
            // 전체 페이지 수가 MAX_PAGE_PER_GROUP보다 큰 경우
            else {
            const startPage = Math.floor((pageNum - 1) / MAX_PAGE_PER_GROUP) * MAX_PAGE_PER_GROUP + 1;
            const endPage = Math.min(startPage + MAX_PAGE_PER_GROUP - 1, lastNum);
    
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            }
    
            return pages;
        }
       
        setPageList(getPages());
      }, [lastNum, pageNum]);
    

    return (
        <div className={styles.pagination}>
            <button onClick={goToPrevGroup}><Icon icon="ri:arrow-left-double-fill" /></button>
            <button onClick={goToPrevPage}><Icon fontSize={11} icon="ooui:next-rtl" /></button>
            {PageList.map((page) => (
                <button key={`page${page}`} className={page == pageNum ? styles.active : ''} onClick={() => goToPage(page)}>{page}</button>
            ))}
            <button onClick={goToNextPage}><Icon fontSize={11} icon="ooui:next-ltr" /></button>
            <button onClick={goToNextGroup}><Icon icon="ri:arrow-right-double-fill" /></button>
        </div>
    );
}

export default Pagination;