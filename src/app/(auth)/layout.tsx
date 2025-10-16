import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"



const AuthLayout = async ({children}: PropsWithChildren) => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(session) return redirect("/")

    return (
        <div>
            {children}
        </div>
    )
}

export default AuthLayout