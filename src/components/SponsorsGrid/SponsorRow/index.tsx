import SponsorCard from '../SponsorCard';
import { Sponsor } from '@lib/types';
import classnames from 'classnames/bind';
import styles from '../styles.module.scss';
const cn = classnames.bind(styles);

interface Props {
  className?: string;
  tier: string;
  sponsors: Sponsor[];
}

export default function SponsorRow({ className, tier, sponsors }: Props) {
  return (
    <div className={styles.sponsorRow}>
      <div>
        <p className={styles.tierName}>{tier} sponsors</p>
        <div className={cn(className)}>
          {sponsors &&
            sponsors?.map(sponsor => <SponsorCard key={sponsor.name} sponsor={sponsor} />)}
        </div>
      </div>
    </div>
  );
}
