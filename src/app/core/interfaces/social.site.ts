export interface SocialSite {
  _id: string
  name: string;
  icon: string;
  url: string;
  description?: string;
  create_date: Date,
  update_date: Date,
}

export interface CreateSocialSite extends Omit<SocialSite, '_id' | 'create_date' | 'update_date'> {}  

export interface UpdateSocialSite extends Omit<SocialSite, '_id' | 'create_date' | 'update_date'> {}
