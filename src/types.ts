export interface MyEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  color: string;
  // Remove `allDay` if it's not needed
  // allDay: boolean; 
}