exports.createDebtReceipt = (req, res, next) => {
  res.status(201).json({
    message: "DebtReceipt created successfully!",
    receipt: {
      id: new Date().toISOString(),
    },
  });
};

exports.createReceivableReceipt = (req, res, next) => {
  res.status(201).json({
    message: "ReceivableReceipt created successfully!",
    receipt: {
      id: new Date().toISOString(),
    },
  });
};

// module.exports = { createDebtReceipt, createReceivableReceipt };
