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
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import FormError from '@lib/form-error';
import LoadingDots from '@components/LoadingDots';
import useEmailQueryParam from '@hooks/useEmailQueryParam';
import { register } from '@lib/user-api';
import useConfData from '@hooks/useConfData';
import LearnMore from '@components/LearnMore';
import styleUtils from '@styles/utils.module.scss';
import styles from './styles.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

type FormState = 'default' | 'loading' | 'error';

type Props = {
  className?: string;
  sharePage?: boolean;
};

export default function Form({ className, sharePage }: Props) {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorTryAgain, setErrorTryAgain] = useState(false);
  const [focused, setFocused] = useState(false);
  const [formState, setFormState] = useState<FormState>('default');
  const { setPageState, setUserData } = useConfData();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEmailQueryParam('email', setEmail);

  return formState === 'error' ? (
    <div
      className={cn(styles.form, {
        [styles.sharePage]: sharePage
      })}
    >
      <div className={styles.formRow}>
        <div className={cn(styles.inputLabel, styles.error)}>
          <div className={cn(styles.input, styles.inputText)}>{errorMsg}</div>
          <button
            type="button"
            className={cn(styles.submit, styles.register, styles.error)}
            onClick={() => {
              setFormState('default');
              setErrorTryAgain(true);
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  ) : (
    <>
      <form
        onSubmit={e => {
          if (formState === 'default') {
            setFormState('loading');
            register(email)
              .then(async res => {
                if (!res.ok) {
                  throw new FormError(res);
                }

                const data = await res.json();
                const params = {
                  id: data.id,
                  ticketNumber: data.ticketNumber,
                  name: data.name,
                  username: data.username
                };

                if (sharePage) {
                  const queryString = Object.keys(params)
                    .map(
                      key =>
                        `${encodeURIComponent(key)}=${encodeURIComponent(
                          params[key as keyof typeof params] || ''
                        )}`
                    )
                    .join('&');
                  router.replace(`/?${queryString}`, '/');
                } else {
                  setUserData(params);
                  setPageState('ticket');
                }
              })
              .catch(async err => {
                let message = 'Error! Please try again.';

                if (err instanceof FormError) {
                  const { res } = err;
                  const data = res.headers.get('Content-Type')?.includes('application/json')
                    ? await res.json()
                    : null;

                  if (data?.error?.code === 'bad_email') {
                    message = 'Please enter a valid email';
                  }
                }

                setErrorMsg(message);
                setFormState('error');
              });
          } else {
            setFormState('default');
          }
          e.preventDefault();
        }}
        className={cn(className, styles.form, {
          [styles.sharePage]: sharePage,
          [styleUtils.appear]: !errorTryAgain,
          [styleUtils['appear-fifth']]: !errorTryAgain && !sharePage,
          [styleUtils['appear-third']]: !errorTryAgain && sharePage
        })}
      >
        <div className={styles.formRow}>
          <label
            htmlFor="email-input-field"
            className={cn(styles.inputLabel, {
              [styles.focused]: focused
            })}
          >
            <input
              className={styles.input}
              ref={inputRef}
              autoComplete="off"
              type="email"
              id="email-input-field"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Enter email to register free"
              aria-label="Your email address"
              required
            />
          </label>
          <button
            type="submit"
            className={cn(styles.submit, styles.register, styles[formState])}
            disabled={formState === 'loading'}
          >
            {formState === 'loading' ? <LoadingDots size={4} /> : <>Register</>}
          </button>
        </div>
        <LearnMore />
      </form>
    </>
  );
}
