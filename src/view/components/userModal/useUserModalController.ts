import { Report } from '@app/app/entities'
import { reportService } from '@app/app/services/reportService'
import { TGetUsersDTO } from '@app/app/services/userService/getByNickname'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type TUseUserModalControllerParams = {
  user: TGetUsersDTO
}

export function useUserModalController({ user }: TUseUserModalControllerParams) {
  const PAGESIZE = 8

  const [isLoading, setIsLoading] = useState(false)
  const [reportList, setReportList] = useState<Report[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  async function getUserReports() {
    try {
      setReportList([])
      setIsLoading(true)

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
      setIsLoading(false)
    }
  }

  useEffect(() => { 
    if (!!user) getUserReports()
  }, [user, currentPage])

  return {
    reportList,
    isLoading,
    pageCount,
    setCurrentPage
  }
}