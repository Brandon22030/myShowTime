export class CreateAuthDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly role: string = 'user';
}
