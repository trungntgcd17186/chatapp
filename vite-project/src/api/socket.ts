export const socketUrl: any = process.env.NODE_ENV === 'production' ? process.env.VITE_SOCKET_PROD : process.env.VITE_SOCKET_LOCAL;
