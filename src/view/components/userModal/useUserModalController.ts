import { Report } from '@app/app/entities'
import { reportService } from '@app/app/services/reportService'
import { userService } from '@app/app/services/userService'
import { TGetUsersDTO } from '@app/app/services/userService/getByNickname'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type TUseUserModalControllerParams = {
  user: TGetUsersDTO
  onClose: (hasChanges?: boolean) => void
}

export function useUserModalController({ user, onClose }: TUseUserModalControllerParams) {
  const PAGESIZE = 4

  const [isLoading, setIsLoading] = useState({
    reportList: false,
    userBanned: false
  })
  const [reportList, setReportList] = useState<Report[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  async function getUserReports() {
    try {
      setReportList([])
      setIsLoading(prev => ({ ...prev, reportList: true }))

      const { value, error, message } = await reportService.getByUser({
        page: currentPage,
        pageSize: PAGESIZE,
        userReportedId: user.id
      })

      if (error) {
        toast.error(message)
        return
      }

      setReportList(value.rows)
      setPageCount(Math.ceil(value.count / PAGESIZE))
    }
    finally {
      setIsLoading(prev => ({ ...prev, reportList: false }))
    }
  }

  async function handleBanOrUnbanUser() {
    try {
      if (!confirm('Confirmar ação?')) return

      setIsLoading(prev => ({...prev, userBanned: true }))

      const { error, message } = user.status === 'ACTIVE' 
        ? await userService.disable({ userId: user.id! })
        : await userService.enable({ userId: user.id! })
      
      if (error) {
        toast.error(message)
        return
      }
      
      toast.success(user.status === 'ACTIVE' 
        ? 'usuário desativado com sucesso' 
        : 'usuário reativado com sucesso')

      onClose(true)
    }
    finally {
      setIsLoading(prev => ({...prev, userBanned: false }))
    }
  }

  useEffect(() => { 
    if (user) getUserReports()
  }, [user, currentPage])

  return {
    reportList,
    isLoading,
    pageCount,
    setCurrentPage,
    handleBanOrUnbanUser
  }
}