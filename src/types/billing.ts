export type DocumentType = 'INVOICE' | 'QUOTATION';

export interface BillingItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface BusinessInfo {
  name: string;
  address: string;
  phone: string;
  website: string;
  logo?: string;
}

export interface BillingDocument {
  id: string;
  type: DocumentType;
  number: string;
  date: string;
  dueDate?: string;
  validUntil?: string;
  customer: CustomerInfo;
  items: BillingItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  total: number;
  notes: string;
  theme: 'S4' | 'WEARIXX';
}
