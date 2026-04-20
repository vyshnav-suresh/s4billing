'use client';

import { Plus, Trash2 } from 'lucide-react';
import { BillingItem } from '@/types/billing';

interface ProductTableProps {
  items: BillingItem[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, updates: Partial<BillingItem>) => void;
}

export function ProductTable({ items, onAddItem, onRemoveItem, onUpdateItem }: ProductTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Line Items</h3>
        <button
          onClick={onAddItem}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all bg-secondary rounded-xl hover:bg-secondary/90 text-white shadow-md shadow-secondary/20"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-blue-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface border-b border-blue-100">
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground w-24">Qty</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground w-32">Price</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground w-32 text-right">Total</th>
              <th className="px-4 py-3 w-12 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {items.map((item) => (
              <tr key={item.id} className="group hover:bg-surface/50 transition-colors">
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => onUpdateItem(item.id, { name: e.target.value })}
                    placeholder="Item name or description"
                    className="w-full bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground/50 outline-none"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onUpdateItem(item.id, { quantity: Number(e.target.value) })}
                    className="w-full bg-transparent border-none focus:ring-0 text-foreground outline-none"
                    min="1"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => onUpdateItem(item.id, { price: Number(e.target.value) })}
                    className="w-full bg-transparent border-none focus:ring-0 text-foreground outline-none"
                    min="0"
                  />
                </td>
                <td className="px-4 py-3 text-right text-foreground font-semibold">
                  ₹{item.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-muted-foreground/40 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground italic">
                  No items added yet. Click &quot;Add Item&quot; to begin.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
