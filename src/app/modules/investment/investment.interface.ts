export interface IInvestmentLog {
  id: string;
  title: string;
  amount: number;
  date: string;
}

export interface ICreateInvestment {
  name: string;
  targetBudget?: number;
  description?: string;
  createdAt: string;
}

export interface IUpdateInvestment {
  name?: string;
  targetBudget?: number;
  description?: string;
}
