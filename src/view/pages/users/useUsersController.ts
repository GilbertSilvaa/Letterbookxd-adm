import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { userService } from '@app/app/services/userService'
import { User } from '@app/app/entities'

export function useUsersController() {
  const PAGESIZE = 10

  const [isLoading, setIsLoading] = useState(false)
  const [isOpenUserFormModal, setIsOpenUserFormModal] = useState(false)
  const [userList, setUserList] = useState<User[]>([])
  const [userSelected, setUserSelected] = useState<User>()
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

  function onOPenEditForm(user: User) {
    setUserSelected(user)
    setIsOpenUserFormModal(true)
  }

  function handleUserFormSubmited() {
    if (currentPage === 0) {
      getUsers()
      return
    }
    setCurrentPage(0)
  }

  useEffect(() => {
    getUsers()
  }, [currentPage])

  return {
    isLoading,
    pageCount,
    currentPage,
    setCurrentPage,
    isOpenUserFormModal,
    setIsOpenUserFormModal,
    userList,
    userSelected,
    onOPenEditForm,
    handleUserFormSubmited
  }
}