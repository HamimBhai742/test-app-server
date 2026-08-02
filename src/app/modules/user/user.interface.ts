export interface IUpdateProfile {
  name?: string;
  avatar?: string;
  pushToken?: string;
}

export interface IUpdateUserStatus {
  status?: "active" | "inactive" | "blocked";
  role?: "user" | "admin";
}
