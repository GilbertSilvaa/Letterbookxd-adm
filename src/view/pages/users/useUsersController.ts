import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { userService } from '@app/app/services/userService'
import { User } from '@app/app/entities'

export function useUsersController() {
  const PAGESIZE = 10

  const [isLoading, setIsLoading] = useState(false)
  const [userList, setUserList] = useState<User[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  async function getUsers() {
    try {
      setUserList([])
      setIsLoading(true)

      const { value, error, message } = await userService.get({
        page: currentPage,
        pageSize: PAGESIZE
      })

      if (error) {
        toast.error(message)
        return
      }

      setUserList(value.rows)
      setPageCount(Math.ceil(value.count / PAGESIZE))
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [currentPage])

  return {
    isLoading,
    pageCount,
    currentPage,
    setCurrentPage,
    userList
  }
}