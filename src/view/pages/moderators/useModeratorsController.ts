import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { moderatorService } from '@app/app/services/moderatorService'
import { User } from '@app/app/entities'

export function useModeratorsController() {
  const PAGESIZE = 10

  const [isLoading, setIsLoading] = useState(false)
  const [isOpenModeratorFormModal, setIsOpenModeratorFormModal] = useState(false)
  const [moderatorList, setModeratorList] = useState<User[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchText, setSeachText] = useState('')

  async function getModerators(search?: string) {
    try {
      setModeratorList([])
      setIsLoading(true)

      const { value, error, message } = await moderatorService.get({
        page: currentPage,
        pageSize: PAGESIZE,
        search: search ?? searchText
      })

      if (error) {
        toast.error(message)
        return
      }

      setModeratorList(value.rows)
      setPageCount(Math.ceil(value.count / PAGESIZE))
    }
    finally {
      setIsLoading(false)
    }
  }

  async function deleteModerator(id: number) {
    try {
      if (!confirm('Deseja realmente deletar este moderador?')) return

      const { error, message } = await moderatorService.remove(id)

      if (error) {
        toast.error(message)
        return
      }

      toast.success('Moderador deletado com sucesso')
      handleModeratorFormSubmited()
    }
    catch (error) {
      toast.error('Ops! Erro ao deletar moderador')
    }
  }

  function onCloseModeratorForm() {
    setIsOpenModeratorFormModal(false)
  }

  function handleModeratorFormSubmited() {
    if (currentPage === 0) {
      getModerators()
      return
    }
    setCurrentPage(0)
  }

  function handleSearchForm(text: string) {
    setSeachText(text)

    if (text.length < 3 && text.length !== 0) return
    
    setCurrentPage(0)
    getModerators(text)
  }

  useEffect(() => {
    getModerators()
  }, [currentPage])

  return {
    moderatorList,
    isLoading,
    pageCount,
    deleteModerator,
    currentPage,
    setCurrentPage,
    onCloseModeratorForm,
    isOpenModeratorFormModal,
    setIsOpenModeratorFormModal,
    handleModeratorFormSubmited,
    handleSearchForm
  }
}