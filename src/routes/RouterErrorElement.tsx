import { FC, useMemo } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { Alert, AlertTitle, Typography } from '@mui/material'

const RouterErrorElement: FC = () => {
  const error: ReturnType<typeof useRouteError> = useRouteError()

  const errorMessage = useMemo(() => {
    if (isRouteErrorResponse(error)) return `${error.status} ${error.statusText}`
    if (error instanceof Error) return error.message
    if (typeof error === 'string') return error
    return 'Unknown error'
  }, [error])

  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      <Typography>{errorMessage}</Typography>
    </Alert>
  )
}

export default RouterErrorElement
