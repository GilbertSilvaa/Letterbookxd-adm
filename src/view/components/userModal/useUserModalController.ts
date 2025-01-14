import { Report } from '@app/app/entities'
import { useEffect, useState } from 'react'

type TUseUserModalControllerParams = {
  reportList: Report[]
  onClose: () => void
}

export function useUserModalController({ onClose, reportList }: TUseUserModalControllerParams) {
  const [reports, setReports] = useState<Report[]>(reportList)

  function handleCloseModal() {
    setReports([])
    onClose()
  }

  useEffect(() => { 
    setReports(reportList)
  }, [reportList])

  return {
    reports,
    handleCloseModal
  }
}