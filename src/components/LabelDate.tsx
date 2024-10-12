import { dateFormat } from '@/lib/dateFormat';
import React from 'react';

interface LabelDateProps {
  date: string;
  type?: 'day' | 'month' | 'year' | 'default' | 'fulldaywithtime' | 'fullday';
}

const LabelDate: React.FC<LabelDateProps> = ({ date, type = 'default' }) => {
  const format = () => {
    switch (type) {
      case 'day':
        return 'DD';
      case 'month':
        return 'MM';
      case 'year':
        return 'YYYY';
      case 'fulldaywithtime':
        return 'ddd, MMM YYYY, HH:mm';
      case 'fullday':
        return 'DD -MM- YYYY';
      default:
        return 'ddd, MMM YYYY';
    }
  };
  return <>{dateFormat(date, format())}</>;
};

export default LabelDate;
