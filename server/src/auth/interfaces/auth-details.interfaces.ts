import { UserDetails } from 'src/user/interfaces/user-details.interface';

export interface AuthDetails {
  token?: string | undefined;
  user: UserDetails;
}
