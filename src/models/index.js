import { User } from "./user.models.js";
import Project from "./project.models.js";
import Task from "./task.models.js";
import { Subtask } from "./subtask.models.js";
import { ProjectNote } from "./note.models.js";
import { ProjectMember } from "./projectmember.models.js";
import BloodDonor from "./blooddonor.models.js";
import BloodInventory from "./bloodinventory.models.js";
import BloodRequest from "./bloodrequest.models.js";

// Note: Some exports use aliases for backward compatibility with existing code
// that imports these models with specific names (e.g., 'user' in auth.middlewares.js)
export {
  User as user, // Exported as lowercase for compatibility with auth.middlewares.js
  Project,
  Task,
  Subtask as SubTask, // Exported as SubTask for consistency with camelCase naming
  ProjectNote as Note,
  ProjectMember,
  BloodDonor,
  BloodInventory,
  BloodRequest,
};
