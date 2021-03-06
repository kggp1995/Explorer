import React from 'react';
import styles from './Elsewhere.module.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Text } from 'components';

const Elsewhere = props => {
  const { website, twitter, github, linkedin } = props;

  return (
    <div className={styles.elsewhere}>
      <Text typeScale="h4" color="black" weight="fontWeight-medium">
        Elsewhere
      </Text>

      <div className={styles.bulletPointContainer}>
        {website && (
          <div className={styles.bulletPoint}>
            <FontAwesomeIcon icon={['far', 'globe']} className={styles.icon} />
            <Text link src={website} typeScale="h5">
              {website}
            </Text>
          </div>
        )}

        {twitter && (
          <div className={styles.bulletPoint}>
            <FontAwesomeIcon
              icon={['fab', 'twitter']}
              className={styles.icon}
            />
            <Text link src={`https://twitter.com/@${twitter}`} typeScale="h5">
              @{twitter}
            </Text>
          </div>
        )}

        {github && (
          <div className={styles.bulletPoint}>
            <FontAwesomeIcon icon={['fab', 'github']} className={styles.icon} />
            <Text link src={`https://github.com/${github}`} typeScale="h5">
              @{github}
            </Text>
          </div>
        )}

        {linkedin && (
          <div className={styles.bulletPoint}>
            <FontAwesomeIcon
              icon={['fab', 'linkedin']}
              className={styles.icon}
            />
            <Text link src={linkedin} typeScale="h5">
              {linkedin}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Elsewhere;
