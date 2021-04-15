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

import DecoratorTopDefault from './default/decorator-top';
import DecoratorBottomDefault from './default/decorator-bottom';
import DecoratorTopType1 from './type1/decorator-top';
import DecoratorBottomType1 from './type1/decorator-bottom';
import DecoratorTopType2 from './type2/decorator-top';
import DecoratorBottomType2 from './type2/decorator-bottom';
import DecoratorTopType3 from './type3/decorator-top';
import DecoratorBottomType3 from './type3/decorator-bottom';
import styles from './styles.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

interface DecoratorProps {
  className?: string;
  type?: string;
  position: 'top' | 'bottom';
}

function decoratorManager(type: string, position: string) {
  switch (type) {
    case 'type1':
      if (position === 'top') return DecoratorTopType1;
      else return DecoratorBottomType1;
    case 'type2':
      if (position === 'top') return DecoratorTopType2;
      else return DecoratorBottomType2;
    case 'type3':
      if (position === 'top') return DecoratorTopType3;
      else return DecoratorBottomType3;
    default:
      if (position === 'top') return DecoratorTopDefault;
      else return DecoratorBottomDefault;
  }
}

export default function Decorator({ className, type = 'default', position }: DecoratorProps) {
  const Component = decoratorManager(type, position);
  return (
    <div className={cn(className, position)}>
      <Component />
    </div>
  );
}
