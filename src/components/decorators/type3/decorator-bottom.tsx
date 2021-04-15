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

export default function DecoratorBottom() {
  return (
    <svg
      width="300"
      height="360"
      viewBox="0 0 300 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="60" height="60" transform="matrix(-1 0 0 1 180 300)" fill="#1B0255" />
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="120"
        y="300"
        width="60"
        height="60"
      >
        <rect width="60" height="60" transform="matrix(-1 0 0 1 180 300)" fill="#1B0255" />
      </mask>
      <g mask="url(#mask0)">
        <circle r="60" transform="matrix(-1 0 0 1 180 360)" fill="#886DFF" />
      </g>
      <rect y="300" width="60" height="60" fill="#1B0255" />
      <mask
        id="mask1"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="300"
        width="60"
        height="60"
      >
        <rect y="300" width="60" height="60" fill="#1B0255" />
      </mask>
      <g mask="url(#mask1)">
        <circle cy="360" r="60" fill="#4700C9" />
      </g>
      <rect x="60" y="180" width="60" height="60" transform="rotate(-180 60 180)" fill="#1B0255" />
      <path d="M0 180V120H60L0 180Z" fill="#4700C9" />
      <rect width="60" height="60" transform="matrix(1 0 0 -1 120 240)" fill="#1B0255" />
      <path d="M180 240V180H120L180 240Z" fill="#4700C9" />
      <rect x="60" y="300" width="60" height="60" fill="#482D9E" />
      <path d="M120 300V360H60L120 300Z" fill="#1B0255" />
      <rect width="60" height="60" transform="matrix(1 0 0 -1 0 120)" fill="#150241" />
      <path d="M60 120V60H0L60 120Z" fill="#1B0255" />
      <rect width="60" height="60" transform="matrix(1 0 0 -1 120 180)" fill="#150241" />
      <path d="M180 180V120H120L180 180Z" fill="#1B0255" />
      <rect x="120" y="60" width="60" height="60" fill="#150241" />
      <path d="M180 60V120H120L180 60Z" fill="#1B0255" />
      <rect x="240" y="300" width="60" height="60" fill="#150241" />
      <path d="M300 300V360H240L300 300Z" fill="#1B0255" />
      <rect x="180" width="60" height="60" fill="#150241" />
      <path d="M240 0V60H180L240 0Z" fill="#1B0255" />
      <rect x="60" y="240" width="60" height="60" transform="rotate(-180 60 240)" fill="#482D9E" />
      <rect x="60" y="210" width="30" height="30" transform="rotate(-180 60 210)" fill="#1B0255" />
      <rect x="180" y="300" width="60" height="60" fill="#1B0255" />
      <rect x="60" y="120" width="60" height="60" fill="#1B0255" />
      <rect x="120" y="240" width="60" height="60" fill="#1B0255" />
      <rect y="240" width="60" height="60" fill="#1B0255" />
      <rect x="60" y="240" width="60" height="60" fill="#482D9E" />
      <circle cx="90" cy="270" r="30" fill="#1B0255" />
      <circle cx="89.9998" cy="270" r="13.3333" fill="#886DFF" />
    </svg>
  );
}
