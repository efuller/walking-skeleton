import { action, makeObservable, observable } from 'mobx';
import { User } from '@supabase/auth-js';

export class AuthRepo {
  public authenticated = false;
  public user: User | null = null;

  constructor(){
    makeObservable(this, {
      authenticated: observable,
      user: observable,
      setAuthenticated: action,
      setUser: action,
    });
  }

  public setAuthenticated(data: boolean): void {
    this.authenticated = data;
  }

  public setUser(data: User | null): void {
    this.user = data;
  }
}