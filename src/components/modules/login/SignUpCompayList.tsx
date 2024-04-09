import { getSignUpCompanyList } from "@/pages/api/member";
import { useQuery } from "react-query";

const SignUpCompayList = ({ register  }:any) => {

    
    const { data, status } = useQuery('getSignUpCompanyList', getSignUpCompanyList, {
        onSuccess: res => {
            // console.log(res)
        }
    })


    if(status == 'loading'){
        return (
            <select>
                <option value="">가맹점 선택</option>
            </select>
        )
    }

    if (status == 'error') {
        return <p>데이터 로딩 문제가 발생했습니다</p>;
    }


    if(!register){
        return (
            <select>
                <option value="">가맹점 선택</option>
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


    return (
        <select {...register('company_id', { required: '가맹점을 선택하세요.' })}>
            <option value="">가맹점 선택</option>
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