import { Report } from '@app/app/entities'
import { reportService } from '@app/app/services/reportService'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export function useReportsOpenController() {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenReportModal, setIsOpenReportModal] = useState(false)
  const [reportOpenList, setReportOpenList] = useState<Report[]>([])

  async function getReportsOpen() {
    setIsLoading(true)

    try {
      const { error, value, message } = await reportService.getOpened({ 
        page: 0, 
        pageSize: 10, 
        sort: 'desc' 
      })

      if (error) {
        toast.error(message)
        return
      }

      setReportOpenList(value.rows)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getReportsOpen()
  }, [])

  return {
    isLoading,
    setIsOpenReportModal,
    isOpenReportModal,
    reportOpenList
  }
}