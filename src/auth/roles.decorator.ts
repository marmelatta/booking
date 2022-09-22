import { SetMetadata } from '@nestjs/common';

export const HasRoles = (role: string) => SetMetadata('role', role);
