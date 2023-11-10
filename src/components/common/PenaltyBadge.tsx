import { PenaltyStatus } from '@/mock/DRIVE_IN';

type Props = {
    props: PenaltyStatus | null;
};
export default function PenaltyBadge({ props }: Props) {
    const unBannedDate = new Date(props === null ? Date.now() : props.unBannedDate)

    if (!props) return <>Loading Penalty...</>;
    if (props.status === 'NORMAL') {
        if (props.leftQuota >= 5) {
            return <span>Thank You For Always being on Time</span>;
        } else {
            return <span>Left quota before get penalty: {props.leftQuota}</span>;
        }
    } else {
        return <span>Before <span className='font-bold'>{unBannedDate.toDateString()}</span>, you must deposit to use system</span>;
    }
}
