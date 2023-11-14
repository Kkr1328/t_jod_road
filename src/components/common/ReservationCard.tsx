import { BUTTON_LABEL } from "@/constants/LABEL";
import { Card, Stack } from "@mui/material";
import ButtonCV2X from "./ButtonCV2X";
import { useTimer } from "react-timer-hook";
import { useEffect } from "react";

interface props {
    reservation: {
        id: string,
        userId: string,
        lateAt: string
    },
    onClick: () => void
}

export default function ReservationCard(props: props) {
    const expiryTimestamp = new Date()
    const { minutes, restart } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => console.log(`time out`) });

    useEffect(() => {
        const time = new Date(props.reservation.lateAt);
        restart(time)
    })

    return (
        <Card key={props.reservation.id} className="w-full rounded-lg px-32 py-24">
            <Stack direction="row" className="gap-16">
                <Stack>
                    <p>{`Reservation Id : ${props.reservation.id}`}</p>
                    <p>{`Reserved by userId : ${props.reservation.userId}`}</p>
                    <p>{`Time left : ${minutes >= 1 ? minutes : '<1'} minutes`}</p>
                </Stack>
                <div className="grow" />
                <ButtonCV2X
                    icon={BUTTON_LABEL.APPROVE}
                    label={BUTTON_LABEL.APPROVE}
                    color="accept"
                    onClick={props.onClick}
                />
            </Stack>
        </Card>
    )
}