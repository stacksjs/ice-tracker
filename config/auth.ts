import type { AuthConfig } from '@stacksjs/types'

/**
 * **Auth Configuration**
 *
 * This configuration defines all of your Auth options. Because Stacks is fully-typed, you
 * may hover any of the options below and the definitions will be provided. In case you
 * have any questions, feel free to reach out via Discord or GitHub Discussions.
 */
export default {
  loginPath: '/login',
  logoutPath: '/logout',
  registerPath: '/register',
  forgotPasswordPath: '/forgot-password',
  resetPasswordPath: '/reset-password',
} satisfies AuthConfig
