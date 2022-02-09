export const authConfig = {
  secret: process.env.SECRET as string || 'minhachavesecreta',
  refresh_token: process.env.REFRESH_TOKEN as string || 'minhachavesecretapararefreshtoken',
  expiresIn: process.env.EXPIRES_IN || '15m',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
  expiresRefreshTokenDays: Number(process.env.EXPIRES_REFRESH_TOKEN_DAYS) || 30
}
