import React from 'react';

const InvoiceTax = ({data}) => {

    const getTaxRate = () => {
  return 9.5;
};

 const getNetValue = (data) => {
  const totalValue = getTotalValue(data);
  const taxRate = getTaxRate();
  return totalValue / (1 + taxRate / 100);
};


 const getTotalValue = (data) => {
  return data.z.reduce((total, item) => total + parseFloat(item.c), 0);
};

  return (
    <div className="mb-4">
            <h4 className="font-semibold">Za Plačilo EUR: {getTotalValue(data).toFixed(1)}</h4>
            <h4 className="font-semibold">Davčna Stopnja (%): 9.5</h4>
            <h4 className="font-semibold">Neto Vrednost: {getNetValue(data).toFixed(1)}</h4>
            <h4 className="font-semibold">Bruto Vrednost: {getTotalValue(data).toFixed(1)}</h4>
          </div>
  );
}

export default InvoiceTax;
