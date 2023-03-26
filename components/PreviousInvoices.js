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
    <div>
      <h1>Zgodovina Računov</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.g}
            onClick={() => handleInvoiceClick(invoice)}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">
              {"Prodajalec: " + invoice.b}
            </h2>
            <p>{`EOR: ${invoice.g}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousInvoices;
