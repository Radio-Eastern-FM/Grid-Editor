export interface SlotDocument {
  _id?: string
  day: number
  hourStart: number
  hourEnd: number
  minuteStart: number
  minuteEnd: number
}

export interface ProgramDocument {
  _id?: string
  title: string
  description: string
}

export interface EventDocument {
  _id?: string
  program?: ProgramDocument
  programId: string
  slot?: SlotDocument
  slotId: string
  presenterName: string
  from: Date
  to: Date
}

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const slotToStrings = (slot?: SlotDocument): {time?:string, day?:string} => {
  if(!slot) return {};
  return {
    time: `${slot.hourStart.toString().padStart(2, '0')}:${slot.minuteStart.toString().padStart(2, '0')} - ${slot.hourEnd.toString().padStart(2, '0')}:${slot.minuteEnd.toString().padStart(2, '0')}`,
    day: days[slot.day]
  }
}

export const slotToString = (slot?: SlotDocument): string => {
  if(!slot) return '';
  const {day, time} = slotToStrings(slot);
  return `${day} | ${time}`;
}
