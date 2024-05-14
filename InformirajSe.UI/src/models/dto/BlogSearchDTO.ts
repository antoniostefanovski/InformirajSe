export class BlogSearchDTO {
    public keyword?: string;
    public order?: string;

    constructor(keyword: string, order: string){
        this.keyword = keyword;
        this.order = order;
    }
}