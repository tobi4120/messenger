export const handleChange = (e: React.ChangeEvent<HTMLInputElement>, state: any) => {
    state = { ...state, [e.currentTarget.name]: e.currentTarget.value }
    return state;
}