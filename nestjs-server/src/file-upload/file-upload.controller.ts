import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Get, Param, Req } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express'
import { FileUploadService } from './file-upload.service';
import { BufferedFile } from 'src/minio-client/file.model';

@Controller('file-upload')
export class FileUploadController {
  constructor(
    private fileUploadService: FileUploadService
  ) { }

  //  @Post('single')
  //  @UseInterceptors(FileInterceptor('image'))
  //  async uploadSingle(
  //     @UploadedFile() image: BufferedFile
  //  ) {
  //     return await this.fileUploadService.uploadSingle(image)
  //  }

  //  @Post('many')
  //  @UseInterceptors(FileFieldsInterceptor([
  //     { name: 'image1', maxCount: 1 },
  //     { name: 'image2', maxCount: 1 },
  //  ]))
  //  async uploadMany(
  //     @UploadedFiles() files: BufferedFile,
  //  ) {
  //     return this.fileUploadService.uploadMany(files)
  //  }
  @Get('/presignedUrl/:name')
  @UseInterceptors(FileInterceptor('image'))
  async presignedUrl(@Param('name') name: string) {
    console.log("check name : ", name)
    // return await this.fileUploadService.presignedUrl(name)
  }
}