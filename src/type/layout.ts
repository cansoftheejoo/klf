export interface footerInfoType {
    company_info: footerCompanyInfo,
    contact: footeContact
}

export interface footerCompanyInfo {
    name?: string; 
    ceo?: string; 
    personal_manager?: string; 
    personal_manager_email?: string; 
    business_number?: string; 
    copyright?: string; 
}
export interface footeContact {
    email?: string;
    phone?: string;
    address?: string;
}