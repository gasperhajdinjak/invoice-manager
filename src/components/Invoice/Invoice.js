import React, { useState, useEffect } from 'react';
import PreviousInvoices from '../PreviousInvoices';
import InvoiceHeader from './InvoiceHeader';
import InvoiceItems from './InvoiceItems';
import InvoiceDetails from './InvoiceDetails';
import InvoiceFooter from './InvoiceFooter';
import InvoiceTax from './InvoiceTax';




const UPDATE_INVOICE_URL = "http://localhost:5000/api/update-invoice";

const Invoice = () => {
  const [data, setData] = useState(null);
const [updatedData, setUpdatedData] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showPreviousInvoices, setShowPreviousInvoices] = useState(false);


  const [companyName, setCompanyName] = useState('');
const [address, setAddress] = useState('');
const [postal, setPostal] = useState('');
const [taxNumber, setTaxNumber] = useState('');



  useEffect(() => {
    fetchInvoice();
  }, []);

const fetchInvoice = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/invoice");
    const json = await response.json();
    setData(json.Data);
    setUpdatedData(json.Data);

    
    const [podjetje, naslov, posta, davcna] = json.Data.a.split("#");
    setCompanyName(podjetje);
    setAddress(naslov);
    setPostal(posta);
    setTaxNumber(davcna);
  } catch (error) {
    console.error("Nekaj je šlo narobe. Poizkusi znova.", error);
  }
};



   const updateInvoice = async (data) => {
    try {
      const response = await fetch(UPDATE_INVOICE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error:", error);
    }
  };




  const handleChangesInHeader = (input, value) => {
    if (input === "podjetje") {
    setCompanyName(value);
  } else if (input === "naslov") {
    setAddress(value);
  } else if (input === "posta") {
    setPostal(value);
  } else if (input === "davcna") {
    setTaxNumber(value);
  }
  }


  const handleItemChange = (index, field, value) => {
    //funcija updejta ime, količino ali vrednost izdelka. 
  const newArray = updatedData.z.map((item, i) => {
    if (i !== index) {
      return item;
    }

    const newItem = { ...item, [field]: value };

    if (field === "b") {
      const staraKolicina = parseFloat(item.b);
      const novaKolicina = parseFloat(newItem.b);
      const oldValue = parseFloat(item.c);

      if (!isNaN(staraKolicina) && !isNaN(novaKolicina) && !isNaN(oldValue)) {
        const priceOfOneProduct = oldValue / staraKolicina;
        newItem.c = (novaKolicina * priceOfOneProduct).toFixed(2);
      } else {
        newItem.c = "";
      }
    }

    return newItem;
  });

  setUpdatedData({ ...updatedData, z: newArray });
};



const editToggle = () => {
    setIsEditing(!isEditing);
  };



const makeInputEditable = (element, inputField, index) => {
  if (!isEditing) {
    return typeof element === "string" ? element : typeof element === "function" ? element() : element;
  }

  const inputs = {
    type: "text",
    className: "bg-white border border-gray-200 rounded p-3 text-gray-600",
    onChange: (e) => {
      if (inputField === "a" || inputField === "b" || inputField === "c") {
        handleItemChange(index, inputField, e.target.value);
      } else {
        handleChangesInHeader(inputField, e.target.value);
      }
    },
  };

  if (inputField === "a" || inputField === "b" || inputField === "c") {
    if (!updatedData.z || !updatedData.z[index]) {
      return "";
    }
    inputs.value = updatedData.z[index][inputField].toString();
  } else if (inputField.startsWith("a")) {
    const index = parseInt(inputField.substring(1));
    const headerText = updatedData.a.split("#");
    inputs.value = headerText[index];
  } else {
    inputs.value = updatedData[inputField];
  }

  return <input {...inputs} />;
};



const handleClick = () => {
  if (isEditing) {
    handleSave();
    saveToLocalstorage(updatedData);
  } else {
    editToggle();
  }
};




 const handleInvoiceClick = (invoiceData) => {
  setData(invoiceData);
   setUpdatedData(invoiceData);
  setShowPreviousInvoices(false) 
  }



const handleInvoiceHistoryClick = () => {
  const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

  if (storedInvoices.length === 0) {
    alert("Nimate starejših računov.");
  } else {
    setShowPreviousInvoices(!showPreviousInvoices);
  }
};



const handleSave = async () => {
  setIsEditing(false);
  await updateInvoice(updatedData);
  setData(updatedData);
  saveToLocalstorage(updatedData);
};





 const saveToLocalstorage = (invoiceData) => {
    let storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const invoiceIndex = storedInvoices.findIndex((invoice) => invoice.g === invoiceData.g);
    if (invoiceIndex !== -1) {
      storedInvoices[invoiceIndex] = invoiceData;
    } else {
      storedInvoices.push(invoiceData);
    }
    localStorage.setItem("invoices", JSON.stringify(storedInvoices));
  };


  const handleConfirmClick = async () => {
  if (isEditing) {
    alert("Prosim, shranite spremembe.");
    return;
  }
  try {
    await updateInvoice(updatedData);
       saveToLocalstorage(updatedData);
    alert("Račun poslan nazaj na storitev.");
  } catch (error) {
    alert("Med pošiljanjem računa je prišlo do napake.");
    console.error("Error:", error);
  }
};






 return (
    <div className="container mx-auto px-4 py-8">
      {data ? (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md border-double border-4 border-gray-300">
            <InvoiceHeader data={data} isEditing={isEditing} makeInputEditable={makeInputEditable} handleChangesInHeader={handleChangesInHeader} />
            <InvoiceDetails updatedData={updatedData} isEditing={isEditing} makeInputEditable={makeInputEditable} />
            <InvoiceItems data={data} isEditing={isEditing} makeInputEditable={makeInputEditable} />
            <InvoiceTax data={updatedData} isEditing={isEditing} makeInputEditable={makeInputEditable}/>
            <InvoiceFooter data={data} isEditing={isEditing} makeInputEditable={makeInputEditable} />
          </div>
          <div className="flex justify-between mt-4 space-x-4">
            <button
              onClick={handleClick}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg transform hover:scale-110 duration-200"
            >
              {isEditing ? "Shrani" : "Uredi Račun"}
            </button>
            <button
              onClick={handleInvoiceHistoryClick}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg transform hover:scale-110 duration-200"
            >
              {showPreviousInvoices ? "Skrij" : "Zgodovina Računov"}
            </button>
            <button
              onClick={handleConfirmClick}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg transform hover:scale-110 duration-200"
            >
              Potrdi
            </button>
          </div>
          {showPreviousInvoices && <PreviousInvoices onInvoiceClick={handleInvoiceClick} />}
        </>
      ) : (
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default Invoice;







