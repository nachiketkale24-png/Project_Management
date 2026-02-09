import { User} from '../models/user.models.js';
import { ApiResponse } from '../utils/apiresponse.js';
import { asynchandler } from '../utils/async-handler.js';
import { ApiError }  from '../utils/apierror.js';
import {sendEmail} from '../utils/mail.js';
import {emailVerificationMailgenContent, forgotPasswordmailgenContent,} from '../utils/mail.js';