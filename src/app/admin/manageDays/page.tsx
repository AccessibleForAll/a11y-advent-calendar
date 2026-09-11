import Card from '@/components/Card/Card';
import cardStyles from '@/components/Card/Card.module.scss';
import { days } from '../../../../data/days';
import Button from '@/components/Buttons/Button/Button';
import { Trash2Icon, PencilLine } from 'lucide-react';
export default function manageDaysPage() {
  return (
    <>
      <h1>Manage Days</h1>
      <ul className={cardStyles.cardGrid}>
        {days.slice(0, 4).map((d) => (
          <li key={d.day}>
            <Card className={cardStyles.manageDaysCard}>
              <p className={cardStyles.dayLabel}>Day {d.day}</p>
              <h2>{d.title}</h2>
              <p className={cardStyles.clampedText}>{d.text}</p>
              <div className={cardStyles.manageDaysButton}>
                <Button variant="primary" icon={PencilLine}>
                  edit
                </Button>
                <Button variant="primary" icon={Trash2Icon}>
                  delete
                </Button>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
