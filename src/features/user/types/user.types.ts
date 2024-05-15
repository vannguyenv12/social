export interface AuthPayload {
  id: string
  email: string
  name: string
  role: string
  address: string
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: AuthPayload
    }
  }
}
