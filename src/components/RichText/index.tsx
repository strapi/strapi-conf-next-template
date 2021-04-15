import React, { RefObject, LegacyRef, MutableRefObject } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);
interface Props {
  className?: string;
  text: string;
  forwardRef?: any;
}

const RichText = ({ className, text, forwardRef }: Props) => {
  const source = text.replace(/\n/g, '<br>');
  return (
    <div ref={forwardRef} className={cn(className, styles.RichText)}>
      <ReactMarkdown source={source} escapeHtml={false} />
    </div>
  );
};

export default RichText;
