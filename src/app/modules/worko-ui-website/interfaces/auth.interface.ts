export interface candidateInfo {
    userId: string,
    name: string,
    email: string,
    number: string,
    linkedinUrl: string,
    ECTC: number,
    YOE: number,
}

export interface employeeInfo {
    userId: string,
    name: string,
    email: string,
    number: string,
    // linkedinUrl: string,
    YOE: number,
    // designation: string,
    department: string,
    companyEmailId: string,
    companyName: string,
    // designationTag: number
}

export interface userInfo{
    
        userFullName: string,
        userEmail: string,
        userContactNumber: string,
        userMessage: string,
        userCvFileName: string,
        userCvCloudFileName: string,
    
}
export interface corporateInfo{
    
    userFullName: string,
    userEmail:string,
    contactNumber: string,
    isContactNumberVerified:boolean,
    companyName: string,
    userDesignation:string,
    userMessage:string

}
