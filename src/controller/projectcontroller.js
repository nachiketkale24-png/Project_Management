import { User} from '../models/user.models.js';
import { ApiResponse } from '../utils/apiresponse.js';
import { asynchandler } from '../utils/async-handler.js';
import { ApiError }  from '../utils/apierror.js';
import { Project } from '../models/project.models.js';
import { ProjectMember } from '../models/projectmember.models.js';

const getProjects = asynchandler(async (req, res) => {
    //test
});

const getProjectById = asynchandler(async (req, res) => {
    //test
});

const createProject = asynchandler(async (req, res) => {
    //test
});

const updateProject = asynchandler(async (req, res) => {
    //test
});

const deleteProject = asynchandler(async (req, res) => {
    //test
}
);

const addMembersToProject = asynchandler(async (req, res) => {
    //test
});

const getProjectMembers = asynchandler(async (req, res) => {
    //test
});

const deleteProjectMember = asynchandler(async (req, res) => {
    //test
}); 

const updateProjectMemberRole = asynchandler(async (req, res) => {
    //test
});

export{getProjects, getProjectById, createProject, updateProject, deleteProject, addMembersToProject, getProjectMembers, deleteProjectMember, updateProjectMemberRole};