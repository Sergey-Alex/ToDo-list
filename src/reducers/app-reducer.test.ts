import {appReducer, InitialStateTypeApp, setAppErrorStatusAC, setAppStatusAC} from "./app-reducer";

let startState: InitialStateTypeApp;

beforeEach(() => {
    startState = {
        error: null,
        status: "idle"
    }
})

test('correct err message',()=>{
    const endState = appReducer(startState, setAppErrorStatusAC('some err'))

    expect(endState.error).toBe('some err')

} )

test('status should be set', ()=>{
    const endState = appReducer(startState, setAppStatusAC('loading'))

    expect(endState.status).toBe('loading')
})