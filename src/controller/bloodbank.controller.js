import BloodDonor from '../models/blooddonor.models.js';
import BloodInventory from '../models/bloodinventory.models.js';
import BloodRequest from '../models/bloodrequest.models.js';
import { ApiResponse } from '../utils/apiresponse.js';
import { asynchandler } from '../utils/async-handler.js';
import { ApiError } from '../utils/apierror.js';

// ==================== DONOR MANAGEMENT ====================

const registerDonor = asynchandler(async (req, res) => {
    const { fullName, bloodType, dateOfBirth, contactNumber, address, medicalHistory, lastDonationDate } = req.body;
    
    const donor = await BloodDonor.create({
        user: req.user._id,
        fullName,
        bloodType,
        dateOfBirth,
        contactNumber,
        address,
        medicalHistory,
        lastDonationDate,
        createdBy: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(201, donor, "Donor registered successfully")
    );
});

const getAllDonors = asynchandler(async (req, res) => {
    const { bloodType, status, isEligible } = req.query;
    
    const filter = {};
    if (bloodType) filter.bloodType = bloodType;
    if (status) filter.donationStatus = status;
    if (isEligible !== undefined) filter.isEligible = isEligible === 'true';

    const donors = await BloodDonor.find(filter)
        .populate('user', 'username email')
        .populate('createdBy', 'username email')
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, donors, "Donors retrieved successfully")
    );
});

const getDonorById = asynchandler(async (req, res) => {
    const { donorId } = req.params;

    const donor = await BloodDonor.findById(donorId)
        .populate('user', 'username email fullname')
        .populate('createdBy', 'username email');

    if (!donor) {
        throw new ApiError(404, "Donor not found");
    }

    return res.status(200).json(
        new ApiResponse(200, donor, "Donor retrieved successfully")
    );
});

const updateDonor = asynchandler(async (req, res) => {
    const { donorId } = req.params;
    const updates = req.body;

    const donor = await BloodDonor.findByIdAndUpdate(
        donorId,
        { $set: updates },
        { new: true, runValidators: true }
    );

    if (!donor) {
        throw new ApiError(404, "Donor not found");
    }

    return res.status(200).json(
        new ApiResponse(200, donor, "Donor updated successfully")
    );
});

const deleteDonor = asynchandler(async (req, res) => {
    const { donorId } = req.params;

    const donor = await BloodDonor.findByIdAndDelete(donorId);

    if (!donor) {
        throw new ApiError(404, "Donor not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Donor deleted successfully")
    );
});

// ==================== INVENTORY MANAGEMENT ====================

const addBloodInventory = asynchandler(async (req, res) => {
    const { bloodType, units, collectionDate, expiryDate, donor, location, notes } = req.body;

    const inventory = await BloodInventory.create({
        bloodType,
        units,
        collectionDate,
        expiryDate,
        donor,
        location,
        notes,
        addedBy: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(201, inventory, "Blood inventory added successfully")
    );
});

const getAllInventory = asynchandler(async (req, res) => {
    const { bloodType, status } = req.query;

    const filter = {};
    if (bloodType) filter.bloodType = bloodType;
    if (status) filter.status = status;

    const inventory = await BloodInventory.find(filter)
        .populate('donor', 'fullName bloodType')
        .populate('addedBy', 'username email')
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, inventory, "Inventory retrieved successfully")
    );
});

const getInventoryById = asynchandler(async (req, res) => {
    const { inventoryId } = req.params;

    const inventory = await BloodInventory.findById(inventoryId)
        .populate('donor', 'fullName bloodType contactNumber')
        .populate('addedBy', 'username email');

    if (!inventory) {
        throw new ApiError(404, "Inventory item not found");
    }

    return res.status(200).json(
        new ApiResponse(200, inventory, "Inventory item retrieved successfully")
    );
});

const updateInventory = asynchandler(async (req, res) => {
    const { inventoryId } = req.params;
    const updates = req.body;

    const inventory = await BloodInventory.findByIdAndUpdate(
        inventoryId,
        { $set: updates },
        { new: true, runValidators: true }
    );

    if (!inventory) {
        throw new ApiError(404, "Inventory item not found");
    }

    return res.status(200).json(
        new ApiResponse(200, inventory, "Inventory updated successfully")
    );
});

const deleteInventory = asynchandler(async (req, res) => {
    const { inventoryId } = req.params;

    const inventory = await BloodInventory.findByIdAndDelete(inventoryId);

    if (!inventory) {
        throw new ApiError(404, "Inventory item not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Inventory deleted successfully")
    );
});

const checkBloodAvailability = asynchandler(async (req, res) => {
    const { bloodType } = req.params;

    const availableBlood = await BloodInventory.aggregate([
        {
            $match: {
                bloodType: bloodType,
                status: 'available',
                expiryDate: { $gt: new Date() }
            }
        },
        {
            $group: {
                _id: '$bloodType',
                totalUnits: { $sum: '$units' }
            }
        }
    ]);

    const totalUnits = availableBlood.length > 0 ? availableBlood[0].totalUnits : 0;

    return res.status(200).json(
        new ApiResponse(200, { bloodType, totalUnits }, "Blood availability checked successfully")
    );
});

// ==================== REQUEST MANAGEMENT ====================

const createBloodRequest = asynchandler(async (req, res) => {
    const { patientName, bloodType, unitsNeeded, urgency, hospital, contactNumber, requiredBy, reason, notes } = req.body;

    const request = await BloodRequest.create({
        patientName,
        bloodType,
        unitsNeeded,
        urgency,
        hospital,
        contactNumber,
        requiredBy,
        reason,
        notes,
        requestedBy: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(201, request, "Blood request created successfully")
    );
});

const getAllRequests = asynchandler(async (req, res) => {
    const { status, bloodType, urgency } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (bloodType) filter.bloodType = bloodType;
    if (urgency) filter.urgency = urgency;

    const requests = await BloodRequest.find(filter)
        .populate('requestedBy', 'username email')
        .populate('approvedBy', 'username email')
        .populate('fulfilledBy', 'username email')
        .sort({ urgency: -1, createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, requests, "Requests retrieved successfully")
    );
});

const getRequestById = asynchandler(async (req, res) => {
    const { requestId } = req.params;

    const request = await BloodRequest.findById(requestId)
        .populate('requestedBy', 'username email fullname')
        .populate('approvedBy', 'username email fullname')
        .populate('fulfilledBy', 'username email fullname');

    if (!request) {
        throw new ApiError(404, "Request not found");
    }

    return res.status(200).json(
        new ApiResponse(200, request, "Request retrieved successfully")
    );
});

const updateRequestStatus = asynchandler(async (req, res) => {
    const { requestId } = req.params;
    const { status, notes } = req.body;

    const updateData = { status };
    if (notes) updateData.notes = notes;

    if (status === 'approved') {
        updateData.approvedBy = req.user._id;
    } else if (status === 'fulfilled') {
        updateData.fulfilledBy = req.user._id;
        updateData.fulfilledDate = new Date();
    }

    const request = await BloodRequest.findByIdAndUpdate(
        requestId,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!request) {
        throw new ApiError(404, "Request not found");
    }

    return res.status(200).json(
        new ApiResponse(200, request, "Request status updated successfully")
    );
});

const deleteRequest = asynchandler(async (req, res) => {
    const { requestId } = req.params;

    const request = await BloodRequest.findByIdAndDelete(requestId);

    if (!request) {
        throw new ApiError(404, "Request not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Request deleted successfully")
    );
});

export {
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
};
