import {get, post, remove} from 'sr/utils/axios/index'
import {ProgramFilters, ProgramApiResponse} from './programInterfaces'

const filterPayload = (payload: ProgramFilters) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchPrograms = async (payload: ProgramFilters): Promise<ProgramApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<ProgramApiResponse>('/program', filteredPayload)

    if (res && res.status === 'success') {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch programs: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

export const CreatePrograms = async (payload: any): Promise<ProgramApiResponse> => {
  try {
    const res = await post<ProgramApiResponse>('/program', payload)

    if (res && res.status === 'success') {
      return res // Return the fetched data
    } else {
      throw new Error('Creation failed')
    }
  } catch (error) {
    throw new Error(
      `Failed to create program: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

export const DeletePrograms = async (payload: string): Promise<any> => {
  try {
    const res = await remove<any>(`/program/${payload}`)

    if (res && res.status === 'success') {
      return res // Return the fetched data
    } else {
      throw new Error('Not able to delete')
    }
  } catch (error) {
    throw new Error(
      `Failed to delete program: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}
