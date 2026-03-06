//Joi middleware

export const validate = (schema) => (req, res, next) => {
  // 1. شغلي الـ schema على الـ req.body
    const { error } = schema.validate(req.body, { abortEarly: false });
  // 2. لو في error → next(HTTPError)
  if (error) {
  return next(new HTTPError(400, error.details[0].message))
}
return next();
}