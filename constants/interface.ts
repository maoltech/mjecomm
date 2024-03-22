export interface OnboardData{
    firstName?: string;
    lastName?: string;
    dob?: Date;
    address?: string;
    bvn?: string;
    
}

export interface IWithdrawRequest {
    account_bank: string,
    account_number: string,
    amount: Number,
    narration: String,
    currency: String       
}

export interface IVerifyAccountRequest {
    account_number: string,
    account_bank: string,
}

export interface signupDataType{
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    username: string
}


export interface ICreateProduct{
    name: string;
    description: string;
    price: number;
    quantity: string;
    category: string;
    imageUrl: string[];
    videoUrl: string[];
}