import { useAuthStore } from "@/stores"

export const useAuth = () => {
    const { auth, setAuth, clearAuth } = useAuthStore((state) => state)

    return {
        auth,
        setAuth,
        clearAuth
    }
}
