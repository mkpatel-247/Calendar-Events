export interface IEvent {
  id: number;
  title: string;
  description: string;
  image: string;
  timing: ITiming;
  address: any;
}

interface ITiming {
  startDateTime: string;
  endDateTime: string;
}
