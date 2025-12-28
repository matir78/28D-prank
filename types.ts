export interface RobotFeature {
  title: string;
  description: string;
  icon: string;
}

export interface UserEntry {
  fullName: string;
  email: string;
  address: string;
  reason: string;
  agreeToTerms: boolean;
}

export enum AppState {
  LOADING_PITCH,
  LANDING,
  SUBMITTING,
  PRANK_REVEALED
}