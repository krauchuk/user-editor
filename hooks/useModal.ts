import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAllModalData } from '@/store/modals/selectors'
import { State, changeModalVisibility } from '@/store/modals/slice'

type Params<T> = {
  name: keyof State
  metadata?: T
}

const useModal = <T>({ name, metadata }: Params<T>) => {
  const dispatch = useAppDispatch()
  const modalData = useAppSelector(getAllModalData)

  return {
    setVisibility: (value: boolean, metadata?: T) =>
      dispatch(changeModalVisibility({ modal: name, isVisible: value, metadata: metadata || {} })),
    isVisible: modalData[name].isVisible,
    metadata: modalData[name].metadata as T,
  }
}

export default useModal
