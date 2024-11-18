import { FC, useEffect, useMemo } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { message } from 'antd'

const RouterErrorElement: FC = () => {
  const error: ReturnType<typeof useRouteError> = useRouteError()
  const [messageApi, contextHolder] = message.useMessage()

  const errorMessage = useMemo(() => {
    if (isRouteErrorResponse(error)) return `${error.status} ${error.statusText}`
    if (error instanceof Error) return error.message
    if (typeof error === 'string') return error
    return 'Unknown error'
  }, [error])

  useEffect(() => {
    if (!errorMessage) return
    messageApi.open({
      type: 'error',
      content: errorMessage,
    })
  }, [errorMessage, messageApi])

  return <>{contextHolder}</>
}

export default RouterErrorElement
