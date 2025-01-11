import { useContext } from "react";
import { AlertContext } from "@/contexts/AlertContext";

export const useMessage = () => {
    return useContext(AlertContext)
}