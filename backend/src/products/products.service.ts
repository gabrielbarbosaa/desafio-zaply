import { Multer } from 'multer';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { UploadsService } from 'src/uploads/uploads.service';
import { IQuery } from './types/queries';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly uploadService: UploadsService
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = new this.productModel(createProductDto);
    return await product.save();
  }

  async findAll(queries: IQuery) { 
    const {brand, categories,name, page, take} = queries;
    const offset:number = (Number(page) - 1) * Number(take);
    let query = {}

    if(!!brand) query = {...query, brand: brand};
    if(!!categories) query = {...query, categories: categories};
    if(!!name) query = {...query, name: {$regex: name, $options: 'i'}};

    if(!!query) {
      const total = await this.productModel.countDocuments(query).exec();
      const total_pages = Math.ceil(total / take);
      const is_last_page = page >= total_pages;
      const response = {
        meta: {
          total: total,
          page: +page,
          take: +take,
          total_pages: total_pages,
          is_last_page: is_last_page
        },
        data: await this.productModel.find(query).skip(offset).limit(take).exec()
      }
      return response;
    }
    else {
      const total = await this.productModel.countDocuments().exec();
      const total_pages = Math.ceil(total / take);
      const is_last_page = page >= total_pages;
      const response = {
        meta: {
          total: total,
          page: +page,
          take: +take,
          total_pages: total_pages,
          is_last_page: is_last_page
        },
        data: await this.productModel.find().skip(offset).limit(take).exec()
      }
      return response;
    }
  }

  async findOne(id: string) {
    const data = await this.productModel.findById(id).exec();
    return data;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.productModel.findByIdAndUpdate(id, updateProductDto, {new: true}).exec();
    const product = this.findOne(id);
    return product;
  }

  async remove(id: string) {
    await this.productModel.findByIdAndDelete(id).exec();
    const response = {message: `${id} has been deleted`};
    return response;
  }

  async updateImage(id: string, file: Multer.File) {
    const image_url = await this.uploadService.uploadfile(file);

    await this.update(id, {image: image_url});
    const product = await this.findOne(id);

    return product;
  }
}