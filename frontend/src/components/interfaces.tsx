export interface user {
    id: number
    convos: convo[]
    email: string
    first_name: string
    last_name: string
    profile_pic: string | null
}

export interface convo {
    id: number
    name: string | null
    members: user[]
    messages: message[]
}

export interface message {
    convo: number
    id: number
    message: string
    sentAt: string
    user: user
}