export type NavBarProps = {
    active: "home" | "login" | "signup" | "dashboard"
}
export type FormProps = {
    formComponent: "login" | "signup"
}

export type AuthPoviderProps = {
    children: React.ReactNode
}

export type DfaultLayoutProps = {
    children: React.ReactNode,
    active: NavBarProps
}

export type LoginFetch = {
    email: string,
    password: string
}

export type SignupFetch = {
    email: string,
    password: string
}

export type User = {
    id: string,
    email: string,
    full_name?: string,
    date_of_birth?: string,
}


export type Tockens = {
    access: string,
    refresh: string,
}

export type AuthResponse = {
    message: string,
    user: User,
    tokens: Tockens,
}

export type AccessTokenResponse = {
    access: string,
}

export type ErrorResponse = {
    message: string,
    error: boolean
}