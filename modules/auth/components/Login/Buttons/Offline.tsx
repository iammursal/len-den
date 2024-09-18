import { Button } from "@/components/ui/button";
import { AiOutlineArrowRight } from "react-icons/ai";

export const ContinueOfflineButton = ({ ...props }) => {
    return (
        <Button variant='link' {...props} >
            Continue Offline &ensp;<AiOutlineArrowRight />
        </Button>
    );
}
