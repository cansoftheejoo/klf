import { getBankList } from "@/pages/api/mypage";
import { useQuery } from "react-query";

const MyAccountBankList = ({
    values,
    setValues = () => {}
}:any) => {

    const { data, status } = useQuery('getBankList', getBankList, {
        onSuccess: res => {
            // console.log(res)
        }
    })


    if(status == 'loading'){
        return (
            <select>
                <option value="">은행선택</option>
            </select>
        )
    }

    if (status == 'error') {
        return <p>데이터 로딩 문제가 발생했습니다</p>;
    }


    return (
        <select
            value={values.bank_name}
            onChange={e => setValues({ ...values, bank_name: e.target.value })}
        >
            <option value="">은행선택</option>
            {data?.data && data?.data.map(({bank_name}: { bank_name:string }) =>  <option key={bank_name} value={bank_name}>{bank_name}</option>)}
        </select>
    );
}

export default MyAccountBankList;