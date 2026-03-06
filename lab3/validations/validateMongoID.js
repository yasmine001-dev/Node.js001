import { param } from "express-validator";
export const idParamValidator = [
  param("id")
    .notEmpty()
    .withMessage("express-validator:missing param")
    .isMongoId()
    .withMessage("express-validator:Invalid ID format"),
];

//previously :
/**
 *     "status": "ُError something went wrong",
 *   "message": "Cast to ObjectId failed for value \"123\"
 *    (type string) at path \"_id\" for model \"User\""
 */


//comment id validator
// export const cidParamValidator = [
//     param("cId").notEmpty().withMessage("missing param").isMongoId().withMessage("Invalid ID format"),
// ];
