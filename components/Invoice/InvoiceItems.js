import React from 'react';

const InvoiceItems = ({ data, isEditing, makeInputEditable }) => {
  return (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">Izdelki:</h4>
      {data.z.map((item, index) => (
        <div key={index} className="mb-2">
       <p>Izdelek: {makeInputEditable(item.a, "a", index)}</p>
<p>Količina: {makeInputEditable(item.b, "b", index)}</p>
<p>Vrednost: {makeInputEditable(item.c, "c", index)}</p>

        </div>
      ))}
    </div>
  );
};

export default InvoiceItems;
