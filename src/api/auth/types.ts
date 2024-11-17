import { Profile } from "store/profile/types"
import { Endpoint } from "types/api"

export type LoginAPI = Endpoint<{
    payload: {
        email: Profile['email']
        password: string
    }
    response: Profile
    processed: Profile
}>

export type RegisterAPI = Endpoint<{
    payload: {
        email: Profile['email']
        password: string
    }
    response: Profile
    processed: Profile
}>

export type LogoutAPI = Endpoint<{
    payload: void
    response: void
    processed: void
}>

export type SendForgotPasswordInstructionsAPI = Endpoint<{
    payload: Pick<Profile, 'email'>
    response: void
    processed: void
}>

export type ChangePasswordAPI = Endpoint<{
    payload: {
        currentPassword: string
        newPassword: string
        confirmPassword: string
    }
    response: void
    processed: void
}>

export type InviteUserAPI = Endpoint<{
    payload: Pick<Profile, 'email'>
    response: void
    processed: void
}>

export type VerifyTokenAPI = Endpoint<{
    payload: {
        email: Profile['email']
        token: string
        type: string
    }
    response: void
    processed: void
}>

export type ResetPasswordAPI = Endpoint<{
    payload: {
        token: string
        email: Profile['email']
        newPassword: string
        confirmPassword: string
    }
    response: void
    processed: void
}>