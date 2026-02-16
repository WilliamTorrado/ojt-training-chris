
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  address?: string;
  cpNumber?: string;
  assignedOffice?: string;
}