import { FC, useCallback, useEffect } from 'react'
import { Button, message } from 'antd'
import { selectErrorMessage } from 'store/profile/selectors'
import { resetErrorMessage } from 'store/profile/slice'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'

const FloatingError: FC = () => {
  const dispatch = useAppDispatch()
  const errorMessage = useAppSelector(selectErrorMessage)
  const [messageApi, contextHolder] = message.useMessage()

  const resetError = useCallback(() => dispatch(resetErrorMessage()), [dispatch])

  useEffect(() => {
    if (errorMessage) {
      messageApi.open({
        type: 'error',
        content: errorMessage,
      })
    } else {
      resetError()
    }
  }, [errorMessage, messageApi, resetError])

  return (
    <>
      {contextHolder}
      <Button onClick={resetError}>&#x2715;</Button>
    </>
  )
}

export default FloatingError
