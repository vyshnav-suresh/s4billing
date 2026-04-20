'use client';

import { BillingDocument } from '@/types/billing';
import { forwardRef } from 'react';

interface DocumentPreviewProps {
  doc: BillingDocument;
}

export const DocumentPreview = forwardRef<HTMLDivElement, DocumentPreviewProps>(({ doc }, ref) => {
  // S4 color palette (matching landing-app)
  const blue = '#047DFF';
  const yellow = '#FFEA00';

  return (
    <div
      ref={ref}
      className="w-full aspect-[1/1.414] p-12 overflow-hidden relative"
      style={{ 
        minHeight: '1120px',
        backgroundColor: '#ffffff',
        color: '#171717',
        border: `1px solid ${blue}15`
      }}
    >
      {/* Top Yellow Bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-2" 
        style={{ backgroundColor: yellow }} 
      />

      {/* Decorative Corner */}
      <div 
        className="absolute top-0 right-0 w-48 h-48 opacity-5 pointer-events-none" 
        style={{ 
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          backgroundColor: blue
        }} 
      />

      {/* Header */}
      <div className="flex justify-between items-start mb-12 relative z-10 pt-4">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/s4logo.png" 
            alt="S4 Skate Academy" 
            style={{ width: '80px', height: '80px', objectFit: 'contain' }}
          />
          <div>
            <h1 
              className="text-3xl font-black tracking-tight mb-1"
              style={{ color: blue }}
            >
              S4 SKATE ACADEMY
            </h1>
            <div className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
              PCK Auditorium, Vellangallur<br />
              Kerala - 680662 | Ph: 7907585664
            </div>
          </div>
        </div>
        <div className="text-right">
          <h2 
            className="text-5xl font-light uppercase tracking-widest mb-4" 
            style={{ color: '#e2e8f0' }}
          >
            {doc.type}
          </h2>
          <div className="space-y-1">
            <p className="text-sm font-bold" style={{ color: '#0f172a' }}>#{doc.number}</p>
            <p className="text-xs" style={{ color: '#64748b' }}>Date: {doc.date}</p>
          </div>
        </div>
      </div>

      {/* Bill To / Payment Details */}
      <div className="grid grid-cols-2 gap-12 mb-12 relative z-10">
        <div>
          <h3 
            className="text-xs font-bold uppercase tracking-widest mb-4" 
            style={{ color: blue }}
          >
            Bill To
          </h3>
          <p className="text-lg font-bold mb-1" style={{ color: '#0f172a' }}>
            {doc.customer.name || 'Customer Name'}
          </p>
          <p className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: '#64748b' }}>
            {doc.customer.address || 'Customer Address'}<br />
            {doc.customer.phone && `Phone: ${doc.customer.phone}`}
          </p>
        </div>
        <div className="text-right">
          <h3 
            className="text-xs font-bold uppercase tracking-widest mb-4" 
            style={{ color: blue }}
          >
            Payment Details
          </h3>
          <p className="text-sm" style={{ color: '#64748b' }}>
            UPI: s4sports@okaxis<br />
            A/C: 9182371283712<br />
            IFSC: UTIB001234
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="mb-12 relative z-10">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ borderBottom: `2px solid ${blue}` }}>
              <th className="py-4 text-left text-xs font-black uppercase tracking-widest" style={{ color: '#0f172a' }}>Description</th>
              <th className="py-4 text-center text-xs font-black uppercase tracking-widest w-24" style={{ color: '#0f172a' }}>Qty</th>
              <th className="py-4 text-right text-xs font-black uppercase tracking-widest w-32" style={{ color: '#0f172a' }}>Price</th>
              <th className="py-4 text-right text-xs font-black uppercase tracking-widest w-32" style={{ color: '#0f172a' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {doc.items.length > 0 ? doc.items.map((item, index) => (
              <tr 
                key={item.id} 
                style={{ 
                  borderBottom: '1px solid #e2e8f0',
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#F0F9FF'
                }}
              >
                <td className="py-4 px-1">
                  <p className="font-semibold" style={{ color: '#0f172a' }}>{item.name}</p>
                </td>
                <td className="py-4 text-center font-medium" style={{ color: '#475569' }}>{item.quantity}</td>
                <td className="py-4 text-right font-medium" style={{ color: '#475569' }}>₹{item.price.toLocaleString('en-IN')}</td>
                <td className="py-4 text-right font-bold" style={{ color: '#0f172a' }}>₹{item.total.toLocaleString('en-IN')}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="py-12 text-center italic" style={{ color: '#cbd5e1' }}>No items listed</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-12 relative z-10">
        <div className="w-full max-w-xs space-y-3">
          <div className="flex justify-between text-sm" style={{ color: '#64748b' }}>
            <span>Subtotal</span>
            <span>₹{doc.subtotal.toLocaleString('en-IN')}</span>
          </div>
          {doc.taxRate > 0 && (
            <div className="flex justify-between text-sm" style={{ color: '#64748b' }}>
              <span>Tax ({doc.taxRate}%)</span>
              <span>₹{doc.taxAmount.toLocaleString('en-IN')}</span>
            </div>
          )}
          {doc.discount > 0 && (
            <div className="flex justify-between text-sm" style={{ color: '#ef4444' }}>
              <span>Discount</span>
              <span>-₹{doc.discount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div 
            className="flex justify-between py-4 items-center" 
            style={{ borderTop: `2px solid ${blue}` }}
          >
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#0f172a' }}>Total Amount</span>
            <span className="text-2xl font-black" style={{ color: blue }}>
              ₹{doc.total.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-10 relative z-10" style={{ borderTop: '1px solid #e2e8f0' }}>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#94a3b8' }}>Notes & Terms</h4>
            <p className="text-[11px] leading-relaxed whitespace-pre-wrap" style={{ color: '#64748b' }}>
              {doc.notes || '1. Payments should be made within 15 days.\n2. Goods once sold will not be taken back.\n3. This is a computer generated document.'}
            </p>
          </div>
          <div className="text-right flex flex-col justify-end">
            <div className="h-12 w-32 border-b ml-auto mb-2 opacity-50" style={{ borderBottomColor: '#cbd5e1' }} />
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#0f172a' }}>Authorized Signatory</p>
          </div>
        </div>
      </div>

      {/* Bottom Blue Bar */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-2" 
        style={{ backgroundColor: blue }} 
      />
    </div>
  );
});

DocumentPreview.displayName = 'DocumentPreview';
