import { getSignUpCompanyList } from "@/pages/api/member";
import { useQuery } from "react-query";

const SignUpCompayList = () => {

    
    const { data, status } = useQuery('getSignUpCompanyList', getSignUpCompanyList, {
        onSuccess: res => {
            // console.log(res)
        }
    })


    if(status == 'loading'){
        return <p></p>
    }

    if (status == 'error') {
        return <p>데이터 로딩 문제가 발생했습니다</p>;
    }



    return (
        <select name="company_id">
            {data && data.map(({
                no,
                company_id,
                company_name,
            }:any) => (
                <option key={`SignUpCompayList${no}`} value={company_id}>{company_name}</option>
            ))}
        </select>
    );
}

export default SignUpCompayList;