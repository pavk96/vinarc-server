import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DetailImage } from "./DetailImage";
import { Exchange } from "./Exchange";
import { MappingProductWithMaterial } from "./MappingProductWithMaterial";
import { PopularProduct } from "./PopularProduct";
import { ProductDetail } from "./ProductDetail";
import { CategoryStandard } from "./CategoryStandard";
import { ProductHasMainImage } from "./ProductHasMainImage";
import { Qna } from "./Qna";
import { RelatedProduct } from "./RelatedProduct";
import { Review } from "./Review";
import { Star } from "./Star";

@Entity("product", { schema: "vinarc" })
export class Product {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "product_number",
    comment:
      "명석이가 상품등록할 때 필요한 정보, 소재를 선택하고 맨 마지막에 색상을 선택하면 해당 물품이 ",
  })
  productNumber: number;

  @Column("smallint", { name: "shipping_fee" })
  shippingFee: number;

  @Column("varchar", { name: "product_name", length: 45 })
  productName: string;

  @Column("varchar", { name: "product_size", length: 45 })
  productSize: string;

  @Column("varchar", { name: "product_price", length: 45 })
  productPrice: string;

  @Column("varchar", { name: "product_sort_number", length: 45 })
  productSortNumber: string;

  @Column("int", { name: "product_class" })
  productClass: number;

  @OneToMany(() => DetailImage, (detailImage) => detailImage.productNumber2)
  detailImages: DetailImage[];

  @OneToMany(() => Exchange, (exchange) => exchange.productProductNumber2)
  exchanges: Exchange[];

  @OneToMany(
    () => MappingProductWithMaterial,
    (mappingProductWithMaterial) => mappingProductWithMaterial.productNumber2
  )
  mappingProductWithMaterials: MappingProductWithMaterial[];

  @OneToMany(
    () => PopularProduct,
    (popularProduct) => popularProduct.productNumber2
  )
  popularProducts: PopularProduct[];

  @OneToOne(
    () => ProductDetail,
    (productDetail) => productDetail.productNumber2
  )
  productDetail: ProductDetail;

  @ManyToMany(
    () => CategoryStandard,
    (categoryStandard) => categoryStandard.products
  )
  categoryStandards: CategoryStandard[];

  @OneToMany(
    () => ProductHasMainImage,
    (productHasMainImage) => productHasMainImage.productNumber2
  )
  productHasMainImages: ProductHasMainImage[];

  @OneToMany(() => Qna, (qna) => qna.productNumber2)
  qnas: Qna[];

  @OneToMany(
    () => RelatedProduct,
    (relatedProduct) => relatedProduct.productNumber2
  )
  relatedProducts: RelatedProduct[];

  @OneToMany(() => Review, (review) => review.productNumber2)
  reviews: Review[];

  @OneToMany(() => Star, (star) => star.productNumber2)
  stars: Star[];
}