import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Report } from '@app/app/entities'
import { reportService } from '@app/app/services/reportService'

export function useReportsOpenController() {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenReportModal, setIsOpenReportModal] = useState(false)
  const [reportOpenList, setReportOpenList] = useState<Report[]>([])
  const [reportSelected, setReportSelected] = useState<Report>()

  async function getReportsOpen() {
    setIsLoading(true)

    try {
      const { error, value, message } = await reportService.getOpened({ 
        page: 0, 
        pageSize: 10, 
        sort: 'asc' 
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

  function handleSelectReport(report: Report) {
    setReportSelected(report)
    setIsOpenReportModal(true)
  }
  
  function handleReportResolved(reportId: number) {
    console.debug(reportId)
    getReportsOpen()
  }

  useEffect(() => {
    getReportsOpen()
  }, [])

  return {
    isLoading,
    handleSelectReport,
    setIsOpenReportModal,
    isOpenReportModal,
    reportOpenList,
    reportSelected,
    handleReportResolved
  }
}