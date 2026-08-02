export interface ICreateDue {
  personName: string;
  phone?: string;
  amount: number;
  type: 'receivable' | 'payable';
  note?: string;
  dueDate?: string;
}
