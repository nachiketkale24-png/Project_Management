import { body } from "express-validator";
import { AvailableUserRoles, AvailableBloodTypes, AvailableDonationStatus, AvailableBloodRequestStatus } from "../utils/constants.js";
const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be in lower case")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("fullName").optional().trim(),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

export {
  userRegisterValidator,
  userLoginValidator
};

const bloodDonorValidator = () => {
  return [
    body("fullName")
      .trim()
      .notEmpty()
      .withMessage("Full name is required"),
    body("bloodType")
      .trim()
      .notEmpty()
      .withMessage("Blood type is required")
      .isIn(AvailableBloodTypes)
      .withMessage("Invalid blood type"),
    body("dateOfBirth")
      .notEmpty()
      .withMessage("Date of birth is required")
      .isISO8601()
      .withMessage("Invalid date format"),
    body("contactNumber")
      .trim()
      .notEmpty()
      .withMessage("Contact number is required"),
    body("address").optional(),
    body("medicalHistory").optional().trim(),
    body("lastDonationDate").optional().isISO8601().withMessage("Invalid date format")
  ];
};

const bloodInventoryValidator = () => {
  return [
    body("bloodType")
      .trim()
      .notEmpty()
      .withMessage("Blood type is required")
      .isIn(AvailableBloodTypes)
      .withMessage("Invalid blood type"),
    body("units")
      .notEmpty()
      .withMessage("Number of units is required")
      .isInt({ min: 0 })
      .withMessage("Units must be a non-negative number"),
    body("collectionDate")
      .notEmpty()
      .withMessage("Collection date is required")
      .isISO8601()
      .withMessage("Invalid date format"),
    body("expiryDate")
      .notEmpty()
      .withMessage("Expiry date is required")
      .isISO8601()
      .withMessage("Invalid date format"),
    body("donor").optional().isMongoId().withMessage("Invalid donor ID"),
    body("location").optional().trim(),
    body("notes").optional().trim()
  ];
};

const bloodRequestValidator = () => {
  return [
    body("patientName")
      .trim()
      .notEmpty()
      .withMessage("Patient name is required"),
    body("bloodType")
      .trim()
      .notEmpty()
      .withMessage("Blood type is required")
      .isIn(AvailableBloodTypes)
      .withMessage("Invalid blood type"),
    body("unitsNeeded")
      .notEmpty()
      .withMessage("Number of units needed is required")
      .isInt({ min: 1 })
      .withMessage("Units needed must be at least 1"),
    body("urgency")
      .optional()
      .isIn(['low', 'medium', 'high', 'critical'])
      .withMessage("Invalid urgency level"),
    body("hospital")
      .trim()
      .notEmpty()
      .withMessage("Hospital name is required"),
    body("contactNumber")
      .trim()
      .notEmpty()
      .withMessage("Contact number is required"),
    body("requiredBy")
      .notEmpty()
      .withMessage("Required by date is required")
      .isISO8601()
      .withMessage("Invalid date format"),
    body("reason").optional().trim(),
    body("notes").optional().trim()
  ];
};

export {
  userRegisterValidator,
  userLoginValidator,
  bloodDonorValidator,
  bloodInventoryValidator,
  bloodRequestValidator
};
