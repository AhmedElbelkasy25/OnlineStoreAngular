import { IProduct } from '../../models/iproduct';

export interface IProductArr {
  products: IProduct[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
