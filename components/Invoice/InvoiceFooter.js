import React from 'react';

const InvoiceFooter = ({ data, isEditing, makeInputEditable }) => {
  return (
    <div className="mb-4">
   <h4>{makeInputEditable("ZOI: " + data.f, "f")}</h4>
<h4>{makeInputEditable("EOR: " + data.g, "g")}</h4>

    </div>
  );
};

export default InvoiceFooter;