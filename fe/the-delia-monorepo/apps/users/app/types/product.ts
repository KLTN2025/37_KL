export type Category = "nam" | "nu" | "hang-moi";

export type SubCategory =
  | "vest-nam"
  | "gi-le"
  | "so-mi"
  | "polo"
  | "quan-tay"
  | "jeans-nam"
  | "vay"
  | "dam-dao-pho"
  | "ao-dai"
  | "jeans-nu"
  | "ao-phong"
  | "quan-short-nam"
  | "quan-short-nu"
  | "ao-len"
  | "ao-tank";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  subCategory: SubCategory;
  description?: string;
  material?: string;
  colors?: string[];
  sizes?: string[];
  images?: string[];
  fabricImage?: string;
  favorites?: number;
  quantity: number;
}