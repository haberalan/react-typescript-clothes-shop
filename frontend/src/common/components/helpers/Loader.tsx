import Lottie from 'react-lottie-player';

import lottieJson from '../../assets/loading.json';

export const Loader = () => {
  return <Lottie animationData={lottieJson} play className="loader" />;
};
