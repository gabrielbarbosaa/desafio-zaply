import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from 'src/products/products.service';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly productService:ProductsService
  ) {}



  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Param('id') id: string, @UploadedFile() file: Multer.File) {
    const response = await this.productService.updateImage(id, file);

    return response;
  }
}
