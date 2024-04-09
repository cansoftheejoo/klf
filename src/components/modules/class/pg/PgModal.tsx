import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import styles from './PgModal.module.css'
import Script from "next/script";
import { postOrderInfo } from "@/pages/api/class";

const PgModal = ({
    idx,
    active,
}:{
    idx?:string,
    active:boolean
}) => {

    const [init, setInit] = useState(false)
    const [data, setData] = useState()

    const formValue = useMutation(postOrderInfo)

    useEffect(() => {
    
        if(!init && active && idx){
            setInit(true)
            formValue.mutate({
                online_idx: idx
            }, {
                onSuccess: res => {
                    // console.log(res)
                    setData(res)

                    setTimeout(() => { (window as any).INIStdPay.pay('SendPayForm_id'); },1000)
    
                }
            })
        }
        
    },[active, idx])

   
    const script = `
    <script language='javascript' type='text/javascript' src='https://tstdpay.paywelcome.co.kr/stdjs/INIStdPay.js'
    charset='UTF-8'></script>
    <script type='text/javascript'>
        setTimeout(() => { INIStdPay.pay('SendPayForm_id'); },1000)
    </script>
    `;



    if(!active) return 
    
    return (
        <div className={styles.container}>

            <Script
                lang="javascript"
                type="text/javascript"
                src='https://tstdpay.paywelcome.co.kr/stdjs/INIStdPay.js'
            />

            <form id='SendPayForm_id' name='' method='POST'>

                {/* <input type='hidden' name='version' value='1.0' />
                <input type='hidden' name='currency' value='WON' />
                <input type='hidden' name='returnUrl' value={`${process.env.NEXT_PUBLIC_HOST_HTTPS_URL}${process.env.NEXT_PUBLIC_HOST_URL}/PayWelcom/payReturn.php`} />
                <input type='hidden' name='gopaymethod' value='' />
                <input type='hidden' name='offerPeriod' value='' />
                <input type='hidden' name='acceptmethod' value='HPP(1):no_receipt:va_receipt:vbanknoreg(0):below1000:popreturn' />
                <input type='hidden' name='languageView' value='' />
                <input type='hidden' name='charset' value='' />
                <input type='hidden' name='payViewType' value='' />
                <input type='hidden' name='popupUrl' value={`${process.env.NEXT_PUBLIC_HOST_HTTPS_URL}${process.env.NEXT_PUBLIC_HOST_URL}/PayWelcom/popup.php`} />
                <input type='hidden' name='d_card' value='' />
                <input type='hidden' name='d_quota' value='' />
                <input type='hidden' name='INIregno' value='' /> */}

                {formValue?.data && Object.keys(formValue?.data).map(key => (
                    <input key={key} type='hidden' name={key} value={formValue?.data[key]} />
                ))}



            </form>
        </div>
    );
}

export default PgModal;