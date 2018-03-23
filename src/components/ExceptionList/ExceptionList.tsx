import React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';

import Icon from '../Icon';
import Truncate from '../Truncate';
import {IconProps} from '../../components';

import * as styles from './ExceptionList.scss';

export interface Item {
  status?: 'critical' | 'warning';
  icon?: IconProps['source'];
  title?: string;
  description: string;
  truncate?: boolean;
}

export interface Props {
  items: Item[];
}

export default function ExceptionList({items: itemsList}: Props) {
  const items = itemsList.map((item, index) => {
    const {status, icon, title, description, truncate = false} = item;

    const itemClasses = classNames(
      styles.Item,
      status && styles[variationName('status', status)],
    );

    const iconMarkup = icon ? (
      <Icon source={icon} />
    ) : (
      <span className={styles.Bullet} />
    );

    const titleMarkup = title && <span className={styles.Title}>{title}</span>;

    const descriptionMarkup = description && (
      <span className={styles.Description}>{description}</span>
    );

    // React types package does not currently include React.Fragment
    const Fragment = (React as any).Fragment;

    const Element = truncate ? Truncate : Fragment;

    return (
      <li className={itemClasses} key={index}>
        <span className={styles.Icon}>{iconMarkup}</span>
        <Element>
          {titleMarkup}
          {descriptionMarkup}
        </Element>
      </li>
    );
  });

  return <ul className={styles.ExceptionList}>{items}</ul>;
}
