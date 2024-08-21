import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './entities/product.entity';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    forwardRef(() => UploadsModule)
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, ProductsModule]
})
export class ProductsModule {}
