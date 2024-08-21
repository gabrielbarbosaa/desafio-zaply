import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IQuery } from './types/queries';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({summary: 'Create a new product'})  
  @ApiResponse({status: 201, description: 'The product has been successfully created.'})
  @ApiResponse({status: 400, description: 'Bad Request.'})
  @ApiResponse({status: 500, description: 'Internal Server Error.'})
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({summary: 'List all products'})
  @ApiResponse({status: 200, description: 'Return all products.'})
  @ApiResponse({status: 500, description: 'Internal Server Error.'})
  findAll(@Query() queries: IQuery) {
    return this.productsService.findAll(queries);
  }

  @Get(':id')
  @ApiOperation({summary: 'Find a product by ID'})
  @ApiResponse({status: 200, description: 'Return the product.'})
  @ApiResponse({status: 404, description: 'Product not found.'})
  @ApiResponse({status: 500, description: 'Internal Server Error.'})
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({summary: 'Update a product by ID'})
  @ApiResponse({status: 200, description: 'The product has been successfully updated.'})
  @ApiResponse({status: 404, description: 'Product not found.'})
  @ApiResponse({status: 500, description: 'Internal Server Error.'})
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete a product by ID'})
  @ApiResponse({status: 200, description: 'The product has been successfully deleted.'})
  @ApiResponse({status: 404, description: 'Product not found.'})
  @ApiResponse({status: 500, description: 'Internal Server Error.'})
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
