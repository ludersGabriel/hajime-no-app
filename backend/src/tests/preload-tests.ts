import 'reflect-metadata'

console.log('preloaded for tests')

export const api = 'http://localhost:3000/ichigo'

export const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiJ9.0taIGcpqbx9r_jCYMfKhjBAqg8xizHgvCPW_tr_zUeQ'

export const reqOptions = (input: RequestInit) => {
  return {
    ...input,
    headers: {
      ...input.headers,
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }
}
