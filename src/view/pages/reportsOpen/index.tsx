import { ReportModal } from '@app/view/components/reportModal'
import { Input, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { FaSearch } from 'react-icons/fa'
import { LuSearchCheck } from 'react-icons/lu'
import { useReportsOpenController } from './useReportsOpenController'

const COLLUNS = [
  '#',
  'USUÁRIO',
  'DENÚNCIA',
  'USUÁRIO ACUSADO',
  'CRIADO EM',
  ''
]

const FILTERS = ['#', 'usuário']

export function ReportsOpen() {
  const { 
    isOpenReportModal, 
    setIsOpenReportModal,
    reportOpenList
  } = useReportsOpenController()

  return (
    <div>
      <h1 className="text-[20px] font-semibold mb-6">Denúncias em Aberto</h1>

      <div className="w-full flex items-center gap-4 mb-4">
        <Select
          className="w-full sm:w-[10%]"
          disableSelectorIconRotation
          defaultSelectedKeys={"0"}
        >
          {FILTERS.map((filter, index) => (
            <SelectItem key={index}>
              {filter}
            </SelectItem>
          ))}
        </Select>

        <Input
          isClearable
          className="w-full sm:max-w-[30%]"
          placeholder="Digite aqui..."
          startContent={<FaSearch />}
        />
      </div>

      <Table>
        <TableHeader>
          {COLLUNS.map((coll, index) => <TableColumn key={index}>{coll}</TableColumn>)}
        </TableHeader>

        <TableBody>
          {reportOpenList.map((report, index) => (
            <TableRow key={index}>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.user.nickname}</TableCell>
              <TableCell className="max-w-[300px]">
                <span className="line-clamp-2">{report.reason}</span> 
              </TableCell>
              <TableCell>{report.review.user.nickname}</TableCell>
              <TableCell>{new Date(report.creationDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <button className="text-[1rem]" onClick={() => setIsOpenReportModal(true)}>
                  <LuSearchCheck/>
                </button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      </Table>

      <ReportModal 
        isOpen={isOpenReportModal} 
        onClose={() => setIsOpenReportModal(false)}/>
    </div>
  )
}