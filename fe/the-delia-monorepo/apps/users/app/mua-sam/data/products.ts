/* app/data/products.ts */
export type Category = "nam" | "nu" | "hang-moi";

type SubCategory =
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

export type Product = {
  quantity: number;
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
};

export const products: Record<Category, Product[]> = {
  nam: [
    {
      id: "1",
      name: "Vest Nam Santino Slim-Fit",
      image: "/images/vest-nam-santino.jpg",
      price: 3860000,
      category: "nam",
      subCategory: "vest-nam",
      description: "Vest nam trẻ trung, phong cách lịch lãm, phù hợp cho công sở hoặc sự kiện.",
      material: "Vải Ý",
      colors: ["Đen", "Xám đậm", "Xanh navy"],
      sizes: ["M", "L", "XL"],
      images: ["/images/vest-nam-santino.jpg"],
      fabricImage: "/images/fabric-italian.jpg",
      favorites: 15,
      quantity: 0,
    },
    {
      id: "2",
      name: "Áo Gi-Lê Bovest Đen",
      image: "/images/gi-le-1-1.jpg",
      price: 3980000,
      category: "nam",
      subCategory: "gi-le",
      description: "Áo gi-lê nam phong cách công sở hoặc dạo phố, dễ phối đồ.",
      material: "Vải tổng hợp",
      colors: ["Đen", "Đỏ", "Xanh"],
      sizes: ["M", "L", "XL"],
      images: ["/images/gi-le-1-1.jpg"],
      fabricImage: "/images/fabric-blend.jpg",
      favorites: 21,
      quantity: 0,
    },
    {
      id: "3",
      name: "Sơ Mi Nam Dài Tay Hiện Đại",
      image: "/images/so-mi-1-1.jpg",
      price: 4420000,
      category: "nam",
      subCategory: "so-mi",
      description: "Sơ mi nam dài tay, phong cách lịch sự, phù hợp cho công sở.",
      material: "Cotton",
      colors: ["Trắng", "Xanh nhạt", "Xám"],
      sizes: ["M", "L", "XL"],
      images: ["/images/so-mi-1-1.jpg"],
      fabricImage: "/images/fabric-cotton.jpg",
      favorites: 12,
      quantity: 0,
    },
    {
      id: "4",
      name: "Áo Polo Nam Năng Động",
      image: "/images/ao-phong-1-2.jpg",
      price: 8200000,
      category: "nam",
      subCategory: "polo",
      description: "Áo polo nam ngắn tay, thoáng mát, phong cách casual.",
      material: "Cotton thoáng khí",
      colors: ["Đen", "Xanh lá", "Trắng"],
      sizes: ["M", "L", "XL"],
      images: ["/images/ao-phong-1-2.jpg"],
      fabricImage: "/images/fabric-cotton-breathable.jpg",
      favorites: 8,
      quantity: 0,
    },
    {
      id: "5",
      name: "Quần Tây Nam Owen",
      image: "/images/quan-short-nam-1-1.jpg",
      price: 780000,
      category: "nam",
      subCategory: "quan-tay",
      description: "Quần tây nam lịch lãm, phù hợp cho môi trường công sở.",
      material: "Vải cao cấp",
      colors: ["Đen", "Xanh đậm", "Xám"],
      sizes: ["30", "32", "34"],
      images: ["/images/quan-short-nam-1-1.jpg"],
      fabricImage: "/images/fabric-premium.jpg",
      favorites: 14,
      quantity: 0,
    },
    {
      id: "6",
      name: "Quần Jeans Nam Routine",
      image: "/images/jeans-nam-routine.jpg",
      price: 650000,
      category: "nam",
      subCategory: "jeans-nam",
      description: "Quần jeans nam trẻ trung, dễ phối đồ, phong cách năng động.",
      material: "Denim",
      colors: ["Xanh navy", "Indigo"],
      sizes: ["30", "32", "34"],
      images: ["/images/jeans-nam-routine.jpg"],
      fabricImage: "/images/fabric-denim.jpg",
      favorites: 16,
      quantity: 0,
    },
  ],
  nu: [
    {
      id: "7",
      name: "Váy Ngắn Nữ Tinh Tế",
      image: "/images/vay-ngan-nu.jpg",
      price: 37270000,
      category: "nu",
      subCategory: "vay",
      description: "Váy ngắn nữ năng động, phù hợp cho dạo phố hoặc tiệc tùng.",
      material: "Vải chiffon",
      colors: ["Hồng phấn", "Trắng", "Xanh nhạt"],
      sizes: ["S", "M", "L"],
      images: ["/images/vay-ngan-nu.jpg"],
      fabricImage: "/images/fabric-chiffon.jpg",
      favorites: 25,
      quantity: 0,
    },
    {
      id: "8",
      name: "Đầm Dạo Phố Casual",
      image: "/images/dam-dao-pho.jpg",
      price: 3220000,
      category: "nu",
      subCategory: "dam-dao-pho",
      description: "Đầm nữ phong cách casual, dễ mặc, phù hợp cho các hoạt động hàng ngày.",
      material: "Cotton pha",
      colors: ["Be", "Xanh dương"],
      sizes: ["S", "M", "L"],
      images: ["/images/dam-dao-pho.jpg"],
      fabricImage: "/images/fabric-cotton-blend.jpg",
      favorites: 18,
      quantity: 0,
    },
    {
      id: "9",
      name: "Áo Dài Truyền Thống",
      image: "/images/ao-dai.jpg",
      price: 10930000,
      category: "nu",
      subCategory: "ao-dai",
      description: "Áo dài nữ truyền thống, tinh xảo, phù hợp cho các dịp lễ.",
      material: "Lụa",
      colors: ["Hồng", "Xanh dương", "Trắng"],
      sizes: ["S", "M", "L"],
      images: ["/images/ao-dai.jpg"],
      fabricImage: "/images/fabric-silk.jpg",
      favorites: 22,
      quantity: 0,
    },
    {
      id: "10",
      name: "Quần Jeans Nữ Ôm Dáng",
      image: "/images/jeans-nu.jpg",
      price: 2830000,
      category: "nu",
      subCategory: "jeans-nu",
      description: "Quần jeans nữ phong cách hiện đại, ôm dáng, dễ phối đồ.",
      material: "Denim",
      colors: ["Xanh navy", "Xám"],
      sizes: ["26", "28", "30"],
      images: ["/images/jeans-nu.jpg"],
      fabricImage: "/images/fabric-denim.jpg",
      favorites: 16,
      quantity: 0,
    },
  ],
  "hang-moi": [
    {
      id: "11",
      name: "Áo Phông Nam Nữ Cotton",
      image: "/images/ao-phong-1-1.jpg",
      price: 4480000,
      category: "hang-moi",
      subCategory: "ao-phong",
      description: "Áo phông ngắn tay, chất liệu cotton thoáng mát, thiết kế trẻ trung.",
      material: "Cotton",
      colors: ["Trắng", "Đen", "Xanh lá"],
      sizes: ["S", "M", "L", "XL"],
      images: ["/images/ao-phong-1-1.jpg"],
      fabricImage: "/images/fabric-cotton.jpg",
      favorites: 27,
      quantity: 0,
    },
    {
      id: "12",
      name: "Quần Short Nam Năng Động",
      image: "/images/quan-short-nam.jpg",
      price: 3220000,
      category: "hang-moi",
      subCategory: "quan-short-nam",
      description: "Quần short nam phong cách năng động, phù hợp cho mùa hè.",
      material: "Cotton pha",
      colors: ["Đen", "Xanh", "Xám"],
      sizes: ["M", "L", "XL"],
      images: ["/images/quan-short-nam.jpg"],
      fabricImage: "/images/fabric-cotton-blend.jpg",
      favorites: 19,
      quantity: 0,
    },
    {
      id: "13",
      name: "Quần Short Nữ Trẻ Trung",
      image: "/images/quan-short-nu.jpg",
      price: 2860000,
      category: "hang-moi",
      subCategory: "quan-short-nu",
      description: "Quần short nữ dễ phối đồ, phù hợp cho dạo phố hoặc du lịch.",
      material: "Denim",
      colors: ["Hồng", "Trắng", "Đen"],
      sizes: ["S", "M", "L"],
      images: ["/images/quan-short-nu.jpg"],
      fabricImage: "/images/fabric-denim.jpg",
      favorites: 14,
      quantity: 0,
    },
    {
      id: "14",
      name: "Áo Len Mới",
      subCategory: "ao-len",
      price: 450000,
      image: "/images/new-sweater.jpg",
      colors: ["Đỏ Rượu", "Xám Đậm"],
      sizes: ["S", "M", "L", "XL"],
      description: "Áo len mới, ấm áp và thời trang cho mùa đông.",
      favorites: 15,
      images: [
        "/images/new-sweater.jpg",
        "/images/new-sweater-2.jpg",
        "/images/new-sweater-3.jpg",
      ],
      quantity: 0,
      category: "hang-moi",
    },
  ],
};

export const flatProducts: Product[] = Object.values(products).flat();