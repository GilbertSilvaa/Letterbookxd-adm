import { userService } from '@app/app/services/userService'
import { TGetUsersDTO } from '@app/app/services/userService/getByNickname'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export function useUsersController() {
  const PAGESIZE = 10

  const [isLoading, setIsLoading] = useState(false)
  const [userList, setUserList] = useState<TGetUsersDTO[]>([])
  const [userSelected, setUserSelected] = useState<TGetUsersDTO>()
  const [isOpenUserModal, setIsOpenUserModal] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchText, setSeachText] = useState('')

  async function getUsers(search?: string) {
    try {
      setUserList([])
      setIsLoading(true)

      const { value, error, message } = await userService.getByNickname({
        page: currentPage,
        pageSize: PAGESIZE,
        search: search ?? searchText
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
  
  function handleSearchForm(text: string) {
    setSeachText(text)

    if (text.length < 3 && text.length !== 0) return
    
    setCurrentPage(0)
    getUsers(text)
  }

  function handleSelectUser(user: TGetUsersDTO) {
    setUserSelected(user)
    setIsOpenUserModal(true)
  }

  function handleCloseModal(hasChanges?: boolean) {
    setIsOpenUserModal(false)
    if (hasChanges) getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [currentPage])

  return {
    userList,
    isLoading,
    pageCount,
    handleSearchForm,
    currentPage,
    setCurrentPage,
    isOpenUserModal,
    userSelected,
    handleSelectUser,
    handleCloseModal
  }
}