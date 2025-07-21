"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import axios from 'axios';

function showAlert(){
    return alert("Showing alert");
}

export default function Login(){

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/user/all-details') // replace with your API
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error fetching posts:', error));
    }, [])
    
    return (
        <>
            <Button variant="ghost" onClick={showAlert}>Click Me</Button>
            <ul>
                {users.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>
        </>
    );
}