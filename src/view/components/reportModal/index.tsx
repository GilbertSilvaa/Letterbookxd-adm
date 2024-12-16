import { Report } from '@app/app/entities'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { useReportModalController } from './useReportModalController'
import { EReportStatus } from '@app/app/enums'

type TReportModalProps = {
  data?: Report
  isOpen: boolean,
  onClose: () => void
  onResolved: (id: number) => void
}

export function ReportModal({ data, isOpen, onClose, onResolved }: TReportModalProps) {
  const { 
    onSubmit,
    isSubmitLoading
  } = useReportModalController({ onClose, onResolved })

  return (
    <Modal 
      size="2xl"
      backdrop="opaque" 
      isOpen={isOpen} 
      onOpenChange={onClose}
      isDismissable={false}
      classNames={{
        backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20'
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1"># { data?.id }</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <strong>Denúncia (@{data?.user.nickname}): </strong>
                  <p className="ml-3 text-[#bbb]">{ data?.reason }</p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <strong>Comentário (@{data?.review.user.nickname}): </strong>
                  <p className="ml-3 text-[#bbb]">{ data?.originalComment }</p>
                </div>

                <span className="text-[#bbb] ml-3">criada em {new Date(data?.creationDate!).toLocaleDateString()}</span>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button 
                color="default" 
                variant="flat" 
                isLoading={isSubmitLoading}
                onPress={() => onSubmit({ reportId: data?.id!, status: EReportStatus.DENIED })}>
                Rejeitar
              </Button>
              <Button 
                color="primary" 
                isLoading={isSubmitLoading}
                onPress={() => onSubmit({ reportId: data?.id!, status: EReportStatus.ACCEPTED })}>
                Aceitar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}