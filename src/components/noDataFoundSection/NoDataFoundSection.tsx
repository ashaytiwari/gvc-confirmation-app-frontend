import noContentImage from '@/assets/images/no-content-image.svg';

import styles from './NoDataFoundSection.module.scss';
import Image from 'next/image';

function NoDataFoundSection() {

  const noDataImageAttributes = {
    src: noContentImage,
    alt: 'no-data',
    style: {
      width: '100%',
      height: 'auto'
    }
  };

  return (
    <div className={styles.noDataFoundSectionMain}>
      <div className={styles.imageWrapper}>
        <Image {...noDataImageAttributes} />
      </div>
      <label>No data found...</label>
    </div>
  );

}

export default NoDataFoundSection;