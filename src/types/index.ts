export type RegisterUser = {
    name:string,    
    email:string,
    password:string,
    activo?:boolean,
    verificado?:boolean
}
export type User = {
    role: 'employee'|'admin'|'customer',
    isGoogleUser:boolean,
    _id: number,
    email:string,
    name:string,
    token? :string,
    confirmed?:boolean
    address?: {
        city:string,
        street:string
    }
}
export type AccountFormData = {
    name: string;
    email: string;
    street: string;
    city: string;
};

export type SecurityFormData = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};
export type LoginUser={
    email:string,
    password:string
}
export type ChangePassword = {
    token:string,
    password:string   
}
export type ChangeCurrentPassword = {
    currentPassword:string,
    newPassword:string   
}
export type AuthResponse = {
    message:string
}
export type VerifyResponse = {
    message:string,
    verify:boolean
}
export type Variation ={
    color: string
    size: string
    price:number
    _id:string
    stock:number
}
export type VariationCreate ={
    color: string
    size: string
    price:number
    stock:number
}
export type Specification = {
    _id?:string,
    key:string,
    value:string
}
export type Product = {
    variations: [Variation],
    _id:string,
    name: string,
    description: string,
    discount:number,
    materials:[string],
    images: [string],
    specifications: [{_id:string,key:string,value:string}]
    category: Category,
    isActive: boolean    
}
export type CartItemProduct  = Omit<Product, 'category' | 'variations'> ;
export type CartItem ={
    product:CartItemProduct;
    quantity: number;
    selectedVariation: {
        color: string;
        size: string;
        price: number;
        _id: string;
        stock:number
    };
};
export type Category = {
    _id?:string,
    name:string,
    description:string
    image?:string
    productCount?:number
}
export type ChangeAvailability = {
    id:string,
    isActive:boolean
}
export type UpdateProduct = {
    updateProduct:FormData,
    id:string
}