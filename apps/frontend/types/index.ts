export interface Transcript {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
  transcripts: Transcript[];
}
