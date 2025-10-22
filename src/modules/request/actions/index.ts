"use server"

import { prisma } from "@/lib/prisma";
import { REST_METHOD } from "@prisma/client";

export type Request = {
  name: string;
  method: REST_METHOD;
  url: string;
  body?: string;
  headers?: string;
  parameters?: string;
}

export const addRequestToCollection = async (collectionId:string, value: Request) => {
  const request = await prisma.request.create({
    data:{
      collectionId,
      name: value.name,
      method: value.method,
      url: value.url,
      body: value.body,
      headers: value.headers,
      parameters: value.parameters
    }
  })

  return request
}

export const saveRequest = async (id: string, value: Request) => {
  const request = await prisma.request.update({
    where:{id},
    data:{
      name: value.name,
      method: value.method,
      url: value.url,
      body: value.body,
      headers: value.headers,
      parameters: value.parameters
    }
  })

  return request
}


export const getAllRequestFromCollection = async (collectionId:string) => {
  const requests = await prisma.request.findMany({
    where:{collectionId}
  })

  return requests
}

export const deleteRequest = async (id: string) => {
  await prisma.request.delete({
    where:{id}
  })
}

export const editRequest = async (id: string, value: Request) => {
  await prisma.request.update({
    where:{id},
    data:{
      name: value.name,
      method: value.method,
      url: value.url,
      body: value.body,
      headers: value.headers,
      parameters: value.parameters
    }
  })
}