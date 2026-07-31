export interface ICreateTransaction {
  title: string;
  amount: number;
  type: "income" | "expense";
  category: "Food" | "Shopping" | "Utilities" | "Rent" | "Entertainment" | "Salary" | "Others";
  date: string;
}
