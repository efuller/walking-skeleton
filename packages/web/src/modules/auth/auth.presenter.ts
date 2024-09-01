import { computed, makeObservable } from 'mobx';
import { AuthRepo } from './auth.repo';

export class AuthPresenter {
  get viewModel() {
    return {
      isAuthenticated: this.authRepo.authenticated,
      redirectTo: '',
      user: this.authRepo.user,
      accessToken: this.authRepo.accessToken,
    };
  }

  constructor(private authRepo: AuthRepo) {
    makeObservable(this, {
      viewModel: computed,
    });
  }
}