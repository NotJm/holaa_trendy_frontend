export interface IncidentConfiguration {
    _id: string;
    maxFailedAttempts: number;
    blockDuration: number;
    otpLifeTime: number;
  }

export interface UpdateIncidentConfiguration extends Omit<Partial<IncidentConfiguration>, '_id'> {}