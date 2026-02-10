import { Router } from "express";
import {
    // Donor management
    registerDonor,
    getAllDonors,
    getDonorById,
    updateDonor,
    deleteDonor,
    // Inventory management
    addBloodInventory,
    getAllInventory,
    getInventoryById,
    updateInventory,
    deleteInventory,
    checkBloodAvailability,
    // Request management
    createBloodRequest,
    getAllRequests,
    getRequestById,
    updateRequestStatus,
    deleteRequest
} from "../controller/bloodbank.controller.js";
import { validate } from "../middlewares/validators.middleware.js";
import {
    bloodDonorValidator,
    bloodInventoryValidator,
    bloodRequestValidator
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// All routes require authentication
router.use(verifyJWT);

// ==================== DONOR ROUTES ====================
router.route("/donors")
    .post(bloodDonorValidator(), validate, registerDonor)
    .get(getAllDonors);

router.route("/donors/:donorId")
    .get(getDonorById)
    .put(updateDonor)
    .delete(deleteDonor);

// ==================== INVENTORY ROUTES ====================
router.route("/inventory")
    .post(bloodInventoryValidator(), validate, addBloodInventory)
    .get(getAllInventory);

router.route("/inventory/:inventoryId")
    .get(getInventoryById)
    .put(updateInventory)
    .delete(deleteInventory);

router.route("/inventory/availability/:bloodType")
    .get(checkBloodAvailability);

// ==================== REQUEST ROUTES ====================
router.route("/requests")
    .post(bloodRequestValidator(), validate, createBloodRequest)
    .get(getAllRequests);

router.route("/requests/:requestId")
    .get(getRequestById)
    .put(updateRequestStatus)
    .delete(deleteRequest);

export default router;
