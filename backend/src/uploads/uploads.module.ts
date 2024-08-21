import { forwardRef, Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ConfigModule.forRoot(), forwardRef(() => ProductsModule)],
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService, UploadsModule],
})
export class UploadsModule {}
