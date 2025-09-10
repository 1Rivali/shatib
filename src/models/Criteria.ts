export interface Cirteria {
  id: number;
  title: string;
  status: string; // Pending , Rejected, Accepted
  phoneNumber: string;
  displayName: string;
  dateOfCreation: string;
  criteriaItems: CirteriaItem[];
  comments: [
    {
      id: number;
      userId: string;
      message: string;
      attachment: string;
    }
  ];
  invoices: [
    {
      id: number;
      image: string;
      accepted: boolean;
      receipt?: string;
    }
  ];
}

export interface CirteriaItem {
  categoryId: number;
  categoryName: string;
  productName: string;
  description: string;
  amount: number;
  measurementUnit: string;
  image: string;
}

export interface PostCriteria {
  Title: string;
  CriteriaItems: PostCirteriaItem[];
}

export interface PostCirteriaItem {
  categoryId: number;
  productName: string;
  description: string;
  amount: number;
  measurementUnit: string;
}

export interface CirteriaGet {
  id: number;
  title: string;
  status: string; // Pending , Rejected, Accepted
  criteriaItems: CirteriaItemGet[];
  comments: [
    {
      id: number;
      userId: string;
      message: string;
      attachment: string;
    }
  ];
  invoices: [
    {
      id: number;
      image: string;
      accepted: boolean;
      receipt?: string;
    }
  ];
}

export interface CirteriaItemGet {
  categoryId: number;
  productName: string;
  description: string;
  amount: number;
  measurementUnit: string;
  image: string;
}
