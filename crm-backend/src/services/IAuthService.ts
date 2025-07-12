import { User } from "../../../shared/types/user";
import { LoginDTO } from "../dtos/login.dto";

export interface IAuthService {
    login(data: LoginDTO): Promise<{ token: string; user: any }>;
    verifyToken(token: string): Promise<User | null>;
}