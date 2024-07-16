import { action, makeObservable, observable } from 'mobx';

export class AuthRepo {
  public authenticated = false;

  constructor(){
    makeObservable(this, {
      authenticated: observable,
      setAuthenticated: action,
    });
  }

  public setAuthenticated(data: boolean): void {
    this.authenticated = data;
  }
}