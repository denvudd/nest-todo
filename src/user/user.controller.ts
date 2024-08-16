import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
export class UserController {}