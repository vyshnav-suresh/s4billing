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
  LogOut, 
  Share2,
  Sparkles,
  Zap,
  FileText,
  Receipt
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { 
    doc, 
    setType, 
    setTheme, 
    updateCustomer, 
    updateMeta, 
    addItem, 
    removeItem, 
    updateItem 
  } = useBilling();

  const [view, setView] = useState<'EDIT' | 'PREVIEW'>('EDIT');

  const handleDownloadPDF = useCallback(() => {
    window.print();
  }, []);

  return (
    <>
      <main className="flex min-h-screen bg-surface print:hidden">
        {/* Sidebar */}
        <aside className="w-20 lg:w-64 border-r border-blue-100 bg-white flex flex-col p-4 fixed h-full z-50 shadow-sm">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 mb-10 overflow-hidden">
            <Image 
              src="/s4logo.png" 
              alt="S4 Skate Academy" 
              width={44} 
              height={44} 
              className="shrink-0"
            />
            <div className="hidden lg:block">
              <h1 className="font-display text-xl tracking-wide text-secondary">S4 BILLING</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Skate Academy</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {[
              { id: 'EDIT', label: 'Create', icon: FileEdit },
              { id: 'PREVIEW', label: 'Preview', icon: Eye },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id as 'EDIT' | 'PREVIEW')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  view === item.id 
                    ? 'bg-secondary/10 text-secondary font-bold shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface'
                }`}
              >
                <item.icon size={20} />
                <span className="hidden lg:block font-medium">{item.label}</span>
              </button>
            ))}

            <div className="pt-6 mt-6 border-t border-blue-100 space-y-6">
              {/* Document Type */}
              <div className="px-2 lg:px-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Document Type</p>
                <div className="grid grid-cols-1 gap-2">
                  <button 
                    onClick={() => setType('INVOICE')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
                      doc.type === 'INVOICE' 
                        ? 'bg-secondary text-white font-bold shadow-md shadow-secondary/20' 
                        : 'text-muted-foreground hover:bg-surface'
                    }`}
                  >
                    <Receipt size={16} />
                    <span className="hidden lg:inline">Invoice</span>
                  </button>
                  <button 
                    onClick={() => setType('QUOTATION')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
                      doc.type === 'QUOTATION' 
                        ? 'bg-secondary text-white font-bold shadow-md shadow-secondary/20' 
                        : 'text-muted-foreground hover:bg-surface'
                    }`}
                  >
                    <FileText size={16} />
                    <span className="hidden lg:inline">Quotation</span>
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <div className="pt-6 border-t border-blue-100">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-red-500 transition-colors">
              <LogOut size={20} />
              <span className="hidden lg:block font-medium">Reset</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 ml-20 lg:ml-64 p-4 lg:p-10 relative">
          <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
                {view === 'EDIT' ? 'Drafting' : 'Reviewing'} {doc.type.toLowerCase()}
                <Sparkles className="text-primary" size={24} />
              </h2>
              <p className="text-muted-foreground mt-1">Document No: <span className="font-semibold text-secondary">{doc.number}</span></p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-white font-bold hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 active:scale-95"
              >
                <Download size={18} />
                Download PDF
              </button>
              <button className="p-3 rounded-xl border border-blue-200 text-muted-foreground hover:text-secondary hover:bg-secondary/5 transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {view === 'EDIT' ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-5xl space-y-8"
              >
                <section className="bg-white border border-blue-100 rounded-2xl p-8 shadow-sm">
                  <DocumentForm 
                    doc={doc} 
                    onUpdateCustomer={updateCustomer} 
                    onUpdateMeta={updateMeta} 
                  />
                </section>

                <section className="bg-white border border-blue-100 rounded-2xl p-8 shadow-sm">
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
                className="max-w-4xl mx-auto flex justify-center"
              >
                <div className="w-full shadow-2xl shadow-secondary/10 rounded-xl overflow-hidden">
                  <DocumentPreview doc={doc} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Print-Only */}
      <div className="hidden print:block">
        <DocumentPreview doc={doc} />
      </div>
    </>
  );
}
