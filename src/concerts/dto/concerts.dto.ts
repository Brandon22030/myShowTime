import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateConcertDto {
  @IsNotEmpty({ message: "Title field can't be empty" })
  @IsString()
  @MinLength(4)
  readonly title: string;

  @IsNotEmpty({ message: "Date field can't be empty" })
  readonly date: string;

  @IsNotEmpty({ message: "Genre field can't be empty" })
  readonly genre: string;

  @IsNotEmpty({ message: "Location field can't be empty" })
  readonly location: string;

  @IsNotEmpty({ message: "AvailableTickets field can't be empty" })
  readonly availableTickets: string;

  @IsNotEmpty({ message: "Description field can't be empty" })
  readonly description: string;

  @IsNotEmpty({ message: "Group field can't be empty" })
  readonly group: string;
}
