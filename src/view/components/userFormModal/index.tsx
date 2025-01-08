import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { User } from '@app/app/entities'
import { useUserFormModalController } from './useUserFormModalController'

type TUserFormModalProps = {
  data?: User
  isOpen: boolean,
  onClose: () => void
  onFormSubmited: () => void
}

export function UserFormModal({ data, isOpen, onClose, onFormSubmited }: TUserFormModalProps) {
  const { 
    isSubmitLoading, 
    onSubmit,
    setFormValue
  } = useUserFormModalController({ onClose, onFormSubmited })

  return (
    <Modal
      size="2xl"
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onClose}
      isDismissable={false}
      classNames={{
        backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20'
      }}>
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>{data ? 'Editar' : 'Cadastrar'} Moderador</ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="usuario@email.com"
              variant="faded"
              label="Email"
              labelPlacement="outside"
              onChange={e => setFormValue('email', e.target.value)}
              isRequired
              required />

            <Input
              type="text"
              placeholder="@moderador"
              variant="faded"
              label="Nickname"
              labelPlacement="outside"
              onChange={e => setFormValue('nickname', e.target.value)}
              isRequired
              required />

            <Input
              type="text"
              placeholder="informe o nome"
              variant="faded"
              label="Nome"
              labelPlacement="outside"
              onChange={e => setFormValue('name', e.target.value)}
              isRequired
              required />

            <Input
              type="password"
              placeholder="informe a senha"
              variant="faded"
              label="Senha"
              labelPlacement="outside"
              onChange={e => setFormValue('password', e.target.value)}
              isRequired
              required />
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              isLoading={isSubmitLoading}>
              {data ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}