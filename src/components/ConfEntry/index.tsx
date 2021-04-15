/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useCallback, useState, useRef, useContext, MutableRefObject } from 'react';
import GlobalDataContext from '@lib/global-context';
import { register } from '@lib/user-api';
import { SITE_DESCRIPTION } from '@lib/constants';
import useEmailQueryParam from '@hooks/useEmailQueryParam';
import Decorator from '@components/decorators';
import LoadingDots from '@components/LoadingDots';
import styleUtils from '@styles/utils.module.scss';
import styles from './styles.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

type FormState = 'default' | 'loading' | 'error';

const DEFAULT_ERROR_MSG = 'Error! Please try again.';

function getErrorMsg(code: string) {
  switch (code) {
    case 'bad_email':
      return 'Please enter a valid email';
    default:
      return DEFAULT_ERROR_MSG;
  }
}

export default function ConfEntry({
  stageId,
  onRegister
}: {
  stageId: string;
  onRegister: () => void;
}) {
  const ctx = useContext(GlobalDataContext);
  const [emailInput, setEmailInput] = useState('');
  const [focused, setFocused] = useState(false);
  const [formState, setFormState] = useState<FormState>('default');
  const [errorMsg, setErrorMsg] = useState('');
  const formRowRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const onSubmit = useCallback(async () => {
    setFormState('loading');
    try {
      const res = await register(emailInput);

      if (!res.ok) {
        const json = await res.json();
        setErrorMsg(getErrorMsg(json.error.code));
        setFormState('error');
        return;
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(DEFAULT_ERROR_MSG);
      setFormState('error');
    }
  }, [emailInput, onRegister]);

  useEmailQueryParam('login', setEmailInput);

  const onTryAgainClick = useCallback(e => {
    e.preventDefault();
    setErrorMsg('');
    setFormState('default');
  }, []);

  return (
    <div className={styles.container}>
      <Decorator
        className={styles.decorator}
        position="top"
        type={`${stageId ? `type${Number(stageId)}` : 'default'}`}
      />
      <Decorator
        className={styles.decorator}
        position="bottom"
        type={`${stageId ? `type${Number(stageId)}` : 'default'}`}
      />
      <h1 className={cn(styles.hero)}>{ctx?.edito?.joinTitle ?? 'Join the conference.'}</h1>
      <h2 className={cn(styles.description)}>{ctx?.edito?.joinSubtitle ?? SITE_DESCRIPTION}</h2>
      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div ref={formRowRef} className={styles.formRow}>
          <label
            htmlFor="email-input-field"
            className={cn(styles.inputLabel, {
              [styles.focused]: focused,
              [styles.error]: formState === 'error'
            })}
          >
            {formState === 'error' ? (
              <div className={cn(styles.input, styles.inputText, styles.inputError)}>
                {errorMsg}
              </div>
            ) : (
              <>
                <input
                  className={styles.input}
                  autoComplete="off"
                  type="email"
                  id="email-input-field"
                  ref={inputRef}
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Enter email to join the event"
                  aria-label="Your email address"
                  required
                />
              </>
            )}
          </label>
          <button
            type="submit"
            className={cn(styles.submit, styles.register, styles[formState])}
            disabled={formState === 'loading'}
            onClick={formState === 'error' ? onTryAgainClick : undefined}
          >
            {formState === 'loading' ? (
              <LoadingDots size={4} />
            ) : (
              <>{formState === 'error' ? 'Try Again' : 'Join'}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
