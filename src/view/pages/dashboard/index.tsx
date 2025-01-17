import { MdOutlineReportGmailerrorred } from 'react-icons/md'

export function DashBoardPage() {
  return (
    <div className="w-full">

      <div className="w-full flex gap-5">
        
        <div className="w-[25%] h-[185px] bg-[#17171a] rounded-md p-5 flex flex-col justify-between">
          <div className="flex gap-5 items-center">
            <div className="w-[60px] h-[60px] rounded-full bg-orange-600 flex justify-center items-center text-[36px]">
              <MdOutlineReportGmailerrorred />
            </div>
            <span className="text-[20px] font-semibold">Denúncias em Aberto</span>
          </div>
          <span className="text-[36px] font-semibold">5590</span>
        </div>

        <div className="w-[25%] h-[185px] bg-[#17171a] rounded-md p-5 flex flex-col justify-between">
          <div className="flex gap-5 items-center">
            <div className="w-[60px] h-[60px] rounded-full bg-orange-600 flex justify-center items-center text-[36px]">
              <MdOutlineReportGmailerrorred />
            </div>
            <span className="text-[20px] font-semibold">Denúncias em Aberto</span>
          </div>
          <span className="text-[36px] font-semibold">5590</span>
        </div>

        <div className="w-[25%] h-[185px] bg-[#17171a] rounded-md p-5 flex flex-col justify-between">
          <div className="flex gap-5 items-center">
            <div className="w-[60px] h-[60px] rounded-full bg-orange-600 flex justify-center items-center text-[36px]">
              <MdOutlineReportGmailerrorred />
            </div>
            <span className="text-[20px] font-semibold">Denúncias em Aberto</span>
          </div>
          <span className="text-[36px] font-semibold">5590</span>
        </div>
      </div>

    </div>
  )
}