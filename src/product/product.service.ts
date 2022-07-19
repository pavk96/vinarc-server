import { Injectable } from '@nestjs/common';
import { ProductMaterialAndColor } from 'src/entity/entities/ProductMaterialAndColor';
import { CategoryStandard } from 'src/entity/entities/CategoryStandard';
import { DetailImage } from 'src/entity/entities/DetailImage';
import { Product } from 'src/entity/entities/Product';
import { ProductDetail } from 'src/entity/entities/ProductDetail';
import { Qna } from 'src/entity/entities/Qna';
import { RelatedProduct } from 'src/entity/entities/RelatedProduct';
import { Review } from 'src/entity/entities/Review';
import { User } from 'src/entity/entities/User';
import { getConnection } from 'typeorm';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { CreateProductDTO } from './dto/createProduct.dto';
import { InsertDetailImageDTO } from './dto/insertDetailImage.dto';
import { InsertProductInCategoryDTO } from './dto/insertProductInCategory.dto';
import { ProductHasCategoryStandard } from 'src/entity/entities/ProductHasCategoryStandard';

//DB와 직접적으로 소통하는 공간
@Injectable()
export class ProductService {
  async findProductQna(product_number: number) {
    const product_qna = await getConnection()
      .createQueryBuilder(Qna, 'q')
      .select()
      .leftJoinAndSelect(User, 'u', 'q.user_number=u.user_number')
      .where('product_number=' + product_number)
      .getRawMany();
    return product_qna;
  }
  async findProductReview(product_number: number) {
    const product_review = await getConnection()
      .createQueryBuilder(Review, 'r')
      .select()
      .leftJoinAndSelect(User, 'u', 'r.user_number = u.user_number')
      .where('product_number=' + product_number)
      .getRawMany();
    return product_review;
  }
  async findOneProductDetail(product_number: number) {
    const product_detail = await getConnection()
      .createQueryBuilder()
      .select()
      .from(ProductDetail, '')
      .where('product_number=' + product_number)
      .getRawOne();
    return product_detail;
  }
  async findAllRelatedProduct(product_number: number) {
    const related_product = await getConnection()
      .createQueryBuilder(Product, 'product')
      .select()
      .innerJoin(
        RelatedProduct,
        'related',
        'product.product_number = related.related_product_number',
      )
      .where('related.product_number=' + product_number)
      .getRawMany();
    console.log(related_product, 'HIHI');

    return related_product;
  }
  async findOneProduct(product_number: number) {
    const product = await getConnection()
      .createQueryBuilder(Product, 'product')
      .leftJoinAndSelect('product.categoryStandards', 'category')
      .where('product.product_number=' + product_number)
      .getRawOne();
    console.log(product, 'HIHI');
    return product;
  }
  async findProductMaterialAndColor(product_number: number) {
    const materialAndColor = await getConnection()
      .createQueryBuilder()
      .select()
      .from(ProductMaterialAndColor, '')
      .where('product_number=' + product_number)
      .getRawMany();
    console.log(materialAndColor);
    return materialAndColor;
  }
  async findProductDetailImage(product_number: number) {
    console.log(product_number);
    const detailImages = await getConnection()
      .createQueryBuilder()
      .select()
      .from(DetailImage, 'detailImage')
      .where('detailImage.product_number=' + product_number)
      .getRawMany();
    return detailImages;
  }
  async findAllProductInCategory(category_id: number) {
    const products = await getConnection()
      .createQueryBuilder(Product, 'product')
      .select()
      .innerJoin(
        ProductHasCategoryStandard,
        'category',
        'product.product_number = category.product_number',
      )
      .where('category.category_id=' + category_id)
      .getRawMany();
    return products;
  }
  async findOneCategory(category_id: number) {
    const category = await getConnection()
      .createQueryBuilder()
      .select()
      .from(CategoryStandard, '')
      .where('category_id=' + category_id)
      .getRawOne();
    return category;
  }
  async findAllProduct() {
    const products = await getConnection()
      .createQueryBuilder()
      .select()
      .from(Product, 'product')
      .getRawMany();
    return products;
  }

  async findAllCategory() {
    const categories = await getConnection()
      .createQueryBuilder()
      .select()
      .from(CategoryStandard, 'category_standard')
      .getRawMany();
    return categories;
  }
  async createProduct(createProductDTO: CreateProductDTO) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(createProductDTO)
      .execute();
  }

  async insertProductInCategory(
    insertProductInCategoryDTO: InsertProductInCategoryDTO,
  ) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(ProductHasCategoryStandard)
      .values(insertProductInCategoryDTO)
      .execute();
  }

  async insertDetailImage(insertDetailImageDTO: InsertDetailImageDTO) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(DetailImage)
      .values(insertDetailImageDTO)
      .execute();
  }

  async createCategory(createCategoryDTO: CreateCategoryDTO) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(CategoryStandard)
      .values(createCategoryDTO)
      .execute();
  }
}
