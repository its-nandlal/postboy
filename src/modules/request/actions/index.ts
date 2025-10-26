"use server"

import { prisma } from "@/lib/prisma";
import { REST_METHOD } from "@prisma/client";
import axios, {AxiosRequestConfig} from "axios";

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



export const sendRequest = async (req: {
  method: string;
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: unknown; // Changed from 'any' to 'unknown'
}) => {
  const config: AxiosRequestConfig = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    params: req.params,
    data: req.body,
    validateStatus: () => true, // Accept all status codes
  };

  const startTime = performance.now();
  try {
    const res = await axios(config);
    const endTime = performance.now();

    const duration = endTime - startTime;

    const size =
      res.headers['content-length'] ||
      new TextEncoder().encode(JSON.stringify(res.data)).length;

    return {
      status: res.status,
      statusText: res.statusText,
      headers: Object.fromEntries(Object.entries(res.headers)),
      data: res.data,
      duration: Math.round(duration),
      size,
    };
  } catch (error) {
    const end = performance.now();

    return {
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: Math.round(end - startTime),
    };
  }
};

export async function run(requestId: string) {
  try {
    const request = await prisma.request.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new Error(`Request with id ${requestId} not found`);
    }

    const requestConfig = {
      method: request.method,
      url: request.url,
      headers: (request.headers as Record<string, string>) || undefined,
      params: (request.parameters as Record<string, string>) || undefined,
      body: request.body || undefined,
    };

    const result = await sendRequest(requestConfig);
    
    const requestRun = await prisma.requestRun.create({
      data: {
        requestId: request.id,
        status: result.status || 0,
        statusText: result.statusText || (result.error ? 'Error' : null),
        headers: result.headers || {},
        body: result.data
          ? typeof result.data === 'string'
            ? result.data
            : JSON.stringify(result.data)
          : '',
        durationMs: result.duration || 0,
      },
    });

    if (result.data && !result.error) {
      await prisma.request.update({
        where: { id: request.id },
        data: {
          response: result.data,
          updatedAt: new Date(),
        },
      });
    }

    return {
      success: true,
      requestRun,
      result,
    };
  } catch (error) {
    try {
      const failedRun = await prisma.requestRun.create({
        data: {
          requestId,
          status: 0,
          statusText: 'Failed',
          headers: {},
          body: error instanceof Error ? error.message : 'Unknown error',
          durationMs: 0,
        },
      });

      return {
        success: false,
        requestRun: failedRun,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    } catch (dbError) {
      return {
        success: false,
        error:
          dbError instanceof Error ? dbError.message : 'Unknown database error',
      };
    }
  }
}