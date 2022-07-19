import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DetailImage } from "./DetailImage";
import { Exchange } from "./Exchange";
import { OrderedProduct } from "./OrderedProduct";
import { PopularProduct } from "./PopularProduct";
import { ProductDetail } from "./ProductDetail";
import { ProductHasCategoryStandard } from "./ProductHasCategoryStandard";
import { ProductHasMainImage } from "./ProductHasMainImage";
import { ProductMaterialAndColor } from "./ProductMaterialAndColor";
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

  @Column("varchar", { name: "product_thumnail_url", length: 45 })
  productThumnailUrl: string;

  @OneToMany(() => DetailImage, (detailImage) => detailImage.productNumber2)
  detailImages: DetailImage[];

  @OneToMany(() => Exchange, (exchange) => exchange.productNumber2)
  exchanges: Exchange[];

  @OneToMany(
    () => OrderedProduct,
    (orderedProduct) => orderedProduct.productNumber2
  )
  orderedProducts: OrderedProduct[];

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

  @OneToMany(
    () => ProductHasCategoryStandard,
    (productHasCategoryStandard) => productHasCategoryStandard.productNumber2
  )
  productHasCategoryStandards: ProductHasCategoryStandard[];

  @OneToMany(
    () => ProductHasMainImage,
    (productHasMainImage) => productHasMainImage.productNumber2
  )
  productHasMainImages: ProductHasMainImage[];

  @OneToMany(
    () => ProductMaterialAndColor,
    (productMaterialAndColor) => productMaterialAndColor.productNumber2
  )
  productMaterialAndColors: ProductMaterialAndColor[];

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
