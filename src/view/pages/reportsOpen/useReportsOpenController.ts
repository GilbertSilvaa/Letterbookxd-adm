import { Report } from '@app/app/entities'
import { reportService } from '@app/app/services/reportService'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export function useReportsOpenController() {
  const PAGESIZE = 10

  const [isLoading, setIsLoading] = useState(false)
  const [isOpenReportModal, setIsOpenReportModal] = useState(false)
  const [reportOpenList, setReportOpenList] = useState<Report[]>([])
  const [reportSelected, setReportSelected] = useState<Report>()
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  async function getReportsOpen() {
    try {
      setReportOpenList([])
      setIsLoading(true)
      
      const { error, value, message } = await reportService.getOpened({ 
        page: currentPage,  
        pageSize: PAGESIZE, 
        sort: 'asc' 
      })

      if (error) {
        toast.error(message)
        return
      }

      setReportOpenList(value.rows)
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
    getReportsOpen()
  }

  function refresh() {
    if (currentPage === 0) {
      getReportsOpen()
      return
    }

    setCurrentPage(0)
  }

  useEffect(() => {
    getReportsOpen()
  }, [currentPage])

  return {
    isLoading,
    handleSelectReport,
    setIsOpenReportModal,
    isOpenReportModal,
    reportOpenList,
    reportSelected,
    handleReportResolved,
    currentPage,
    setCurrentPage,
    pageCount,
    refresh
  }
}