import { ResponsiveDialog } from "@/components/responsive-dialog";

import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";

interface UpdateMeetingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: MeetingGetOne
}

export const UpdateMeetingsDialog = ({ open, onOpenChange, initialValues }: UpdateMeetingsDialogProps) => {

    return (
        <ResponsiveDialog
            title="Edit Meeting"
            description="Edit the meeting details."
            open={open}
            onOpenChange={onOpenChange}
        >
<MeetingForm
onSuccess={()=> {
    onOpenChange(false);
    
}
}
onCancel={() => onOpenChange(false)}
initialValues={initialValues}
/>

        </ResponsiveDialog>
    );
}