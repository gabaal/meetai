import { ResponsiveDialog } from "@/components/responsive-dialog";
import { desc } from "drizzle-orm";
import { AgentForm } from "./agents-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AgentGetOne
}

export const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: UpdateAgentDialogProps) => {
    return (
        <ResponsiveDialog
            title="Edit Agent"
            description="Edit the agent's information."
            open={open}
            onOpenChange={onOpenChange}
        ><AgentForm
        onSuccess={()=> onOpenChange(false)}
        onCancel={()=> onOpenChange(false)}
        initialValues={initialValues}
        /></ResponsiveDialog>
    );
}