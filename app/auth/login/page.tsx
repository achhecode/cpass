"use client";

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
//   CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { EventHandler } from 'react';

function showAlert(){
    return alert("Showing alert");
}



export default function Login(){

    const [users, setUsers] = useState([]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateUsername = (value: string) => {
        // const regex = /^[a-z]+$/;
        const regex = /^[a-z][a-z0-9_]*$/;
        // if(value.length < 5){
        //     setUsernameError("Username is too short");
        // }
        if (value.length < 5 || !regex.test(value)) {
            setUsernameError("Username is invalid");
        } else {
            setUsernameError('');
        }
    };

    // const validatePassword = (value: string) => {
    //     const minLength = value.length >= 10;
    //     const hasUppercase = /[A-Z]/.test(value);
    //     const hasLowercase = /[a-z]/.test(value);
    //     const hasSymbol = /[^a-zA-Z0-9]/.test(value);

    //     if (!minLength || !hasUppercase || !hasLowercase || !hasSymbol) {
    //     setPasswordError("Password must be at least 10 characters and include uppercase, lowercase, and a symbol.");
    //     } else {
    //     setPasswordError('');
    //     }
    // };

    const validatePassword = (value: string) => {
        const errors: string[] = [];

        if (!/[A-Z]/.test(value)) {
            errors.push("Must include an uppercase letter");
        }
        if (!/[a-z]/.test(value)) {
            errors.push("Must include a lowercase letter");
        }
        if (!/[^a-zA-Z0-9]/.test(value)) {
            errors.push("Must include a symbol");
        }
        if (value.length < 10) {
            errors.push("Must be at least 10 characters");
        }

        if (errors.length > 0) {
            setPasswordError(errors.join(". ") + "\n.");
        } else {
            setPasswordError('');
        }
    };



    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        validateUsername(value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        validateUsername(username);
        validatePassword(password);

        if (!usernameError && !passwordError) {
        console.log("Logging in with:", { username, password });
        // Send to API here
        }
    };


    useEffect(() => {
        axios.get('http://localhost:8080/user/all-details') // replace with your API
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error fetching posts:', error));
    }, [])
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardAction>
            <Button variant="outline">Cpass</Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="lowercase only"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
                {usernameError && <span className="text-sm text-red-500">{usernameError}</span>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                {passwordError && <span className="text-sm text-red-500">{passwordError}</span>}
              </div>

              <Button type="submit" className="w-full mt-4">
                Login
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            New Here? Register Now!
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

}