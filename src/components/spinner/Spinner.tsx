import { ISpinnerProps } from "@/interfaces/uiInterfaces/common";

import styles from './Spinner.module.scss';

const Spinner: React.FC<ISpinnerProps> = (props) => {

  const { fullScreen } = props;

  function renderSpinner() {

    return (
      <div className={styles.spinner}>
        <div id={styles.square1}></div>
        <div id={styles.square2}></div>
        <div id={styles.square3}></div>
        <div id={styles.square4}></div>
        <div id={styles.square5}></div>
      </div>
    );
  }

  let spinnerMainClassName = styles.spinnerMain;

  if (fullScreen === true) {
    spinnerMainClassName += ` ${styles.fullScreen}`;
  }

  return (
    <div className={spinnerMainClassName}>
      {renderSpinner()}
    </div>
  );

};

export default Spinner;