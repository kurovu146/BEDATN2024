import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CreateRecordDTO } from "./dto/create-record.dto";
import { RecordService } from "./record.service";
import { UserGuard } from "src/auth/user.guard";


@Controller('records')
export class RecordController {
  constructor(
    private recordService: RecordService
  ) {}
  @Post()
  async create(@Body() data: CreateRecordDTO) {
    return this.recordService.create(data);
  }

  @UseGuards(UserGuard)
  @Get()
  async getAllVideo(@Query('userId') userId: number) {
    return this.recordService.getAllVideo(+userId);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.recordService.delete(+id);
  }
}
