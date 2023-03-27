import React from 'react';

const InvoiceItems = ({ data, isEditing, makeInputEditable }) => {
  return (
    <div className="mb-4">
      <h4 className="font-semibold mb-3">Izdelki:</h4>
      {data.z.map((item, index) => (
        <div key={index} className="mb-2 p-6 bg-gray-100 rounded-md shadow-sm">
          <p className="text-sm font-semibold text-gray-600 mb-1">Izdelek: {makeInputEditable(item.a, "a", index)}</p>
          <p className="text-sm font-semibold text-gray-600 mb-1">Količina: {makeInputEditable(item.b, "b", index)}</p>
          <p className="text-sm font-semibold text-gray-600 mb-1">Vrednost: {makeInputEditable(item.c, "c", index)}</p>
        </div>
      ))}
    </div>
  );
};

export default InvoiceItems;
