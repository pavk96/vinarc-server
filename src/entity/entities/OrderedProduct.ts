import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Index("fk_order_has_product_has_material_standard_order1_idx", ["orderId"], {})
@Index(
  "fk_ordered_product_product1_idx",
  ["productNumber", "productColorId", "productMaterialId"],
  {}
)
@Entity("ordered_product", { schema: "vinarc" })
export class OrderedProduct {
  @Column("int", { primary: true, name: "order_id" })
  orderId: number;

  @Column("int", { name: "ordered_product_count", default: () => "'1'" })
  orderedProductCount: number;

  @Column("varchar", {
    name: "ordered_product_delivery_tracking_number",
    nullable: true,
    length: 45,
  })
  orderedProductDeliveryTrackingNumber: string | null;

  @Column("int", { primary: true, name: "product_number" })
  productNumber: number;

  @Column("int", { primary: true, name: "product_color_id" })
  productColorId: number;

  @Column("int", { primary: true, name: "product_material_id" })
  productMaterialId: number;

  @ManyToOne(() => Product, (product) => product.orderedProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "product_number", referencedColumnName: "productNumber" },
  ])
  productNumber2: Product;

  @ManyToOne(() => Order, (order) => order.orderedProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "order_id", referencedColumnName: "orderId" }])
  order: Order;
}
