import { BarChart } from '@app/view/components/barChart'
import { Spinner } from '@nextui-org/react'
import { useDashboardController } from './useDashboardController'

export function DashBoardPage() {
  const { cards, isLoading } = useDashboardController()

  return (
    <div className="w-full">

      <div className="w-full flex gap-5">
        {cards.map(({ icon: Icon, title, value }) => (
          <div className="w-[25%] h-[185px] bg-[#17171a] rounded-md p-5 flex flex-col justify-between">
            <div className="flex gap-5 items-center">
              <div className="w-[60px] h-[60px] rounded-full bg-orange-600 flex justify-center items-center text-[36px]">
                <Icon/>
              </div>
              <span className="text-[20px] font-semibold max-w-[65%]">{ title }</span>
            </div>

            {isLoading 
              ? <Spinner/>
              : <span className="text-[36px] font-semibold">{ value }</span>
            }
          </div>
        ))}
      </div>

      <div className="w-[75%] mt-8">
        <BarChart 
          title="Denúncias"
          labels={cards.map(card => card.title)} 
          dataValues={cards.map(card => card.value)} 
          barColors={['#fc8932de', '#fa7916cd', '#ff6f00d2']}/>
      </div>
    </div>
  )
}