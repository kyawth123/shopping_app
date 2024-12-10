export interface User {
    uid: string;
    email: string;
    emailVerified: string;
    userName:string
    role: 'admin' | 'user'
}

export interface Category {
    category: string
}

export interface Item {
    itemName:string;
    category: {
        categoryId: string,
        category: string
    };
    itemImgPath: string;
    model: string;
    price: number;
    details:string;
    buy: boolean;
}

export interface Review {
    category: {
        categoryId: string;
        category: string;
    },
    item: {
        itemId:string;
        itemName: string;
    }, 
    reviews: string;
}

