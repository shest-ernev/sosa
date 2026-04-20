import { server } from '@/shared/config'

export const getStatic = (path: string) => `${server.base}/${path}`
