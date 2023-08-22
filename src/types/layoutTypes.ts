/**
 * header navigation에 쓰일 li형의 type형
 */
export interface IRoutesType {
    path: string,
    name_kr: string,
    childs?: Array<IRoutesType> | null
}