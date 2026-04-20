import { useState, useCallback, useMemo } from 'react';
import { BillingDocument, BillingItem, DocumentType, CustomerInfo } from '@/types/billing';

const DEFAULT_ITEM: BillingItem = {
  id: '',
  name: '',
  quantity: 1,
  price: 0,
  total: 0,
};

function createInitialDoc(): BillingDocument {
  return {
    id: crypto.randomUUID(),
    type: 'INVOICE',
    number: 'INV-001',
    date: new Date().toISOString().split('T')[0],
    customer: {
      name: '',
      email: '',
      address: '',
      phone: '',
    },
    items: [],
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    discount: 0,
    total: 0,
    notes: '',
    theme: 'S4',
  };
}

export function useBilling() {
  const [doc, setDoc] = useState<BillingDocument>(createInitialDoc);

  const setType = useCallback((type: DocumentType) => {
    setDoc((prev) => ({
      ...prev,
      type,
      number: type === 'INVOICE' ? 'INV-001' : 'QTN-001',
    }));
  }, []);

  const setTheme = useCallback((theme: 'S4' | 'WEARIXX') => {
    setDoc((prev) => ({ ...prev, theme }));
  }, []);

  const updateCustomer = useCallback((customer: Partial<CustomerInfo>) => {
    setDoc((prev) => ({
      ...prev,
      customer: { ...prev.customer, ...customer },
    }));
  }, []);

  const updateMeta = useCallback((meta: Partial<Pick<BillingDocument, 'number' | 'date' | 'dueDate' | 'validUntil' | 'notes' | 'taxRate' | 'discount'>>) => {
    setDoc((prev) => ({ ...prev, ...meta }));
  }, []);

  const addItem = useCallback(() => {
    const newItem: BillingItem = {
      ...DEFAULT_ITEM,
      id: crypto.randomUUID(),
    };
    setDoc((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setDoc((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<BillingItem>) => {
    setDoc((prev) => {
      const items = prev.items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updates };
          updated.total = updated.quantity * updated.price;
          return updated;
        }
        return item;
      });
      return { ...prev, items };
    });
  }, []);

  const totals = useMemo(() => {
    const subtotal = doc.items.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = (subtotal * doc.taxRate) / 100;
    const total = subtotal + taxAmount - doc.discount;
    return { subtotal, taxAmount, total };
  }, [doc.items, doc.taxRate, doc.discount]);

  // Sync totals to doc state for easy preview access
  const finalDoc = useMemo(() => ({
    ...doc,
    ...totals,
  }), [doc, totals]);

  return {
    doc: finalDoc,
    setType,
    setTheme,
    updateCustomer,
    updateMeta,
    addItem,
    removeItem,
    updateItem,
  };
}
