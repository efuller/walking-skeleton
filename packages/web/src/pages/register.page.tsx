import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { createClient } from '@supabase/supabase-js';

export const RegisterPage = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Create a single supabase client for interacting with your database
    const supabase = createClient('http://127.0.0.1:54321', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0')
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    console.log('Form submitted', target.email.value, target.password.value);

    const { data, error } = await supabase.auth.signUp({
      email: target.email.value,
      password: target.password.value,
    });

    console.log({data, error});

    if (!error) {
      navigate('/app/journals');
    }
  };

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
              <Button className="w-full" type="submit">Sign in</Button>
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
  )
    ;
}