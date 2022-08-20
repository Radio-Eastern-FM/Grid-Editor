export interface IFlags {
  theme: "light" | "dark",
  API_URI: string
}
export const defaultFlags:IFlags = {
  theme: "light",
  API_URI: 'http://localhost:4000',
}
