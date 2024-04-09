import { getCategory } from "@/pages/api/main";
import { useQuery } from "react-query";

const AddClassCategory = ({
    init = '',
    onChange = (val:any) => {}
}:any) => {

    const { data, status } = useQuery('getCategory', getCategory, {
        onSuccess: res => {
            // console.log(res)
            onChange({
                no: res?.[0]?.no,
                category_id: res?.[0]?.category_id,
            })
        }
    })


    if(status == 'loading'){
        return (
            <select>
                <option value="">카테고리 선택</option>
            </select>
        )
    }

    if (status == 'error') {
        return <p>데이터 로딩 문제가 발생했습니다</p>;
    }
    

    return (
        <select className="container" name="category"
        defaultValue={init}
        onChange={e => {
            onChange({
                no: e.target.value,
                category_id:  e.target.selectedOptions[0].dataset.category_id,
            })
        }}>
            {data && data?.map(({
                no, cate_name, category_id, img_name
            }:any, i:number) => (
            <option value={no} data-category_id={category_id} key={`sub-category-${i}`}>{cate_name}</option>
            ))}
        </select>
    );
}

export default AddClassCategory;