import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Report } from '@app/app/entities'
import { reportService } from '@app/app/services/reportService'

export function useReportsCloseController() {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenReportModal, setIsOpenReportModal] = useState(false)
  const [reportClosedList, setReportClosedList] = useState<Report[]>([])
  const [reportSelected, setReportSelected] = useState<Report>()

  async function getReportsClosed() {
    try {
      setIsLoading(true)

      const { error, value, message } = await reportService.getClosed({
        page: 0,
        pageSize: 15
      })

      if (error) {
        toast.error(message)
        return
      }

      setReportClosedList(value.rows)
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
    getReportsClosed()
  }

  useEffect(() => {
    getReportsClosed()
  }, [])

  return {
    isLoading,
    reportClosedList,
    setIsOpenReportModal,
    isOpenReportModal,
    reportSelected,
    handleSelectReport,
    handleReportResolved
  }
}