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

const FILTERS = [
  '#',
  'usuário'
]

export function ReportsOpen() {
  const { isOpenReportModal, setIsOpenReportModal } = useReportsOpenController()

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
        <TableRow key="1">
          <TableCell>09090</TableCell>
          <TableCell>Tony Reichert</TableCell>
          <TableCell>CEO</TableCell>
          <TableCell>Fall Hart</TableCell>
          <TableCell>12/10/2024</TableCell>
          <TableCell>
            <button className="text-[1rem]" onClick={() => setIsOpenReportModal(true)}>
              <LuSearchCheck/>
            </button>
          </TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>09090</TableCell>
          <TableCell>Zoey Lang</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Fall Hart</TableCell>
          <TableCell>12/10/2024</TableCell>
          <TableCell>
            <button className="text-[1rem]" onClick={() => setIsOpenReportModal(true)}>
              <LuSearchCheck/>
            </button>
          </TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>09090</TableCell>
          <TableCell>Jane Fisher</TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>Fall Hart</TableCell>
          <TableCell>12/10/2024</TableCell>
          <TableCell>
            <button className="text-[1rem]" onClick={() => setIsOpenReportModal(true)}>
              <LuSearchCheck/>
            </button>
          </TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>09090</TableCell>
          <TableCell>William Howard</TableCell>
          <TableCell>Community Manager</TableCell>
          <TableCell>Fall Hart</TableCell>
          <TableCell>12/10/2024</TableCell>
          <TableCell>
            <button className="text-[1rem]" onClick={() => setIsOpenReportModal(true)}>
              <LuSearchCheck/>
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
      </Table>

      <ReportModal 
        isOpen={isOpenReportModal} 
        onClose={() => setIsOpenReportModal(false)}/>
    </div>
  )
}