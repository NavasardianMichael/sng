import { FC, lazy } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { usePrivateRouteLoader } from 'hooks/usePrivateRouteLoader'
import { PRIVATE_PAGES, PUBLIC_PAGES } from 'helpers/constants/pages'
import Loader from 'components/_shared/Loader/Loader'
import { ProtectedRoutes } from './ProtectedRoutes'
import { RoleDefinedRoute } from './RoleDefinedRoute'
import RouterErrorElement from './RouterErrorElement'
import RoutesContainer from './RoutesContainer'
import { WithSuspense } from './WithSuspense'

export const PostsPage = WithSuspense(lazy(() => import('pages/posts')))
export const PostPage = WithSuspense(lazy(() => import('pages/post')))
export const RegistrationPage = WithSuspense(lazy(() => import('pages/auth/registration')))
export const LoginPage = WithSuspense(lazy(() => import('pages/auth/login')))
export const ConfirmationPage = WithSuspense(lazy(() => import('pages/auth/confirmation')))
export const EmailVerificationPage = WithSuspense(lazy(() => import('pages/auth/emailVerification')))
export const ForgotPasswordPage = WithSuspense(lazy(() => import('pages/auth/forgotPassword')))
export const ChangePasswordPage = WithSuspense(lazy(() => import('pages/auth/changePassword')))
export const ResetPasswordPage = WithSuspense(lazy(() => import('pages/auth/resetPassword')))
export const HomePage = WithSuspense(lazy(() => import('pages/auth/home')))
export const InvitationPage = (
  <RoleDefinedRoute>{WithSuspense(lazy(() => import('pages/auth/invitation')))}</RoleDefinedRoute>
)
export const InvitationConfirmedPage = (
  <RoleDefinedRoute>{WithSuspense(lazy(() => import('pages/auth/invitationConfirm')))}</RoleDefinedRoute>
)

const Router: FC = () => {
  const loader = usePrivateRouteLoader()

  const router = createBrowserRouter([
    {
      element: <RoutesContainer />,
      errorElement: <RouterErrorElement />,
      children: [
        {
          path: PUBLIC_PAGES.posts,
          element: PostsPage,
        },
        {
          path: PUBLIC_PAGES.post,
          element: PostPage,
        },
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
