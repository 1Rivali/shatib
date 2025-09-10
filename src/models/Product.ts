export interface Product {
  id: number;
  subCategoryId: SubCategory["id"];
  categoryId: number;
  name: string;
  description: string;
  features: string;
  price: number;
  measurementUnit: string;
  measurements: Measurement[];
  manufacturingCountry: string;
  colors: Color[];
  installationTeam: number;
  deaf: string;
  retrivalAndReplacing: string;
  notes: string;
  warehouseCode: string;
  brand: string;
  images: Image[];
  productSpecifications: ProductSpecifications[];
}

export interface ProductHomePage {
  id: number;
  name: string;
  price: number;
  mainImagePath: string;
  warehouseCode: string;
  categoryId?: number;
  subCategoryName: string;
}

interface Image {
  id: number;
  productId: number;
  imagePath: string;
}

interface SubCategory {
  id: number;
  name: string;
}

interface ProductSpecifications {
  name: string;
  value: string;
}

export interface Color {
  id: number;
  hexCode: string;
  price: number;
  imagePath: string;
}

export interface ColorPost {
  hexCode: string;
  price: number;
  imagePath: File | null;
}

export interface Measurement {
  id: number;
  name: string;
  price: number;
}

export interface MeasurementPost {
  name: string;
  price: number;
}
