import { getCategory } from "@/pages/api/main";
import { useQuery } from "react-query";

const AddClassCategory = ({
    onChange = (val:any) => {}
}) => {

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
        return <p></p>
    }

    if (status == 'error') {
        return <p>데이터 로딩 문제가 발생했습니다</p>;
    }
    

    return (
        <select className="container" name="category" onChange={e => {
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