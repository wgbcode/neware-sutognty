import Cookies from 'js-cookie'

const TokenKey = 'WMSAUTHUSERTOKEN'
const RefreshTokenKey = 'WMSAUTHUSERREFRESHTOKEN'

export const getToken = (): string => Cookies.get(TokenKey)
export const setToken = (token: string) => Cookies.set(TokenKey, token)
export const removeToken = () => Cookies.remove(TokenKey)
export const getRefreshToken = (): string => Cookies.get(RefreshTokenKey)
export const setRefreshToken = (refreshToken: string) => Cookies.set(RefreshTokenKey, refreshToken)
export const removeRefreshToken = () => Cookies.remove(RefreshTokenKey)
