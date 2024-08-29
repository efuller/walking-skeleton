import { computed, makeObservable } from 'mobx';
import { AuthRepo } from '@/modules/auth/auth.repo.ts';

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