export interface JsonResponse {
    limit: number,
    products: Product[],
    skip: number,
    total: number
}

export interface Product {
    id: number,
    title: string,
    thumbnail: string,
    price: number,
    brand: string
}


