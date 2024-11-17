import Oidc from 'oidc-client'

class AuthService {
  private mgr: Oidc.UserManager

  private OIDC_CONFIG = {
    authority: import.meta.env.VITE_APP_OIDC_AUTORITY,
    client_id: import.meta.env.VITE_APP_OIDC_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_APP_OIDC_REDIRECT_URI,
    response_type: import.meta.env.VITE_APP_OIDC_RESPONSE_TYPE,
    scope: import.meta.env.VITE_APP_OIDC_SCOPE,
    post_logout_redirect_uri: import.meta.env.VITE_APP_OIDC_POST_LOGOUT_REDIRECT_URI,
    automaticSilentRenew: import.meta.env.VITE_APP_OIDC_AUTOMATIC_SILENT_RENEW,
    silent_redirect_uri: import.meta.env.VITE_APP_OIDC_SILENT_REDIRECT_URI,
    accessTokenExpiringNotificationTime: import.meta.env.VITE_APP_OIDC_ACCESS_TOKEN_EXPIRING_NOTIFICATION_TIME,
  }

  constructor() {
    this.mgr = new Oidc.UserManager(this.OIDC_CONFIG)

    // Automatically sign in if user is signed out
    this.mgr.events.addUserSignedOut(() => {
      sessionStorage.clear()
      this.signInRedirect()
    })
  }

  getUser = async (): Promise<Oidc.User | null> => {
    try {
      const user = await this.mgr.getUser()
      if (!user) {
        this.signInRedirect()
        return null
      }
      return user
    } catch (error) {
      console.error(error)
      return error as Oidc.User
    }
  }

  signInRedirect = (): void => {
    this.mgr.signinRedirect()
  }

  signOut = (): void => {
    this.mgr.signoutRedirect()
  }
}

const authService = new AuthService()
export default authService
