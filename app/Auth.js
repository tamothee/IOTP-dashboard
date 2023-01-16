import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Auth({children}){
    const { status } = useSession();
    let router = useRouter();
    return (
        <div>
            {status == "authenticated" ? {children}: router.push("/login")}
        </div>
    )
}