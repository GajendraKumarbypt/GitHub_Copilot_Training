import { describe, it, expect, vi } from 'vitest'
vi.mock('axios')
import axios from 'axios'
import { ApiError, default as _api, ApiService } from '../../src/services/apiService'

describe('apiService', () => {
  it('returns data on get', async () => {
    const mockClient = {
      get: vi.fn().mockResolvedValue({ data: { ok: true } }),
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } }
    }

    const service = new ApiService(undefined, undefined, mockClient as any)
    const data = await service.get('/test')
    expect(data).toEqual({ ok: true })
  })

  it('throws ApiError on failed response', async () => {
    const mock = { get: vi.fn().mockRejectedValue({ response: { status: 400, data: { message: 'Bad' } } }), interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } } }

    const service = new ApiService(undefined, undefined, mock as any)
    await expect(service.get('/bad')).rejects.toBeInstanceOf(ApiError)
  })

  it('post returns data on success', async () => {
    const mockClient = {
      post: vi.fn().mockResolvedValue({ data: { created: true } }),
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } }
    }
    const service = new ApiService(undefined, undefined, mockClient as any)
    const data = await service.post('/create', { name: 'x' })
    expect(data).toEqual({ created: true })
  })

  it('post throws ApiError on bad response', async () => {
    const mock = { post: vi.fn().mockRejectedValue({ response: { status: 500, data: { message: 'Server' } } }), interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } } }
    const service = new ApiService(undefined, undefined, mock as any)
    await expect(service.post('/err', {})).rejects.toBeInstanceOf(ApiError)
  })
})
