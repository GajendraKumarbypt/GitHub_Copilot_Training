import { describe, it, expect, vi } from 'vitest'
import { ApiError, ApiService } from '../../src/services/apiService'
import axios from 'axios'

describe('apiService branch coverage', () => {
  it('constructor tolerates interceptors that are not functions', () => {
    const mockClient = {
      get: vi.fn().mockResolvedValue({ data: { ok: true } }),
      interceptors: {
        request: { use: true },
        response: { use: true }
      }
    }

    // Should not throw when interceptors.use are not functions
    const s = new ApiService(undefined, undefined, mockClient as any)
    return expect(s.get('/ok')).resolves.toEqual({ ok: true })
  })

  it('response error handler with undefined triggers Network Error ApiError', async () => {
    const responseUse = vi.fn()
    const mockClient = {
      get: vi.fn().mockResolvedValue({ data: { ok: true } }),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: responseUse }
      }
    }

    new ApiService(undefined, undefined, mockClient as any)
    const args = responseUse.mock.calls[0]
    const errHandler = args[1]
    await expect(errHandler(undefined)).rejects.toBeInstanceOf(ApiError)
    await expect(errHandler(undefined)).rejects.toMatchObject({ message: 'Network Error' })
  })

  it('post rethrows Error instances (not wrapped)', async () => {
    const mockClient = {
      post: vi.fn().mockRejectedValue(new Error('post fail')),
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } }
    }
    const s = new ApiService(undefined, undefined, mockClient as any)
    await expect(s.post('/x', {})).rejects.toThrow('post fail')
  })

  it('request interceptor function can be invoked and returns config', () => {
    const requestUse = vi.fn()
    const mockClient = {
      get: vi.fn().mockResolvedValue({ data: { ok: true } }),
      interceptors: {
        request: { use: requestUse },
        response: { use: vi.fn() }
      }
    }

    new ApiService(undefined, undefined, mockClient as any)
    expect(requestUse).toHaveBeenCalled()
    const args = requestUse.mock.calls[0]
    const cfgFn = args[0]
    const cfg = { headers: { authorization: 'x' } }
    const out = cfgFn(cfg)
    expect(out).toBe(cfg)
  })

  it('uses axios.create when client not provided', async () => {
    const mockClient = {
      get: vi.fn().mockResolvedValue({ data: { hello: true } }),
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } }
    }
    const orig = axios.create as any
    ;(axios.create as any) = vi.fn().mockReturnValue(mockClient)
    const s = new ApiService()
    const res = await s.get('/h')
    expect(res).toEqual({ hello: true })
    ;(axios.create as any) = orig
  })

  it('get throws ApiError when response contains message', async () => {
    const mockClient = {
      get: vi.fn().mockRejectedValue({ response: { status: 422, data: { message: 'bad data' } } }),
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } }
    }
    const s = new ApiService(undefined, undefined, mockClient as any)
    await expect(s.get('/bad')).rejects.toMatchObject({ message: 'bad data', status: 422 })
  })

  it('post throws ApiError when response contains message', async () => {
    const mockClient = {
      post: vi.fn().mockRejectedValue({ response: { status: 500, data: { message: 'server' } } }),
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } }
    }
    const s = new ApiService(undefined, undefined, mockClient as any)
    await expect(s.post('/bad', {})).rejects.toMatchObject({ message: 'server', status: 500 })
  })
})
