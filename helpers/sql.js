const { BadRequestError } = require("../expressError");

// THIS IS A HELPER FUNCTION TO MAKE SELECTIVE UPDATE QUERIES
// THE CALLING FUNC USES IT TO MAKE THE "SET" CLAUSE OF A SQL UPDATE STATEMENT

// PARAMETER dataToUpdate {Object} {field1: newVal, field2: newVal, ...}

// PARAMETER jsToSql {Object} maps js-style data fields to database column names like { firstName: "first_name", age: "age" }

// RETURNS {Object} {sqlSetCols, dataToUpdate}

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
