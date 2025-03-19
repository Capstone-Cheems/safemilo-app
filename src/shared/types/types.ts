export type Option = {
    value: string
    label: string
}

export interface News {
    newsID: string
    organizationID: string
    title: string
    content: string
    scamTypeTag: string
    createdAt: string
    updatedAt: string
    images?: string[]
}

export interface Meta {
    total: number
    page: number
    pageSize: number
    totalPages: number
}

export interface NewsResponse {
    data: News[]
    meta: Meta
}
