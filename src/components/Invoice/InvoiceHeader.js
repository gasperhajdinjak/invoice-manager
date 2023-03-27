import React from 'react';

const InvoiceHeader = ({
  data,
  isEditing,
  handleChangesInHeader,
}) => {
  const [podjetje, naslov, posta, davcna] = data.a.split("#");

  return (
    <div className="header">
      {isEditing ? (
        <input
          type="text"
          value={podjetje}
          onChange={(e) => handleChangesInHeader("podjetje", e.target.value)}
        />
      ) : (
        <h3>{podjetje}</h3>
      )}

      {isEditing ? (
        <input
          type="text"
          value={naslov}
          onChange={(e) => handleChangesInHeader("naslov", e.target.value)}
        />
      ) : (
        <h3>{naslov}</h3>
      )}

      {isEditing ? (
        <input
          type="text"
          value={posta}
          onChange={(e) => handleChangesInHeader("posta", e.target.value)}
        />
      ) : (
        <h3>{posta}</h3>
      )}

      {isEditing ? (
        <input
          type="text"
          value={davcna}
          onChange={(e) => handleChangesInHeader("davcna", e.target.value)}
        />
      ) : (
        <h3>{davcna}</h3>
      )}
    </div>
  );
};

export default InvoiceHeader;
