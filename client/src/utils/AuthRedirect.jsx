import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

function AuthRedirect({ to, message ,variant}) {
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        toast({
            title: message,
            variant: variant
        });
        navigate(to, { replace: true });
    }, [to, message, navigate]);

    return null;
}
export default AuthRedirect;
