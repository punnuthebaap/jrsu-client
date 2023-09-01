import { LoginState } from "../models/login.model"

export class AddState{
    static readonly type = '[STATE] Add'
    constructor(public payload: LoginState){}
}

export class RemoveState{
    static readonly type = '[STATE] Remove'
    constructor(public payload: string){}
} 