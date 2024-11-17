import { FC } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { selectErrorMessage } from 'store/selectors'
import { resetErrorMessage } from 'store/slice'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'

const FloatingError: FC = () => {
  const dispatch = useAppDispatch()
  const errorMessage = useAppSelector(selectErrorMessage)

  const resetError = () => dispatch(resetErrorMessage())

  return (
    <Snackbar open={!!errorMessage} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={resetError}>
      <Alert severity="error" variant="filled">
        {errorMessage}
      </Alert>
    </Snackbar>
  )
}

export default FloatingError
