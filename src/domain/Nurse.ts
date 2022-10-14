export interface Nurse {
  nurse_id: number;
  name: string;
  email?: string;
  photograph: string;
  workingDays: number;
  dutyStartTime: string;
  dutyEndTime: string;
  isRoundingManager: boolean;
  address: string;
  contact: string;
}

export interface NurseState {
  data: Nurse[];
}
