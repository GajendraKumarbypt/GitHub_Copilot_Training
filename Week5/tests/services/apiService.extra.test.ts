import { describe, it, expect, vi } from 'vitest'
import { ApiError, ApiService, createApiService } from '../../src/services/apiService'

describe('apiService extra branches', () => {
  it('rethrows network Error as-is', async () => {
    const mockClient = {
      get: vi.fn().mockRejectedValue(new Error('network fail')),
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } }
    }

    const service = new ApiService(undefined, undefined, mockClient as any)
    await expect(service.get('/net')).rejects.toThrow('network fail')
  })

  it('throws ApiError for rejection with plain object', async () => {
    const mockClient = {
      get: vi.fn().mockRejectedValue({ message: 'plain', code: 123 }),
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } }
    }
    const service = new ApiService(undefined, undefined, mockClient as any)
    await expect(service.get('/plain')).rejects.toBeInstanceOf(ApiError)
  })

  it('registers interceptors and response error handler rejects ApiError', async () => {
    const responseUse = vi.fn()
    const mockClient = {
      get: vi.fn().mockResolvedValue({ data: { ok: true } }),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: responseUse }
      }
    }

    const service = new ApiService(undefined, undefined, mockClient as any)

    // request interceptor registered
    expect(mockClient.interceptors.request.use).toHaveBeenCalled()

    // response.use was called with two functions (success, error)
    expect(responseUse).toHaveBeenCalled()
    const args = responseUse.mock.calls[0]
    expect(typeof args[0]).toBe('function')
    expect(typeof args[1]).toBe('function')

    // call the error handler directly to ensure it returns a rejected ApiError
    const errHandler = args[1]
    await expect(errHandler({ response: { status: 500, data: { message: 'boom' } } })).rejects.toBeInstanceOf(ApiError)
  })

  it('response success handler returns the response as-is', () => {
    const responseUse = vi.fn()
    const mockClient = {
      get: vi.fn().mockResolvedValue({ data: { ok: true } }),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: responseUse }
      }
    }

  // instantiate to register
  new ApiService(undefined, undefined, mockClient as any)
    // responseUse was called and first arg is success handler
    const args = responseUse.mock.calls[0]
    const success = args[0]
    const out = success({ data: { a: 1 } })
    expect(out).toEqual({ data: { a: 1 } })
  })

  it('get throws ApiError when response has no message', async () => {
    const mockClient = {
      get: vi.fn().mockRejectedValue({ response: { status: 400, data: {} } }),
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } }
    }
    const service = new (ApiService as any)(undefined, undefined, mockClient as any)
    await expect(service.get('/nomsg')).rejects.toMatchObject({ message: 'API Error', status: 400 })
  })

  it('post throws ApiError with Unknown Error when rejection is empty object', async () => {
    const mockClient = {
      post: vi.fn().mockRejectedValue({}),
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } }
    }
    const service = new ApiService(undefined, undefined, mockClient as any)
    await expect(service.post('/x')).rejects.toBeInstanceOf(ApiError)
    await expect(service.post('/x')).rejects.toMatchObject({ message: 'Unknown Error' })
  })

  it('createApiService factory returns ApiService instance', () => {
    const s = createApiService(undefined, undefined, { interceptors: {} } as any)
    expect(s).toBeTruthy()
  })
})
