export interface ChatState {
  currentCommand: string;
  title?: string;
}
export const chatStates: { [key: number]: ChatState } = {};