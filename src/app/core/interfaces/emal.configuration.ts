export interface EmailConfiguration {
    _id: string;
    title: string;
    content: string;
    footer: string;
}

export interface UpdateEmailConfiguration extends Omit<Partial<EmailConfiguration>, '_id'> {}