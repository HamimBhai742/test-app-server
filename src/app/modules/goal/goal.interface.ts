export interface ISavingsLog {
  id: string;
  amount: number;
  date: string;
  note?: string;
}

export interface ICreateGoal {
  name: string;
  targetAmount: number;
  description?: string;
  pointsAwarded: number;
  createdAt: string;
}

export interface IUpdateGoal {
  name?: string;
  targetAmount?: number;
  description?: string;
  isCompleted?: boolean;
}
