import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class SelfIdGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        if((req.params.id != String(req.id))){
            console.log(req.params.id, req.id)
            throw new UnauthorizedException({message: 'invalid token'});
        }
        return true
    }
}