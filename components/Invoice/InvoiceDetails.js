const InvoiceDetails = ({ updatedData, isEditing, makeInputEditable }) => {
  if (!updatedData) {
    return null;
  }

  return (
    <div className="mb-4">
   <h4>Številka računa: {makeInputEditable(updatedData.c, "c")}</h4>
<h4>Prodajalec: {makeInputEditable(updatedData.b, "b")}</h4>
<h4>Datum izdaje računa: {makeInputEditable(updatedData.d, "d")}</h4>

    </div>
  );
};

export default InvoiceDetails;
