export type transaction = {
  id: number;
  type: string;
  valueBrl: string;
  sentToUser: {
    id: number;
    name: string;
    email: string;
  };
  sentFromUser: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
};
