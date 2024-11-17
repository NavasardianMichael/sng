import { FC } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { PRIVATE_PAGES, PUBLIC_PAGES } from 'constants/pages'
import { usePrivateRouteLoader } from 'hooks/usePrivateRouteLoader'
import Loader from 'components/Loader/Loader'
import {
  ChangePasswordPage,
  ConfirmationPage,
  EmailVerificationPage,
  ForgotPasswordPage,
  HomePage,
  InvitationConfirmedPage,
  InvitationPage,
  LoginPage,
  RegistrationPage,
  ResetPasswordPage,
} from './Pages'
import { ProtectedRoutes } from './ProtectedRoutes'
import RouterErrorElement from './RouterErrorElement'
import RoutesContainer from './RoutesContainer'

const Router: FC = () => {
  const loader = usePrivateRouteLoader()

  const router = createBrowserRouter([
    {
      element: <RoutesContainer />,
      errorElement: <RouterErrorElement />,
      children: [
        {
          path: PUBLIC_PAGES.login,
          element: LoginPage,
        },
        {
          path: PUBLIC_PAGES.registration,
          element: RegistrationPage,
        },
        {
          path: PUBLIC_PAGES.confirmation,
          element: ConfirmationPage,
        },
        {
          path: PUBLIC_PAGES.emailVerification,
          element: EmailVerificationPage,
        },
        {
          path: PUBLIC_PAGES.changePassword,
          element: ChangePasswordPage,
        },
        {
          path: PUBLIC_PAGES.forgotPassword,
          element: ForgotPasswordPage,
        },
        {
          path: PUBLIC_PAGES.resetPassword,
          element: ResetPasswordPage,
        },
        {
          loader,
          element: <ProtectedRoutes />,
          children: [
            {
              path: PRIVATE_PAGES.home,
              element: HomePage,
            },
            {
              path: PRIVATE_PAGES.invitation,
              element: InvitationPage,
            },
            {
              path: PRIVATE_PAGES.invitationConfirm,
              element: InvitationConfirmedPage,
            },
          ],
        },
        { path: '*', element: <Navigate to={PRIVATE_PAGES.home} /> },
      ],
    },
  ])

  return <RouterProvider fallbackElement={<Loader />} router={router} />
}

export default Router
