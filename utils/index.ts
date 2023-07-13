export const isEmailValid = (email: string): boolean => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)

export const fetcher = (url: string, options?: { method?: 'get' | 'post' | 'delete' | 'put'; data?: any }) =>
  fetch(process.env.API_URL + url, {
    method: options?.method || 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    body: options?.data ? JSON.stringify(options.data) : null,
  }).then(res => res.json())
