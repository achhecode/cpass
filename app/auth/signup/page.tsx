"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState<string[]>([]);

  const validateUsername = (value: string) => {
    const regex = /^[a-z][a-z0-9_]{4,}$/;
    setUsernameError(
      !regex.test(value)
        ? "Username must start with a lowercase letter and be at least 5 characters long"
        : ''
    );
  };

  const validateName = (value: string) => {
    setNameError(
      value.trim().length === 0 ? "Name cannot be empty" : ''
    );
  };

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!regex.test(value) ? "Invalid email format" : '');
  };

  const validateMobile = (value: string) => {
    const regex = /^[6-9]\d{9}$/;
    setMobileError(!regex.test(value) ? "Invalid Indian mobile number" : '');
  };

  const validatePassword = (value: string) => {
    const errors: string[] = [];

    if (!/[A-Z]/.test(value)) errors.push("Must include an uppercase letter");
    if (!/[a-z]/.test(value)) errors.push("Must include a lowercase letter");
    if (!/[^a-zA-Z0-9]/.test(value)) errors.push("Must include a symbol");
    if (value.length < 10) errors.push("Must be at least 10 characters");

    setPasswordError(errors);
  };

  // Handlers
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    validateUsername(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobile(value);
    validateMobile(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate everything before submit
    validateUsername(username);
    validateName(name);
    validateEmail(email);
    validateMobile(mobile);
    validatePassword(password);

    if (
      !usernameError &&
      !nameError &&
      !emailError &&
      !mobileError &&
      passwordError.length === 0
    ) {
      console.log("✅ Submitted:", {
        username,
        name,
        email,
        mobile,
        password,
      });

      // Submit logic here (e.g., axios.post to backend)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardAction>
            <Button variant="outline">Cpass</Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Username */}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              {usernameError && <span className="text-sm text-red-500">{usernameError}</span>}
            </div>

            {/* Full Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
                required
              />
              {nameError && <span className="text-sm text-red-500">{nameError}</span>}
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <span className="text-sm text-red-500">{emailError}</span>}
            </div>

            {/* Mobile */}
            <div className="grid gap-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                type="text"
                value={mobile}
                onChange={handleMobileChange}
                required
              />
              {mobileError && <span className="text-sm text-red-500">{mobileError}</span>}
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {passwordError.length > 0 && (
                <ul className="text-sm text-red-500 list-disc pl-4">
                  {passwordError.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              )}
            </div>

            <Button type="submit" className="w-full mt-4">
              Sign Up
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Already have an account? Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
