import type { DummyUsersResponse, UsersResponse } from '~~/shared/types/user'

export default defineEventHandler(async (event): Promise<UsersResponse> => {
  const {q, limit, skip, sortBy, order} = getQuery(event)

  const url = q ? 'https://dummyjson.com/users/search' : 'https://dummyjson.com/users'
  
  const apiSortBy = sortBy === 'fullName' ? 'firstName' : sortBy

  const raw = await $fetch<DummyUsersResponse>(url, {
    query: {
      q,
      limit,
      skip,
      sortBy: apiSortBy,
      order,
    }
  })

  const users = raw.users.map((u) => ({
    id: u.id,
    fullName: `${u.firstName} ${u.lastName}`,
    email: u.email,
    age: u.age
  }))

  return {
    users,
    total: raw.total
  }
})
