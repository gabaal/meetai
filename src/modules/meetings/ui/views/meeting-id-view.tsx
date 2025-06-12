'use client'

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { MeetingIdViewHeader } from "../components/meeting-id-view-header"
import { useRouter } from "next/navigation"
import { useConfirm } from "@/hooks/use-confirm"
import { useState } from "react"
import { UpdateMeetingsDialog } from "../components/update-meeting-dialog"
import { Divide } from "lucide-react"
import { UpcomingState } from "../components/upcoming-state"
import { ActiveState } from "../components/active-state"
import { CancelledState } from "../components/cancelled-state"
import { ProcessingState } from "../components/processing-state"

interface Props {
    meetingId: string
}

export const MeetingIdView = ({ meetingId }: Props) => {

    const trpc = useTRPC()
    const router = useRouter()
    const queryClient = useQueryClient()

    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false)
    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you sure?",
        "This will remove the meeting and all its associated data. This action cannot be undone.",
    )

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    )

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
                router.push('/meetings')
            },
        })
    )

    const handleRemoveMeeting = async () => {
        const ok = await confirmRemove()
        if (!ok) return
        await removeMeeting.mutateAsync({ id: meetingId })
    }


    const isActive = data.status === "active"
    const isUpcoming = data.status === "upcoming"
    const isCancelled = data.status === "cancelled"
    const isCompleted = data.status === "completed"
    const isProcessing = data.status === "processing"

    return (
        <>
            <RemoveConfirmation />
            <UpdateMeetingsDialog
                open={updateMeetingDialogOpen}
                onOpenChange={setUpdateMeetingDialogOpen}
                initialValues={data} />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <MeetingIdViewHeader meetingId={meetingId} meetingName={data.name} onEdit={() => setUpdateMeetingDialogOpen(true)} onRemove={handleRemoveMeeting} />
                {isCancelled && <CancelledState />}
                {isProcessing && <ProcessingState />}

                {isActive && <ActiveState
                    meetingId={meetingId}
                />}

                {isUpcoming && <UpcomingState
                    meetingId={meetingId}
                    onCancelMeeting={() => { }}
                    isCancelling={false}
                />}
                {isCompleted && <div>Completed</div>}
            </div>
        </>
    )
}

export const MeetingIDViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meetings"
            description="Please wait while we load the meetings."
        />
    )
}
export const MeetingIDViewError = () => {
    return (
        <ErrorState
            title="Error Loading Meetings"
            description="There was an error loading the meetings."
        />
    )
}