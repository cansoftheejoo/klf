import PolicyModule from "@/components/modules/layout/PolicyModule";
import { getPolicy } from "@/pages/api/layout";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const PolicyScreen = () => {

   

    return (
       <PolicyModule />
    );
}

export default PolicyScreen;