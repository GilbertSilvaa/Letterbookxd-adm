import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { userService } from '@app/app/services/userService'
import { User } from '@app/app/entities'

export function useUsersController() {
  const PAGESIZE = 10

  const [isLoading, setIsLoading] = useState(false)
  const [isOpenUserFormModal, setIsOpenUserFormModal] = useState(false)
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

  async function deleteUser(id: number) {
    try {
      if (!confirm('Deseja realmente deletar este usuário?')) return

      const { error, message } = await userService.remove(id)

      if (error) {
        toast.error(message)
        return
      }

      toast.success('Usuário deletado com sucesso')
      handleUserFormSubmited()
    }
    catch (error) {
      toast.error('Ops! Erro ao deletar usuário')
    }
  }

  function onCloseUserForm() {
    setIsOpenUserFormModal(false)
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
    userList,
    isLoading,
    pageCount,
    deleteUser,
    currentPage,
    setCurrentPage,
    onCloseUserForm,
    isOpenUserFormModal,
    setIsOpenUserFormModal,
    handleUserFormSubmited,
  }
}