import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rol = this.reflector.get<string[]>('rol', context.getHandler());
    if (!rol) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user && user.rol === 'admin';
  }
}
