import { dashboardService } from '@app/app/services/dashboardService'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { HiMiniCheckBadge } from 'react-icons/hi2'
import { MdOutlineReportGmailerrorred } from 'react-icons/md'
import { TiInputChecked } from 'react-icons/ti'

export function useDashboardController() {
  const [isLoading, setIsLoading] = useState(false)
  const [cards, setCards] = useState([
    { title: 'Denúncias em Aberto', value: 0, icon: MdOutlineReportGmailerrorred },
    { title: 'Denúncias Resolvidas', value: 0, icon: TiInputChecked },
    { title: 'Denúncias Aprovadas', value: 0, icon: HiMiniCheckBadge }
  ])

  async function getDashboardData() {
    try {
      setIsLoading(true)

      const { value, error, message } = await dashboardService.getData()

      if (error) {
        toast.error(message)
        return
      }

      setCards([
        { title: 'Denúncias em Aberto', value: value.openedReport!, icon: MdOutlineReportGmailerrorred },
        { title: 'Denúncias Resolvidas', value: value.reportsResolvedByMod!, icon: TiInputChecked },
        { title: 'Denúncias Aprovadas', value: value.reportsAcceptedByMod!, icon: HiMiniCheckBadge }
      ])
    }
    catch (error) {
      toast.error(error as string)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return {
    cards,
    isLoading
  }
}