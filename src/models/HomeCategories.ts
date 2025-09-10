export interface HomeCategorie {
  id: number;
  name: string;
  imagePath: string;
  subCategories: HomeSubCategory[];
}

export interface HomeSubCategory {
  id: number;
  name: string;
  imagePath: string;
  products: HomeProduct[];
}

export interface HomeProduct {
  id: number;
  name: string;
  price: number;
  mainImagePath: string;
  subCategoryName: string;
  warehouseCode: string;
}
