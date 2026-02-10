export const UserRolesEnum = {
    ADMIN: "ADMIN",
    PROJECT_ADMIN: "project_admin",
    MEMBER: "member"
}

export const AvailableUserRoles = Object.values(UserRolesEnum)

export const TaskStatusEnum = {
    TODO : "todo",
    IN_PROGRESS : "in_progress",
    DONE : "done"
}

export const AvailableTaskStatus = Object.values(TaskStatusEnum)

export const BloodTypeEnum = {
    A_POSITIVE: "A+",
    A_NEGATIVE: "A-",
    B_POSITIVE: "B+",
    B_NEGATIVE: "B-",
    AB_POSITIVE: "AB+",
    AB_NEGATIVE: "AB-",
    O_POSITIVE: "O+",
    O_NEGATIVE: "O-"
}

export const AvailableBloodTypes = Object.values(BloodTypeEnum)

export const DonationStatusEnum = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
    COMPLETED: "completed"
}

export const AvailableDonationStatus = Object.values(DonationStatusEnum)

export const BloodRequestStatusEnum = {
    PENDING: "pending",
    APPROVED: "approved",
    FULFILLED: "fulfilled",
    REJECTED: "rejected",
    CANCELLED: "cancelled"
}

export const AvailableBloodRequestStatus = Object.values(BloodRequestStatusEnum)