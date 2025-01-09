import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Report } from '@app/app/entities'
import { reportService } from '@app/app/services/reportService'

export function useReportsCloseController() {
  const PAGESIZE = 10

  const [isLoading, setIsLoading] = useState(false)
  const [isOpenReportModal, setIsOpenReportModal] = useState(false)
  const [reportClosedList, setReportClosedList] = useState<Report[]>([])
  const [reportSelected, setReportSelected] = useState<Report>()
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  async function getReportsClosed() {
    try {
      setReportClosedList([])
      setIsLoading(true)

      const { error, value, message } = await reportService.getClosed({
        page: currentPage,
        pageSize: PAGESIZE
      })

      if (error) {
        toast.error(message)
        return
      }

      setReportClosedList(value.rows)
      setPageCount(Math.ceil(value.count / PAGESIZE))
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

  function refresh() {
    if (currentPage === 0) {
      getReportsClosed()
      return
    }

    setCurrentPage(0)
  }

  useEffect(() => {
    getReportsClosed()
  }, [currentPage])

  return {
    isLoading,
    reportClosedList,
    setIsOpenReportModal,
    isOpenReportModal,
    reportSelected,
    handleSelectReport,
    handleReportResolved,
    currentPage,
    setCurrentPage,
    pageCount,
    refresh
  }
}