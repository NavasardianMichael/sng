import { lazy } from 'react'
import { RoleDefinedRoute } from './RoleDefinedRoute'
import { WithSuspense } from './WithSuspense'

export const RegistrationPage = WithSuspense(lazy(() => import('pages/registration')))
export const LoginPage = WithSuspense(lazy(() => import('pages/login')))
export const ConfirmationPage = WithSuspense(lazy(() => import('pages/confirmation')))
export const EmailVerificationPage = WithSuspense(lazy(() => import('pages/emailVerification')))
export const ForgotPasswordPage = WithSuspense(lazy(() => import('pages/forgotPassword')))
export const ChangePasswordPage = WithSuspense(lazy(() => import('pages/changePassword')))
export const ResetPasswordPage = WithSuspense(lazy(() => import('pages/resetPassword')))
export const HomePage = WithSuspense(lazy(() => import('pages/home')))
export const InvitationPage = (
  <RoleDefinedRoute>{WithSuspense(lazy(() => import('pages/invitation')))}</RoleDefinedRoute>
)
export const InvitationConfirmedPage = (
  <RoleDefinedRoute>{WithSuspense(lazy(() => import('pages/invitationConfirm')))}</RoleDefinedRoute>
)
