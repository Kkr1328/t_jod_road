import { PenaltyStatus } from '@/mock/DRIVE_IN';

type Props = {
    props: PenaltyStatus | undefined;
};
export default function PenaltyBadge({ props }: Props) {
    if (!props) return <>Loading Penalty...</>;
    if (props.status === 'NORMAL') {
        if (props.leftQuota >= 5) {
            return <span>You are TCP (Reliable)</span>;
        } else {
            return <span>Left quota before get penalty: {props.leftQuota}</span>;
        }
    } else {
        return <span>Before <span className='font-bold'>{props.unBannedDate}</span>, you must deposit to use system</span>;
    }
}
