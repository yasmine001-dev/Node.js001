
import HTTPError from "../util/httpError.js";

const notFoundMW = (req, res, next) => {
  // ده بيشتغل لو اليوزر طلب مسار مش موجود
  const err = new HTTPError(404, `Can't find ${req.originalUrl} on this server!`);
  next(err); // بنبعت الخطأ للمركز الرئيسي
};

export default notFoundMW;