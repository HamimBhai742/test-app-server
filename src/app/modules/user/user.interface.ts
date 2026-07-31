export interface IUpdateProfile {
  name?: string;
  avatar?: string;
}

export interface IUpdateUserStatus {
  status?: "active" | "inactive" | "blocked";
  role?: "user" | "admin";
}
