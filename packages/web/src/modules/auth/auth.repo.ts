import { action, makeObservable, observable } from 'mobx';
import { User } from '@supabase/auth-js';

export class AuthRepo {
  public authenticated = false;
  public user: User | null = null;
  public accessToken = '';

  constructor(){
    makeObservable(this, {
      authenticated: observable,
      user: observable,
      setAuthenticated: action,
      setUser: action,
      accessToken: observable,
      setAccessToken: action,
    });
  }

  public setAuthenticated(data: boolean): void {
    this.authenticated = data;
  }

  public setUser(data: User | null): void {
    this.user = data;
  }
  
  public setAccessToken(token: string) {
    this.accessToken = token;
  }

  public getAccessToken() {
    return this.accessToken;
  }
}