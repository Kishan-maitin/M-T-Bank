// Base phone type used in multiple requests
export interface BasePhoneRequest {
  phoneNumber: string;
  countryCode: string;
}

// OTP request type
export type SendOTPRequest = BasePhoneRequest;

// OTP verification request type
export interface VerifyOTPRequest extends BasePhoneRequest {
  otp: string;
}

// Login request type
export interface LoginRequest extends BasePhoneRequest {
  password: string;
}

// Password reset request types (for future use)
export type RequestPasswordResetRequest = BasePhoneRequest;

export interface ResetPasswordRequest extends VerifyOTPRequest {
  newPassword: string;
}

// Profile related types
export interface Community {
  id: number;
  name: string;
  members: number;
  pfp: string;
}

export interface CreateProfileRequest {
  userId?: string;
  name: string;
  email: string;
  dateOfBirth: string;
  password: string;
  skillSelected: string[];
  image?: File;
  avatar?: string;
  communitiesSelected?: Community[];
}

export interface FetchAvatarsRequest {
  userId?: string;
} 

export interface FetchCommentsRequest {
  feedId: string;
  page: number;
  limit: number;
}

export interface PostCommentRequest {
  postId: string;
  comment: string;
}

export interface AcceptFriendRequestRequest {
  otherId: number;
}

export interface RejectFriendRequestRequest {
  otherId: number;
}

export interface FetchFriendRequestsRequest {
  page?: number;
  limit?: number;
}

export interface SetPasswordRequest {
  userId?: string;
  password: string;
  token?: string;
}

export interface SearchRequest {
  searchString: string;
}

export interface NotificationsRequest {
  page?: number;
  limit?: number;
}

export interface SendFriendRequestRequest {
  userId: number;
}
export interface FollowRequestsRequest {
  page: number;
  limit: number;
}

export interface FriendRequestActionRequest {
  otherId: string;
}

export interface GetMessagesRequest {
  roomId: string;
  page: number;
  limit: number;
}

export interface SendMessageRequest {
  senderId: string;
  content: string;
  entityId: string;
  media: null;
  entity: "chat";
  isBot: boolean;
}

export interface CreateGroupRequest {
  groupName: string;
  participants: string[];
}

export interface StoryData {
  type: 'text' | 'photo' | 'video';
  content: string | File | Blob;
  theme: string;
  privacy: number;
}

export interface Story {
  type: 'text' | 'photo' | 'video';
  content: string | File | Blob;
  theme: string;
  privacy?: number;
  previewUrl?: string;
}

export interface StoryRequest {
  contentType: 'text' | 'image' | 'video';
  privacy: number;
  theme: string;
  text?: string;      
  image?: File;       
  video?: File;
  repliesEnabled?: number;
  taggedUsers?: string[];
  privateTo?: string[];
  hideFrom?: string[];
}
export interface StartMessageRequest {
  userId2: string;
}

// Profile update request type
export interface UpdateProfileRequest {
  name: string;
  email: string;
  interests: string[];
  privacyLevel: number;
  avatar?: string | File;
}

// Post creation request type
export interface CreatePostRequest {
  content: string;
  whoCanComment: number;
  privacy: number;
  image?: File[];
  document?: File[];
}
