import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "@/firebase/config";
import {createUserWithEmailAndPassword, signInWithPopup, updateProfile} from 'firebase/auth'

import Loader from "@/components/Loader";
import { useAuth } from "@/firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";

const RegisterForm = () => {
    const[userName,setUserName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const {authUser,isLoading,setAuthUser}=useAuth()

    const router=useRouter()

    useEffect(()=>{
        if(!isLoading && authUser){
            router.push('/');
        }
    },[authUser,isLoading]);

    const signUp=async()=>{
        if(!userName || !email || !password) return;
        try {
            const {user}=await createUserWithEmailAndPassword(auth,email,password);
            await updateProfile(auth.currentUser,{
                displayName:userName
            })
            console.log(user)
            setAuthUser({
                uid:user.uid,
                email:user.email,
                username:userName
            })
            
        } catch (error) {
            console.error(error)
        }
    }

    const signUpWithGoogle=async()=>{
        try {
            await signInWithPopup(auth,googleProvider);

        } catch (error) {
            console.error(error)
        }
    }


    return isLoading || (!isLoading && authUser) ? <Loader /> : (
        <main className="flex">
            <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
                <div className="p-8 w-[600px]">
                    <h1 className="text-6xl font-semibold">Sign Up</h1>
                    <p className="mt-6 ml-1">
                        Already have an account ?{" "}
                        <Link href={'/login'} className="underline hover:text-blue-400 cursor-pointer">
                            Login
                        </Link>
                    </p>

                    <div className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group"
                    onClick={signUpWithGoogle}>
                        <FcGoogle size={22} />
                        <span className="font-medium text-black group-hover:text-white">
                            Login with Google
                        </span>
                    </div>

                    <form onSubmit={(e)=>e.preventDefault()}>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Name</label>
                            <input
                                type="text"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                required
                                onChange={(e)=>setUserName(e.target.value)}
                            />
                        </div>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Email</label>
                            <input
                                type="email"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                required
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Password</label>
                            <input
                                type="password"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                required
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <button className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
                        onClick={signUp}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
            <div
                className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
                style={{
                    backgroundImage: "url('/login-banner.jpg')",
                }}
            ></div>
        </main>
    );
};

export default RegisterForm;
