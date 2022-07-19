import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { CreateProductDTO } from './dto/createProduct.dto';
import { InsertDetailImageDTO } from './dto/insertDetailImage.dto';
import { InsertProductInCategoryDTO } from './dto/insertProductInCategory.dto';
import { ProductService } from './product.service';

//라우터와 서비스 오류처리 및 제어를 하는 공간
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async createProduct(
    @Body() createProductDTO: CreateProductDTO,
    @Req() req: any,
  ) {
    await this.productService.createProduct(createProductDTO);
    return true;
  }

  @Post('detail/image/insert')
  async insertDetailImage(
    @Body() insertDetailImageDTO: InsertDetailImageDTO,
    @Req() req: any,
  ) {
    await this.productService.insertDetailImage(insertDetailImageDTO);
    return true;
  }

  @Post('category/create')
  async createCategory(
    @Body() createCategoryDTO: CreateCategoryDTO,
    @Req() req: any,
  ) {
    await this.productService.createCategory(createCategoryDTO);
    return true;
  }
  @Post('in/category/insert')
  async insertProductInCategory(
    @Body() insertProductInCategoryDTO: InsertProductInCategoryDTO,
    @Req() req: any,
  ) {
    await this.productService.insertProductInCategory(
      insertProductInCategoryDTO,
    );
    return true;
  }

  @Get()
  async getOneProduct(
    @Req() req: any,
    @Query('productNumber') product_number: number,
  ) {
    console.log(product_number);
    const product = await this.productService.findOneProduct(product_number);
    return product;
  }
  @Get('related')
  async getRelatedProduct(@Query('productNumber') product_number: number) {
    const related_product = await this.productService.findAllRelatedProduct(
      product_number,
    );
    console.log(related_product);
    return related_product;
  }
  @Get('review')
  async getProductReview(@Query('productNumber') product_number: number) {
    const product_review = await this.productService.findProductReview(
      product_number,
    );
    console.log(product_review);
    return product_review;
  }
  @Get('qna')
  async getProductQna(@Query('productNumber') product_number: number) {
    const product_review = await this.productService.findProductQna(
      product_number,
    );
    console.log(product_review);
    return product_review;
  }
  @Get('detail')
  async getOneProductDetail(
    @Req() req: any,
    @Query('productNumber') product_number: number,
  ) {
    console.log(product_number);
    const productDetail = await this.productService.findOneProductDetail(
      product_number,
    );
    return productDetail;
  }
  @Get('detail/image')
  async getOneProductDetailImage(
    @Req() req: any,
    @Query('productNumber') product_number: number,
  ) {
    console.log(product_number);
    const productDetailImage = await this.productService.findProductDetailImage(
      product_number,
    );
    return productDetailImage;
  }
  @Get('material/and/color')
  async getOneProductMaterialAndColor(
    @Req() req: any,
    @Query('productNumber') product_number: number,
  ) {
    console.log(product_number);
    const products = await this.productService.findProductMaterialAndColor(
      product_number,
    );
    return products;
  }
  @Get('category')
  async getAllCategories() {
    const categories = await this.productService.findAllCategory();
    return categories;
  }
  @Get('category/one')
  async getOneCategory(@Query('category-id') category_id: number) {
    const category = await this.productService.findOneCategory(category_id);
    console.log(category);

    return category;
  }
  @Get('in/category')
  async getAllProductInCategory(@Query('category-id') category_id: number) {
    const productInCategory =
      await this.productService.findAllProductInCategory(category_id);
    return productInCategory;
  }
}
