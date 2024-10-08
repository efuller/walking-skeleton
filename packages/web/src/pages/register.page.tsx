import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@efuller/web/components/ui/card.tsx';
import { Button } from '@efuller/web/components/ui/button.tsx';
import { Label } from '@efuller/web/components/ui/label.tsx';
import { Input } from '@efuller/web/components/ui/input.tsx';
import { AuthController } from '@efuller/web/modules/auth/auth.controller';
import { AuthPresenter } from '@efuller/web/modules/auth/auth.presenter.ts';
import { observer } from 'mobx-react';

interface RegisterPageProps {
  authController: AuthController;
  authPresenter: AuthPresenter;
}

export const RegisterPage = observer(({authController, authPresenter}: RegisterPageProps) => {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    console.log('Form submitted', target.email.value, target.password.value);

    await authController.register({
      email: target.email.value,
      password: target.password.value,
    });
  };

  useEffect(() => {
    if (authPresenter.viewModel.isAuthenticated) {
      navigate('/app/load-profile');
    }
  }, [authPresenter.viewModel.isAuthenticated, navigate]);

  return (
    <div className="container mx-auto grid h-screen justify-center items-center">
      <div className="flex justify-center items-center flex-col gap-12">
        <h1 className="text-3xl lg:text-6xl text-center">Walking Skeleton</h1>
        <form
          className="flex flex-col gap-4 w-full max-w-md mx-auto my-8 p-4 bg-white rounded-lg shadow-md"
          id="add-journal"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Register</CardTitle>
              <CardDescription>
                Enter your email and a secure password to create an account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button id="submitBtn" className="w-full" type="submit">Sign in</Button>
            </CardFooter>
            <div className="my-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/" className="underline">
                Login
              </Link>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
});