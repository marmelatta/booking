export interface CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly contactPhone: string;
  readonly role: string;
}
