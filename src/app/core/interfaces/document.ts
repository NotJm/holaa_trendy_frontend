export interface Document {
    _id: string;
    title: string;
    content: string;
    effective_date: Date;
    version: string;
    current: boolean;
    isDelete: boolean;
    create_date: Date;
    update_date: Date;
}

export interface CreateDocument extends Omit<Partial<Document>, '_id' | 'create_data' | 'update_date'> {}

export interface UpdateDocument extends Omit<Partial<Document>, '_id' | 'create_data' | 'update_date'> {}




  