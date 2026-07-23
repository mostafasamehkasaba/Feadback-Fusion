import { auth } from '@clerk/nextjs/server'
import React from 'react'
import {redirect} from 'next/navigation'
import prisma from '@/lib/prisma';
import { GradientHeader } from '@/components/gradient-header';
import AdminFeedbackTable from '@/components/admin';
export default async function Adminpage() {
  const {userId} = await auth();

  if(!userId){
    redirect('/sign-in')
  } 

const user = await prisma.user.findUnique({
  where: {
    clerkUserId: userId,
  },
});   

if(!user || user.role !== 'admin'){
  redirect('/')
}

const posts = await prisma.post.findMany({
  include:{
    author:true,
    votes:true,
  },
  orderBy:{
    cratedAt:'desc',
  }
})



  return (
    <div>
      <GradientHeader title="Admin Dashboard" subtitle="Manage all feedback and user contributions." />

      <AdminFeedbackTable posts={posts} />


    </div>
  )
}
