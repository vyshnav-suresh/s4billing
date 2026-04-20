'use client';

import { useBilling } from '@/hooks/useBilling';
import { ProductTable } from '@/components/ProductTable';
import { DocumentForm } from '@/components/DocumentForm';
import { DocumentPreview } from '@/components/DocumentPreview';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import { 
  Download, 
  Eye, 
  FileEdit, 
  Share2,
  FileText,
  Receipt,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { 
    doc, 
    setType, 
    updateCustomer, 
    updateMeta, 
    addItem, 
    removeItem, 
    updateItem 
  } = useBilling();

  const [view, setView] = useState<'EDIT' | 'PREVIEW'>('EDIT');
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  const handleDownloadPDF = useCallback(() => {
    window.print();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-surface print:hidden flex flex-col">
        {/* ===== MOBILE TOP HEADER ===== */}
        <header className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo + Title */}
            <div className="flex items-center gap-2.5">
              <Image 
                src="/s4logo.png" 
                alt="S4 Skate Academy" 
                width={36} 
                height={36} 
                className="shrink-0"
              />
              <div>
                <h1 className="font-display text-lg leading-tight tracking-wide text-secondary">S4 BILLING</h1>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-semibold hidden sm:block">Skate Academy</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Document Type Selector */}
              <div className="relative">
                <button 
                  onClick={() => setShowTypeMenu(!showTypeMenu)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface border border-blue-100 text-sm font-semibold text-foreground"
                >
                  {doc.type === 'INVOICE' ? <Receipt size={14} /> : <FileText size={14} />}
                  <span className="hidden sm:inline">{doc.type === 'INVOICE' ? 'Invoice' : 'Quote'}</span>
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>
                {showTypeMenu && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-blue-100 rounded-xl shadow-lg py-1 z-50 min-w-[140px]">
                    <button 
                      onClick={() => { setType('INVOICE'); setShowTypeMenu(false); }}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm ${doc.type === 'INVOICE' ? 'text-secondary font-bold bg-secondary/5' : 'text-foreground'}`}
                    >
                      <Receipt size={14} /> Invoice
                    </button>
                    <button 
                      onClick={() => { setType('QUOTATION'); setShowTypeMenu(false); }}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm ${doc.type === 'QUOTATION' ? 'text-secondary font-bold bg-secondary/5' : 'text-foreground'}`}
                    >
                      <FileText size={14} /> Quotation
                    </button>
                  </div>
                )}
              </div>

              {/* Download Button */}
              <button 
                onClick={handleDownloadPDF}
                className="flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-lg bg-secondary text-white font-bold text-sm hover:bg-secondary/90 transition-all shadow-md shadow-secondary/20 active:scale-95"
              >
                <Download size={16} />
                <span className="hidden sm:inline">PDF</span>
              </button>

              {/* Share */}
              <button className="p-2 rounded-lg border border-blue-200 text-muted-foreground hover:text-secondary transition-all">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 px-3 sm:px-6 lg:px-10 py-4 sm:py-6 pb-24 sm:pb-8">
          {/* Status Bar */}
          <div className="mb-4 sm:mb-8">
            <p className="text-xs text-muted-foreground">
              {view === 'EDIT' ? 'Editing' : 'Previewing'} • <span className="font-semibold text-secondary">{doc.number}</span> • {doc.date}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {view === 'EDIT' ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-5xl space-y-4 sm:space-y-8"
              >
                <section className="bg-white border border-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-sm">
                  <DocumentForm 
                    doc={doc} 
                    onUpdateCustomer={updateCustomer} 
                    onUpdateMeta={updateMeta} 
                  />
                </section>

                <section className="bg-white border border-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-sm">
                  <ProductTable 
                    items={doc.items} 
                    onAddItem={addItem} 
                    onRemoveItem={removeItem} 
                    onUpdateItem={updateItem} 
                  />
                </section>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="max-w-4xl mx-auto"
              >
                <div className="w-full shadow-2xl shadow-secondary/10 rounded-xl overflow-hidden">
                  <DocumentPreview doc={doc} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* ===== MOBILE BOTTOM NAV ===== */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-blue-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] sm:hidden pb-safe">
          <div className="flex items-stretch">
            <button
              onClick={() => setView('EDIT')}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all ${
                view === 'EDIT' 
                  ? 'text-secondary' 
                  : 'text-muted-foreground'
              }`}
            >
              <FileEdit size={20} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Create</span>
              {view === 'EDIT' && <div className="absolute top-0 left-[12.5%] w-[25%] h-0.5 bg-secondary rounded-full" />}
            </button>
            <button
              onClick={() => setView('PREVIEW')}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all ${
                view === 'PREVIEW' 
                  ? 'text-secondary' 
                  : 'text-muted-foreground'
              }`}
            >
              <Eye size={20} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Preview</span>
              {view === 'PREVIEW' && <div className="absolute top-0 left-[37.5%] w-[25%] h-0.5 bg-secondary rounded-full" />}
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex-1 flex flex-col items-center gap-1 py-3 text-muted-foreground active:text-secondary transition-all"
            >
              <Download size={20} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Download</span>
            </button>
            <button
              className="flex-1 flex flex-col items-center gap-1 py-3 text-muted-foreground active:text-secondary transition-all"
            >
              <Share2 size={20} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Share</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Print-Only */}
      <div className="hidden print:block">
        <DocumentPreview doc={doc} />
      </div>
    </>
  );
}
