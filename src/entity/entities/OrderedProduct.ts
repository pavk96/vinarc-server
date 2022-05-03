import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { MappingProductWithColorAndMaterial } from "./MappingProductWithColorAndMaterial";
import { Order } from "./Order";

@Index("fk_order_has_product_has_material_standard_order1_idx", ["orderId"], {})
@Index(
  "fk_ordered_product_mapping_product_with_color_and_material1_idx",
  ["materialId", "productNumber", "colorId"],
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

  @Column("int", { primary: true, name: "material_id" })
  materialId: number;

  @Column("int", { primary: true, name: "product_number" })
  productNumber: number;

  @Column("int", { primary: true, name: "color_id" })
  colorId: number;

  @ManyToOne(
    () => MappingProductWithColorAndMaterial,
    (mappingProductWithColorAndMaterial) =>
      mappingProductWithColorAndMaterial.orderedProducts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "material_id", referencedColumnName: "materialId" },
    { name: "product_number", referencedColumnName: "productNumber" },
    { name: "color_id", referencedColumnName: "colorId" },
  ])
  mappingProductWithColorAndMaterial: MappingProductWithColorAndMaterial;

  @ManyToOne(() => Order, (order) => order.orderedProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "order_id", referencedColumnName: "idorder" }])
  order: Order;
}
