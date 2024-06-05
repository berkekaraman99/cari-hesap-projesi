import BaseResponse from "../../../core/response/base_response.js";
import { db } from "../../../core/connection/mysql.js";
import { createReceiptValidator } from "../validators/create_receipt_validator.js";
import qr from "qrcode";
import { PDFDocument, StandardFonts, drawTextField, grayscale, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { getLocalIP } from "../../../features/utils/ip_helper.js";

export const createReceipt = async (req, res, next) => {
  try {
    const { receiptId, userId, customerId, createdDate, documentNo, price, description, receipt_type, paymentMethod } = req.body;

    await createReceiptValidator
      .validate({
        price,
        description,
      })
      .catch((_) => {
        throw new Error("Validation Error");
      });

    await db.query({
      sql: `INSERT INTO receipts 
      (receipt_id, customer_id, user_id, description, document_no, price, created_date, receipt_type, payment_method, is_deleted) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      values: [receiptId, customerId, userId, description, documentNo, price, createdDate, receipt_type, paymentMethod, 0],
    });

    return res.status(201).json(BaseResponse.success("Receipt created successfully!", 201));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

export const fetchReceipts = async (req, res, next) => {
  try {
    const { userId, offset } = req.query;
    const [receipts] = await db.query({
      sql: `SELECT * FROM receipts R LEFT JOIN customers C ON R.customer_id = C.customer_id WHERE R.user_id = ?  && R.is_deleted = 0 ORDER BY R.created_date DESC LIMIT 10 OFFSET ${offset}`,
      values: [userId],
    });
    return res.status(200).json(BaseResponse.success(receipts, 200));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

export const getMinMaxYear = async (req, res, _) => {
  try {
    const { userId } = req.query;
    const query = `SELECT MIN(YEAR(created_date)) AS first_year, MAX(YEAR(created_date)) AS last_year FROM receipts WHERE user_id = ? AND is_deleted = 0`;
    const [firstLastReceiptDate] = await db.query({
      sql: query,
      values: [userId],
    });

    return res.status(200).json(BaseResponse.success(firstLastReceiptDate, 200));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};

export const getTotalReceiptCount = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const query = "SELECT COUNT(*) AS count FROM receipts WHERE user_id = ? && is_deleted = 0";
    const [receipt_count] = await db.query({
      sql: query,
      values: [userId],
    });

    res.status(200).json(BaseResponse.success(receipt_count, 200));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};

export const getReceiptById = async (req, res, next) => {
  try {
    const { receiptId } = req.query;
    const [receipt] = await db.query({
      sql: "CALL get_receipt_by_id(?);",
      values: [receiptId],
    });

    res.status(200).json(BaseResponse.success(receipt[0], 200));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};

export const deleteReceipt = async (req, res, next) => {
  try {
    const { receiptId } = req.body;
    await db.query({
      sql: "UPDATE receipts SET is_deleted = 1 WHERE receipt_id = ?",
      values: [receiptId],
    });
    res.status(200).json(BaseResponse.fail("Receipt deleted successfully!", 200));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};

export const updateReceipt = async (req, res, next) => {
  try {
    const { receiptId, userId, customerId, createdDate, price, description, receipt_type, paymentMethod } = req.body;
    await db.query({
      sql: "UPDATE receipts SET customer_id = ?, created_date = ?, price = ?, description = ?, payment_method = ?, receipt_type = ? WHERE receipt_id = ?",
      values: [customerId, createdDate, price, description, paymentMethod, receipt_type, receiptId],
    });
    res.status(201).json(BaseResponse.success("Receipt updated successfully!", 200));
  } catch (error) {
    res.status(500).json(BaseResponse.fail(error.message, error.statusCode));
  }
};

export const getReceiptCount = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const [receiptCount] = await db.query({
      sql: "SELECT COUNT(*) AS receipt_count, SUM(CASE WHEN receipt_type = 1 then 1 else 0 end) as alacak_count, SUM(CASE WHEN receipt_type = 2 then 1 else 0 end) as borc_count FROM receipts WHERE user_id = ? AND is_deleted = 0",
      values: [userId],
    });

    return res.status(200).json(BaseResponse.success(receiptCount, 200));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

export const getReceiptTotalPrices = async (req, res, next) => {
  try {
    const { year, userId } = req.query;
    const [receivableTotalPrice] = await db.query({
      sql: `SELECT
              EXTRACT(MONTH FROM created_date) AS month,
              EXTRACT(YEAR FROM created_date) AS year,
              SUM(price) AS total_alacak
            FROM
              receipts
            WHERE
              receipt_type = ? && EXTRACT(YEAR FROM created_date) = ? && user_id = ? && is_deleted = 0
            GROUP BY
                EXTRACT(MONTH FROM created_date),
                EXTRACT(YEAR FROM created_date)
            ORDER BY
                EXTRACT(YEAR FROM created_date),
                EXTRACT(MONTH FROM created_date)`,
      values: [1, year, userId],
    });

    const [debtTotalPrice] = await db.query({
      sql: `SELECT
              EXTRACT(MONTH FROM created_date) AS month,
              EXTRACT(YEAR FROM created_date) AS year,
              SUM(price) AS total_borc
            FROM
              receipts
            WHERE
              receipt_type = ? && EXTRACT(YEAR FROM created_date) = ? && user_id = ? && is_deleted = 0
            GROUP BY
                EXTRACT(MONTH FROM created_date),
                EXTRACT(YEAR FROM created_date)
            ORDER BY
                EXTRACT(YEAR FROM created_date),
                EXTRACT(MONTH FROM created_date)`,
      values: [2, year, userId],
    });

    return res.status(200).json(BaseResponse.success({ receivableTotalPrice, debtTotalPrice }, 200));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

export const createQrCode = async (req, res, next) => {
  try {
    const { id } = req.query;
    // const { receiptId } = req.query;
    let qrContent;

    getLocalIP()
      .then((ip) => {
        qrContent = `http://${ip}:3000/api/receipts/download-receipt?id=${id}`;
      })
      .then(() => {
        qr.toDataURL(qrContent, (err, url) => {
          if (err) {
            res.status(500).send("QR kodu oluşturulurken bir hata oluştu.");
            return;
          }
          res.send(url);
        });
      });
  } catch (error) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

export const downloadReceiptPdf = async (req, res, next) => {
  try {
    const { id } = req.query;
    const [_receipt] = await db.query({
      sql: `SELECT U.company_name main_user, U.tax_number main_tax_num, U.tax_administration main_vergi_daire, U.tax_administration_city main_vergi_daire_city, 
            C.customer_name musteri, C.tax_number musteri_num, C.tax_administration musteri_vergi_daire, C.tax_administration_city musteri_vergi_daire_city, 
            R.payment_method odeme_yontemi, R.receipt_type, R.description, R.price, R.document_no 
            FROM receipts R LEFT JOIN customers C ON R.customer_id = C.customer_id LEFT JOIN users U ON U.id = R.user_id
            WHERE U.id = 'c93a5b24-5d76-41b7-b9cd-2f410ff4c317' AND R.receipt_id = ?
      `,
      values: [id],
    });

    const receipt = _receipt[0];
    console.log(receipt);

    const url = "https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf";
    const fontBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.create();

    const headerFont = await pdfDoc.embedFont(StandardFonts.CourierBold);
    pdfDoc.registerFontkit(fontkit);

    const ubuntuFont = await pdfDoc.embedFont(fontBytes, { subset: true });
    // const ubuntuFont = fontBytes;

    const page = pdfDoc.addPage([595, 842]);

    const form = pdfDoc.getForm();

    page.drawText("E-Dekont", { x: 250, y: 800, size: 20, font: headerFont });
    page.drawLine({ start: { x: 20, y: 785 }, end: { x: 575, y: 785 }, thickness: 1, color: rgb(0.1, 0.1, 0.1), opacity: 0.5 });

    // const logo = form.createTextField("logo");
    // logo.setText("Cari Takip");
    // logo.addToPage(page, { x: 500, y: 745, height: 60, width: 60 });

    page.drawText("Firma Adı: ", { x: 40, y: 750, size: 12, font: ubuntuFont });
    page.drawText(receipt.main_user, { x: 100, y: 750, size: 12, font: ubuntuFont });

    page.drawText("Vergi Dairesi: ", { x: 40, y: 732, size: 12, font: ubuntuFont });
    page.drawText(receipt.main_vergi_daire + " - " + receipt.main_vergi_daire_city, { x: 120, y: 732, size: 12, font: ubuntuFont });

    page.drawText("VKN: ", { x: 40, y: 714, size: 12, font: ubuntuFont });
    page.drawText(receipt.main_tax_num, { x: 70, y: 714, size: 12, font: ubuntuFont });

    page.drawText("Dekont No:", { x: 40, y: 696, size: 12, font: ubuntuFont });
    page.drawText(receipt.document_no, { x: 105, y: 696, size: 12, font: ubuntuFont });

    page.drawLine({ start: { x: 20, y: 661 }, end: { x: 575, y: 661 }, thickness: 1, color: rgb(0.1, 0.1, 0.1), opacity: 0.5 });

    page.drawText("Müşteri Adı: ", { x: 40, y: 626, size: 12, font: ubuntuFont });
    page.drawText(receipt.musteri, { x: 110, y: 626, size: 12, font: ubuntuFont });

    page.drawText("Vergi Dairesi: ", { x: 40, y: 608, size: 12, font: ubuntuFont });
    page.drawText(receipt.musteri_vergi_daire + " - " + receipt.musteri_vergi_daire_city, { x: 120, y: 608, size: 12, font: ubuntuFont });

    page.drawText("VKN: ", { x: 40, y: 590, size: 12, font: ubuntuFont });
    page.drawText(receipt.musteri_num, { x: 70, y: 590, size: 12, font: ubuntuFont });

    page.drawText("Dekont Türü: ", { x: 40, y: 570, size: 12, font: ubuntuFont });
    page.drawText(receipt.receipt_type === 1 ? "Alacak" : "Borç", { x: 120, y: 570, size: 12, font: ubuntuFont });

    page.drawText("Ödeme Yöntemi: ", { x: 40, y: 552, size: 12, font: ubuntuFont });
    page.drawText(receipt.odeme_yontemi, { x: 140, y: 552, size: 12, font: ubuntuFont });

    const description = form.createTextField("description");
    description.setText(receipt.description);
    description.updateAppearances(ubuntuFont, () => {
      return drawTextField({ font: ubuntuFont, fontSize: 12 });
    });
    description.addToPage(page, { x: 40, y: 435, width: 515, height: 90, borderWidth: 1, borderColor: grayscale(0.5), font: ubuntuFont });

    page.drawText("Yekün:", { x: 475, y: 410, size: 12, font: ubuntuFont });
    page.drawText(receipt.price.toString() + " TL", { x: 515, y: 410, size: 12, font: ubuntuFont });

    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="receipt.pdf"');
    res.send(pdfBuffer);
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

export const getReceiptReport = async (req, res, next) => {
  try {
    const { sortBy, sort, startDate, endDate, userId } = req.query;

    const [report] = await db.query({
      sql: `SELECT c.customer_name as customer, SUM(CASE WHEN r.receipt_type = 1 THEN price ELSE 0 END) AS alacak, SUM(CASE WHEN r.receipt_type = 2 THEN price ELSE 0 END) AS borc,
      SUM(CASE WHEN r.receipt_type = 1 THEN price ELSE 0 END) - SUM(CASE WHEN r.receipt_type = 2 THEN price ELSE 0 END) as net 
      FROM receipts r INNER JOIN customers c ON c.customer_id = r.customer_id 
      WHERE r.is_deleted = 0 AND r.user_id = ? AND c.is_deleted = 0 AND r.created_date BETWEEN ? AND ? group by c.customer_name ORDER BY ${sortBy} ${sort}`,
      values: [userId, startDate, endDate],
    });

    const [donemRapor] = await db.query({
      sql: `
      SELECT SUM(CASE WHEN receipt_type = 1 THEN price ELSE 0 END) AS TOPLAM_ALACAK,
		    SUM(CASE WHEN receipt_type = 2 THEN price ELSE 0 END) AS TOPLAM_BORC FROM receipts 
        WHERE is_deleted = 0 AND user_id = ? AND created_date BETWEEN ? AND ?;
      `,
      values: [userId, startDate, endDate],
    });

    const [receiptCount] = await db.query({
      sql: `
      SELECT c.customer_name, SUM(CASE WHEN r.is_deleted = 0 THEN 1 ELSE 0 END) AS receipt_count 
      FROM receipts r INNER JOIN customers c ON c.customer_id = r.customer_id 
      WHERE r.user_id = ? AND r.is_deleted = 0 AND r.created_date BETWEEN ? AND ?
      GROUP BY c.customer_name ORDER BY receipt_count DESC;
      `,
      values: [userId, startDate, endDate],
    });
    return res.status(200).json(BaseResponse.success({ report, donemRapor, receiptCount }, 200));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

export const getCustomerComparison = async (req, res, _) => {
  try {
    const { customerOne, customerTwo, startDate, endDate, userId } = req.query;
    const [report] = await db.query({
      sql: `SELECT c.customer_name, SUM(CASE WHEN r.receipt_type = 1 THEN r.price ELSE 0 END) AS alacak,  
      SUM(CASE WHEN r.receipt_type = 2 THEN r.price ELSE 0 END) AS borc FROM customers c LEFT JOIN receipts r ON c.customer_id = r.customer_id WHERE c.customer_name IN (?, ?) AND r.user_id = ? AND r.created_date BETWEEN ? and ? GROUP BY c.customer_name;`,
      values: [customerOne, customerTwo, userId, startDate, endDate],
    });
    const [report2] = await db.query({
      sql: `SELECT c.customer_name, sum(r.price) FROM customers c LEFT JOIN receipts r on c.customer_id = r.customer_id WHERE c.customer_name IN (?, ?) AND r.user_id = ? AND r.created_date BETWEEN ? AND ? GROUP BY c.customer_name`,
      values: [customerOne, customerTwo, userId, startDate, endDate],
    });
    return res.status(200).json(BaseResponse.success({ report, report2 }, 200));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};
