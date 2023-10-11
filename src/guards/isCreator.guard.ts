import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { verify } from "crypto";
import { Observable } from "rxjs";
import { Admin } from "../admin/models/admin.model";


@Injectable()
export class CreatorSelfGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const Header = req.headers.authorization;

            if(!Header){
                throw new UnauthorizedException({
                    message: `do not have allow`
                })
            }

            const bearer = Header.split(' ')[0]
            const token =  Header.split(' ')[1]

            if(bearer !== 'Bearer' || !token)
                throw new UnauthorizedException({nessage: 'do not have allow'})
            
        async function verify(token:string) {
            const  jwtService = new JwtService
            const admin: Partial<Admin> = await jwtService.verify(token,{
                secret:process.env.ACCESS_TOKEN_KEY,
            });
            if(!admin)
            throw new UnauthorizedException('Invalid token')
            if(!admin.is_creator)
            throw new UnauthorizedException('You are not creator')
            req.id = admin.id
            return true
        }
            

        
        
        return verify(token)
    }
}