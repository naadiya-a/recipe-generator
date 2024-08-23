'use server'
 
import { cookies } from 'next/headers';
import { nanoid } from 'nanoid';
import { redirect } from 'next/navigation';

let token = '';

export async function login(password: string) {
    if (password !== process.env.PASSWORD) {
        return false;
    }

    if (token === '') {
        token = nanoid();
        console.log('setting token');
    }
    cookies().set('sessionToken', token);
    redirect('/')
}