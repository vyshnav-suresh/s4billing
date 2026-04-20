'use client';

import { Calendar, User, Phone, MapPin, Hash, Percent, BadgeIndianRupee } from 'lucide-react';
import { CustomerInfo, BillingDocument } from '@/types/billing';

interface DocumentFormProps {
  doc: BillingDocument;
  onUpdateCustomer: (customer: Partial<CustomerInfo>) => void;
  onUpdateMeta: (meta: Partial<BillingDocument>) => void;
}

export function DocumentForm({ doc, onUpdateCustomer, onUpdateMeta }: DocumentFormProps) {
  return (
    <div className="space-y-6">
      {/* Customer Info */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <User size={18} className="text-secondary" />
          Customer Details
        </h3>
        <div className="space-y-3">
          <div className="relative group">
            <User className="absolute left-3 top-3 text-muted-foreground/50 group-focus-within:text-secondary transition-colors" size={16} />
            <input
              type="text"
              placeholder="Customer Name"
              value={doc.customer.name}
              onChange={(e) => onUpdateCustomer({ name: e.target.value })}
              className="w-full bg-surface border border-blue-100 rounded-xl py-2.5 pl-10 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-muted-foreground/50"
            />
          </div>
          <div className="relative group">
            <Phone className="absolute left-3 top-3 text-muted-foreground/50 group-focus-within:text-secondary transition-colors" size={16} />
            <input
              type="tel"
              placeholder="Phone Number"
              value={doc.customer.phone}
              onChange={(e) => onUpdateCustomer({ phone: e.target.value })}
              className="w-full bg-surface border border-blue-100 rounded-xl py-2.5 pl-10 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-muted-foreground/50"
            />
          </div>
          <div className="relative group">
            <MapPin className="absolute left-3 top-3 text-muted-foreground/50 group-focus-within:text-secondary transition-colors" size={16} />
            <textarea
              placeholder="Address"
              value={doc.customer.address}
              onChange={(e) => onUpdateCustomer({ address: e.target.value })}
              rows={2}
              className="w-full bg-surface border border-blue-100 rounded-xl py-2.5 pl-10 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-none placeholder:text-muted-foreground/50"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-blue-50" />

      {/* Document Info */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Hash size={18} className="text-secondary" />
          Document Info
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="relative group">
            <Hash className="absolute left-3 top-3 text-muted-foreground/50 group-focus-within:text-secondary transition-colors" size={16} />
            <input
              type="text"
              placeholder="Number"
              value={doc.number}
              onChange={(e) => onUpdateMeta({ number: e.target.value })}
              className="w-full bg-surface border border-blue-100 rounded-xl py-2.5 pl-10 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-muted-foreground/50"
            />
          </div>
          <div className="relative group">
            <Calendar className="absolute left-3 top-3 text-muted-foreground/50 group-focus-within:text-secondary transition-colors" size={16} />
            <input
              type="date"
              value={doc.date}
              onChange={(e) => onUpdateMeta({ date: e.target.value })}
              className="w-full bg-surface border border-blue-100 rounded-xl py-2.5 pl-10 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
            />
          </div>
          <div className="relative group">
            <Percent className="absolute left-3 top-3 text-muted-foreground/50 group-focus-within:text-secondary transition-colors" size={16} />
            <input
              type="number"
              placeholder="Tax %"
              value={doc.taxRate}
              onChange={(e) => onUpdateMeta({ taxRate: Number(e.target.value) })}
              className="w-full bg-surface border border-blue-100 rounded-xl py-2.5 pl-10 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-muted-foreground/50"
            />
          </div>
          <div className="relative group">
            <BadgeIndianRupee className="absolute left-3 top-3 text-muted-foreground/50 group-focus-within:text-secondary transition-colors" size={16} />
            <input
              type="number"
              placeholder="Discount ₹"
              value={doc.discount}
              onChange={(e) => onUpdateMeta({ discount: Number(e.target.value) })}
              className="w-full bg-surface border border-blue-100 rounded-xl py-2.5 pl-10 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-muted-foreground/50"
            />
          </div>
        </div>
        <textarea
          placeholder="Notes (terms, conditions, bank details...)"
          value={doc.notes}
          onChange={(e) => onUpdateMeta({ notes: e.target.value })}
          rows={2}
          className="w-full bg-surface border border-blue-100 rounded-xl py-2.5 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-none placeholder:text-muted-foreground/50"
        />
      </div>
    </div>
  );
}
