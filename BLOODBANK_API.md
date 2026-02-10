# Blood Bank Management API Documentation

## Overview
The Blood Bank Management System provides APIs to manage blood donors, inventory, and blood requests. All endpoints require JWT authentication.

## Base URL
```
/api/v1/bloodbank
```

## Authentication
All endpoints require a valid JWT token. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Donor Management

### Register New Donor
**POST** `/donors`

Register a new blood donor in the system.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "bloodType": "A+",
  "dateOfBirth": "1990-01-15",
  "contactNumber": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "medicalHistory": "No major conditions",
  "lastDonationDate": "2024-12-01"
}
```

**Required Fields:**
- `fullName` (string)
- `bloodType` (enum: A+, A-, B+, B-, AB+, AB-, O+, O-)
- `dateOfBirth` (ISO 8601 date)
- `contactNumber` (string)

**Response:** `201 Created`

---

### Get All Donors
**GET** `/donors`

Retrieve list of all donors with optional filters.

**Query Parameters:**
- `bloodType` (optional): Filter by blood type (e.g., A+, O-)
- `status` (optional): Filter by donation status (pending, approved, rejected, completed)
- `isEligible` (optional): Filter by eligibility (true/false)

**Example:**
```
GET /donors?bloodType=O+&isEligible=true
```

**Response:** `200 OK`

---

### Get Donor by ID
**GET** `/donors/:donorId`

Get detailed information about a specific donor.

**Response:** `200 OK`

---

### Update Donor
**PUT** `/donors/:donorId`

Update donor information.

**Request Body:** (partial updates allowed)
```json
{
  "contactNumber": "+9876543210",
  "isEligible": false,
  "donationStatus": "completed"
}
```

**Response:** `200 OK`

---

### Delete Donor
**DELETE** `/donors/:donorId`

Remove a donor from the system.

**Response:** `200 OK`

---

## Inventory Management

### Add Blood Inventory
**POST** `/inventory`

Add new blood units to inventory.

**Request Body:**
```json
{
  "bloodType": "A+",
  "units": 5,
  "collectionDate": "2024-01-15",
  "expiryDate": "2024-02-15",
  "donor": "donor-id-here",
  "location": "Blood Bank Main",
  "notes": "Emergency collection"
}
```

**Required Fields:**
- `bloodType` (enum: A+, A-, B+, B-, AB+, AB-, O+, O-)
- `units` (number, min: 0)
- `collectionDate` (ISO 8601 date)
- `expiryDate` (ISO 8601 date)

**Response:** `201 Created`

---

### Get All Inventory
**GET** `/inventory`

Retrieve blood inventory with optional filters.

**Query Parameters:**
- `bloodType` (optional): Filter by blood type
- `status` (optional): Filter by status (available, reserved, used, expired)

**Example:**
```
GET /inventory?bloodType=O+&status=available
```

**Response:** `200 OK`

---

### Get Inventory by ID
**GET** `/inventory/:inventoryId`

Get detailed information about a specific inventory item.

**Response:** `200 OK`

---

### Update Inventory
**PUT** `/inventory/:inventoryId`

Update inventory information.

**Request Body:** (partial updates allowed)
```json
{
  "units": 3,
  "status": "reserved"
}
```

**Response:** `200 OK`

---

### Delete Inventory
**DELETE** `/inventory/:inventoryId`

Remove an inventory item.

**Response:** `200 OK`

---

### Check Blood Availability
**GET** `/inventory/availability/:bloodType`

Check total available units for a specific blood type.

**Example:**
```
GET /inventory/availability/O+
```

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "data": {
    "bloodType": "O+",
    "totalUnits": 25
  },
  "message": "Blood availability checked successfully",
  "success": true
}
```

---

## Request Management

### Create Blood Request
**POST** `/requests`

Create a new blood request.

**Request Body:**
```json
{
  "patientName": "Jane Smith",
  "bloodType": "AB+",
  "unitsNeeded": 3,
  "urgency": "high",
  "hospital": "City General Hospital",
  "contactNumber": "+1234567890",
  "requiredBy": "2024-02-20",
  "reason": "Surgery",
  "notes": "Patient in ICU"
}
```

**Required Fields:**
- `patientName` (string)
- `bloodType` (enum: A+, A-, B+, B-, AB+, AB-, O+, O-)
- `unitsNeeded` (number, min: 1)
- `hospital` (string)
- `contactNumber` (string)
- `requiredBy` (ISO 8601 date)

**Optional Fields:**
- `urgency` (enum: low, medium, high, critical - default: medium)
- `reason` (string)
- `notes` (string)

**Response:** `201 Created`

---

### Get All Requests
**GET** `/requests`

Retrieve all blood requests with optional filters.

**Query Parameters:**
- `status` (optional): Filter by status (pending, approved, fulfilled, rejected, cancelled)
- `bloodType` (optional): Filter by blood type
- `urgency` (optional): Filter by urgency (low, medium, high, critical)

**Example:**
```
GET /requests?status=pending&urgency=critical
```

**Note:** Requests are automatically sorted by urgency priority (critical > high > medium > low), then by creation date.

**Response:** `200 OK`

---

### Get Request by ID
**GET** `/requests/:requestId`

Get detailed information about a specific request.

**Response:** `200 OK`

---

### Update Request Status
**PUT** `/requests/:requestId`

Update the status of a blood request.

**Request Body:**
```json
{
  "status": "approved",
  "notes": "Blood units allocated from inventory"
}
```

**Status Options:**
- `pending` - Initial status
- `approved` - Request approved (sets approvedBy field)
- `fulfilled` - Request fulfilled (sets fulfilledBy and fulfilledDate)
- `rejected` - Request rejected
- `cancelled` - Request cancelled

**Response:** `200 OK`

---

### Delete Request
**DELETE** `/requests/:requestId`

Remove a blood request.

**Response:** `200 OK`

---

## Response Format

### Success Response
```json
{
  "statusCode": 200,
  "data": { /* response data */ },
  "message": "Operation successful",
  "success": true
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Error message",
  "errors": [],
  "success": false
}
```

---

## Blood Types
Valid blood type values:
- `A+` (A Positive)
- `A-` (A Negative)
- `B+` (B Positive)
- `B-` (B Negative)
- `AB+` (AB Positive)
- `AB-` (AB Negative)
- `O+` (O Positive)
- `O-` (O Negative)

---

## Status Values

### Donation Status
- `pending` - Awaiting approval
- `approved` - Donation approved
- `rejected` - Donation rejected
- `completed` - Donation completed

### Request Status
- `pending` - Request submitted, awaiting review
- `approved` - Request approved, blood allocated
- `fulfilled` - Request fulfilled, blood delivered
- `rejected` - Request rejected
- `cancelled` - Request cancelled

### Inventory Status
- `available` - Blood available for use
- `reserved` - Blood reserved for a request
- `used` - Blood has been used
- `expired` - Blood has expired

---

## Notes

1. **Authentication Required**: All endpoints require a valid JWT token
2. **Date Format**: Use ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ)
3. **Validation**: Request bodies are validated before processing
4. **Permissions**: Some operations may require specific user roles (check with admin)
5. **Pagination**: Currently not implemented; all results are returned at once

---

## Example Usage with cURL

### Register a Donor
```bash
curl -X POST http://localhost:3000/api/v1/bloodbank/donors \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "bloodType": "O+",
    "dateOfBirth": "1990-01-15",
    "contactNumber": "+1234567890"
  }'
```

### Check Blood Availability
```bash
curl -X GET http://localhost:3000/api/v1/bloodbank/inventory/availability/O+ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Blood Request
```bash
curl -X POST http://localhost:3000/api/v1/bloodbank/requests \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "patientName": "Jane Smith",
    "bloodType": "AB+",
    "unitsNeeded": 2,
    "urgency": "critical",
    "hospital": "City Hospital",
    "contactNumber": "+1234567890",
    "requiredBy": "2024-02-20"
  }'
```
