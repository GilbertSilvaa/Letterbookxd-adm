import { Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useUsersController } from './useUsersController'
import { FaSearch } from 'react-icons/fa'
import { LuSearch } from 'react-icons/lu'

const COLLUNS = [
  'USUÁRIO',
  'EMAIL',
  'QTDE REVIEWS',
  'QTDE DENÚNCIAS ENVIADAS',
  'QTDE DENÚNCIAS APROVADAS',
  'QTDE DENÚNCIAS RECEBIDAS',
  ''
]

const FILTERS = ['usuário']

export function UsersPage() {

  const {
    isLoading,
    userList,
    pageCount,
    setCurrentPage,
    handleSearchForm
  } = useUsersController()

  return (
    <div>
      <h1 className="text-[20px] font-semibold mb-6">Usuários</h1>

      <div className="w-full flex justify-between items-center mb-4">
        <div className="flex gap-2 w-full">
          <Select
            className="w-full sm:w-[10%]"
            disableSelectorIconRotation
            defaultSelectedKeys={"0"}>
            {FILTERS.map((filter, index) => (<SelectItem key={index}>{filter}</SelectItem>))}
          </Select>

          <Input
            isClearable
            className="w-full sm:max-w-[30%]"
            placeholder="Digite aqui..."
            startContent={<FaSearch />}
            onChange={e => handleSearchForm(e.target.value)} />
        </div>
      </div>

      <Table>
        <TableHeader>
          {COLLUNS.map((coll, index) => <TableColumn key={index}>{coll}</TableColumn>)}
        </TableHeader>
        <TableBody
          emptyContent="Sem registros"
          isLoading={isLoading}
          loadingContent={<Spinner label="Carregando..." />}>
          {userList.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.nickname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.reviewsCount}</TableCell>
              <TableCell>{user.reportsDoneCount}</TableCell>
              <TableCell>{user.successfulReportsCount}</TableCell>
              <TableCell>{user.reportsReceivedCount}</TableCell>
              <TableCell>
                <button className="text-[1rem]" onClick={() => { }}>
                  <LuSearch />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {pageCount > 1 &&
        <div className="flex justify-center items-center mt-2">
          <Pagination
            isCompact
            initialPage={1}
            total={pageCount}
            onChange={page => setCurrentPage(page - 1)} />
        </div>
      }
    </div>
  )
}