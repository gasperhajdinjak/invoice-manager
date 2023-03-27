import React, { useState, useEffect } from 'react';

const PreviousInvoices = ({ onInvoiceClick }) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem('invoices'));
    if (storedInvoices && Array.isArray(storedInvoices)) {
      setInvoices(storedInvoices);
    } else {
      setInvoices([]);
    }
  }, []);

  const handleInvoiceClick = (invoiceData) => {
    onInvoiceClick(invoiceData);
  };

  return (
    <div className="mt-12 mb-12">
      <h1 className="text-2xl font-bold text-blue-600">Zgodovina Računov</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.g}
            onClick={() => handleInvoiceClick(invoice)}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-100 transition-colors duration-300"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-800">
              {"Prodajalec: " + invoice.b}
            </h2>
            <p className="text-blue-700">{`EOR: ${invoice.g}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousInvoices;
