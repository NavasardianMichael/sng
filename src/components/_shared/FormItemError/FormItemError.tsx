import { FC } from 'react'
import { Typography } from 'antd'

type Props = {
  message?: string
}

const FormItemError: FC<Props> = ({ message }) => {
  if (!message) return null

  return <Typography.Paragraph style={{ marginTop: 5, color: '#ff4d4f' }}>{message}</Typography.Paragraph>
}

export default FormItemError
