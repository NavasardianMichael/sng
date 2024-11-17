type EndpointPaths = {
  payload: unknown
  response: unknown
  processed: unknown
}

export type Endpoint<T extends EndpointPaths> = {
  payload: T['payload']
  response: T['response']
  processed: T['processed']
  api: (args: T['payload']) => Promise<T['processed']>
  processor: (args: APIResponse<T['response']>) => T['processed']
}

export type APIResponse<T> = {
  result: T
  messages: string[]
  statusCode: number
}
