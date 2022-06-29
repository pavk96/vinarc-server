import { Injectable } from '@nestjs/common';
import { Category } from 'src/entity/entities/Category';
import { CategoryStandard } from 'src/entity/entities/CategoryStandard';
import { ColorStandard } from 'src/entity/entities/ColorStandard';
import { DetailImage } from 'src/entity/entities/DetailImage';
import { MappingColorWithMaterial } from 'src/entity/entities/MappingColorWithMaterial';
import { MappingMaterialWithProduct } from 'src/entity/entities/MappingMaterialWithProduct';
import { MaterialStandard } from 'src/entity/entities/MaterialStandard';
import { Product } from 'src/entity/entities/Product';
import { ProductHasCategoryStandard } from 'src/entity/entities/ProductHasCategoryStandard';
import { RelatedProduct } from 'src/entity/entities/RelatedProduct';
import { getConnection } from 'typeorm';
import { CreateCategoryDTO } from './dto/createCategory.dto';
import { CreateProductDTO } from './dto/createProduct.dto';
import { InsertDetailImageDTO } from './dto/insertDetailImage.dto';
import { InsertProductInCategoryDTO } from './dto/insertProductInCategory.dto';

//DB와 직접적으로 소통하는 공간
@Injectable()
export class ProductService {
  async findAllRelatedProduct(product_number: number) {
    const related_product = await getConnection()
      .createQueryBuilder(Product, 'product')
      .select()
      .innerJoin(
        RelatedProduct,
        'related',
        'product.product_number = related.related_product_id',
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
      .createQueryBuilder(MappingColorWithMaterial, 'map')
      .select([
        'm.material_name as material_name',
        'c.color_name as color_name',
      ])
      .innerJoin(ColorStandard, 'c', 'c.color_id = map.color_id')
      .innerJoin(MaterialStandard, 'm', 'm.material_id = map.material_id')
      .where('map.product_number=' + product_number)
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
