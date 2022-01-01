export const handleChange = (e: any, state: any) => {
    state = { ...state, [e.currentTarget.name]: e.currentTarget.value }
    return state;
}