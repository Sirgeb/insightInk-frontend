import { cookies } from "next/headers";
import cookieSignature from 'cookie-signature';

export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = cookies();
  const signedCookie = (await cookieStore).get("session")?.value;
  const jwtToken = cookieSignature.unsign(signedCookie?.slice(2) ?? '', process.env.COOKIE_SECRET!); 
  return jwtToken as string;
} 

export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = cookies();
  const signedCookie = (await cookieStore).get("auth")?.value;
  const jwtToken = cookieSignature.unsign(signedCookie?.slice(2) ?? '', process.env.COOKIE_SECRET!); 
  return jwtToken as string;
} 

