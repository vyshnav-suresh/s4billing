'use client';

import { Calendar, User, Mail, MapPin, Phone, Hash, Percent, BadgeIndianRupee } from 'lucide-react';
import { CustomerInfo, BillingDocument } from '@/types/billing';

interface DocumentFormProps {
  doc: BillingDocument;
  onUpdateCustomer: (customer: Partial<CustomerInfo>) => void;
  onUpdateMeta: (meta: Partial<BillingDocument>) => void;
}

export function DocumentForm({ doc, onUpdateCustomer, onUpdateMeta }: DocumentFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Customer Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <User size={20} className="text-secondary" />
          Customer Details
        </h3>
        <div className="space-y-3">
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 text-muted-foreground/50 group-focus-within:text-secondary transition-colors" size={18} />
            <input
              type="text"
              placeholder="Customer Name"
              value={doc.customer.name}
              onChange={(e) => onUpdateCustomer({ name: e.target.value })}
              className="w-full bg-surface border border-blue-100 rounded-xl py-3 pl-11 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-muted-foreground/50"
            />
          </div>
          <div className="relative group">
            <Phone className="absolute left-3 top-3.5 text-muted-foreground/50 group-focus-within:text-secondary transition-colors" size={18} />
            <input
              type="text"
              placeholder="Phone Number"
              value={doc.customer.phone}
              onChange={(e) => onUpdateCustomer({ phone: e.target.value })}
              className="w-full bg-surface border border-blue-100 rounded-xl py-3 pl-11 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-muted-foreground/50"
            />
          </div>
          <div className="relative group">
            <MapPin className="absolute left-3 top-3.5 text-muted-foreground/50 group-focus-within:text-secondary transition-colors" size={18} />
            <textarea
              placeholder="Address"
              value={doc.customer.address}
              onChange={(e) => onUpdateCustomer({ address: e.target.value })}
              className="w-full bg-surface border border-blue-100 rounded-xl py-3 pl-11 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all min-h-[100px] resize-none placeholder:text-muted-foreground/50"
            />
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Hash size={20} className="text-secondary" />
          Document Info
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative group">
            <Hash className="absolute left-3 top-3.5 text-muted-foreground/50 group-focus-within:text-secondary transition-colors" size={18} />
            <input
              type="text"
              placeholder="Number"
              value={doc.number}
              onChange={(e) => onUpdateMeta({ number: e.target.value })}
              className="w-full bg-surface border border-blue-100 rounded-xl py-3 pl-11 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-muted-foreground/50"
            />
          </div>
          <div className="relative group">
            <Calendar className="absolute left-3 top-3.5 text-muted-foreground/50 group-focus-within:text-secondary transition-colors" size={18} />
            <input
              type="date"
              value={doc.date}
              onChange={(e) => onUpdateMeta({ date: e.target.value })}
              className="w-full bg-surface border border-blue-100 rounded-xl py-3 pl-11 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
            />
          </div>
          <div className="relative group">
            <Percent className="absolute left-3 top-3.5 text-muted-foreground/50 group-focus-within:text-secondary transition-colors" size={18} />
            <input
              type="number"
              placeholder="Tax %"
              value={doc.taxRate}
              onChange={(e) => onUpdateMeta({ taxRate: Number(e.target.value) })}
              className="w-full bg-surface border border-blue-100 rounded-xl py-3 pl-11 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-muted-foreground/50"
            />
          </div>
          <div className="relative group">
            <BadgeIndianRupee className="absolute left-3 top-3.5 text-muted-foreground/50 group-focus-within:text-secondary transition-colors" size={18} />
            <input
              type="number"
              placeholder="Discount"
              value={doc.discount}
              onChange={(e) => onUpdateMeta({ discount: Number(e.target.value) })}
              className="w-full bg-surface border border-blue-100 rounded-xl py-3 pl-11 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all placeholder:text-muted-foreground/50"
            />
          </div>
        </div>
        <div className="relative group">
          <textarea
            placeholder="Notes (terms, conditions, bank details...)"
            value={doc.notes}
            onChange={(e) => onUpdateMeta({ notes: e.target.value })}
            className="w-full bg-surface border border-blue-100 rounded-xl py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all min-h-[100px] resize-none placeholder:text-muted-foreground/50"
          />
        </div>
      </div>
    </div>
  );
}
