'use client';

import { Plus, Trash2, Package } from 'lucide-react';
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
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Package size={18} className="text-secondary" />
          Line Items
        </h3>
        <button
          onClick={onAddItem}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition-all bg-secondary rounded-lg hover:bg-secondary/90 text-white shadow-md shadow-secondary/20 active:scale-95"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* ===== MOBILE: Card Layout ===== */}
      <div className="space-y-3 sm:hidden">
        {items.map((item) => (
          <div key={item.id} className="bg-surface border border-blue-100 rounded-xl p-3 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <input
                type="text"
                value={item.name}
                onChange={(e) => onUpdateItem(item.id, { name: e.target.value })}
                placeholder="Item name"
                className="flex-1 bg-white border border-blue-100 rounded-lg py-2 px-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
              />
              <button
                onClick={() => onRemoveItem(item.id)}
                className="p-2 text-muted-foreground/40 hover:text-red-500 transition-colors shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Qty</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdateItem(item.id, { quantity: Number(e.target.value) })}
                  className="w-full bg-white border border-blue-100 rounded-lg py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                  min="1"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Price ₹</label>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => onUpdateItem(item.id, { price: Number(e.target.value) })}
                  className="w-full bg-white border border-blue-100 rounded-lg py-2 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                  min="0"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Total</label>
                <div className="py-2 px-3 bg-secondary/5 border border-secondary/20 rounded-lg text-sm font-bold text-secondary">
                  ₹{item.total.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="py-10 text-center text-muted-foreground italic bg-surface rounded-xl border border-dashed border-blue-200">
            <Package size={32} className="mx-auto mb-2 text-blue-200" />
            <p className="text-sm">No items added yet</p>
            <p className="text-xs mt-1">Tap &quot;Add&quot; to begin</p>
          </div>
        )}
      </div>

      {/* ===== DESKTOP: Table Layout ===== */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-blue-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface border-b border-blue-100">
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground w-24">Qty</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground w-32">Price</th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground w-32 text-right">Total</th>
              <th className="px-4 py-3 w-12"></th>
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
                    className="w-full bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground/50 outline-none text-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onUpdateItem(item.id, { quantity: Number(e.target.value) })}
                    className="w-full bg-transparent border-none focus:ring-0 text-foreground outline-none text-sm"
                    min="1"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => onUpdateItem(item.id, { price: Number(e.target.value) })}
                    className="w-full bg-transparent border-none focus:ring-0 text-foreground outline-none text-sm"
                    min="0"
                  />
                </td>
                <td className="px-4 py-3 text-right text-foreground font-semibold text-sm">
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
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground italic text-sm">
                  No items added yet. Click &quot;Add&quot; to begin.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
