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

export default function DecoratorTop() {
  return (
    <svg
      width="300"
      height="420"
      viewBox="0 0 300 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="120" y="240" width="60" height="60" fill="#150241" />
      <path d="M180 240V300H120L180 240Z" fill="#1E035B" />
      <rect x="60" y="120" width="60" height="60" fill="#150241" />
      <path d="M120 120V180H60L120 120Z" fill="#1E035B" />
      <rect x="120" y="300" width="60" height="60" fill="#150241" />
      <path d="M180 300V360H120L180 300Z" fill="#1E035B" />
      <rect x="180" y="360" width="60" height="60" fill="#150241" />
      <path d="M240 360V420H180L240 360Z" fill="#1E035B" />
      <rect x="240" y="300" width="60" height="60" fill="#150241" />
      <path d="M300 300V360H240L300 300Z" fill="#1E035B" />
      <rect x="120" width="60" height="60" fill="#1B0255" />
      <path d="M180 0V60H120L180 0Z" fill="#4700C9" />
      <rect
        x="300"
        y="180"
        width="60"
        height="60"
        transform="rotate(-180 300 180)"
        fill="#1B0255"
      />
      <path d="M240 180V120H300L240 180Z" fill="#4700C9" />
      <rect x="180" width="60" height="60" fill="#886DFF" />
      <rect x="240" width="60" height="60" fill="#4700C9" />
      <rect x="240" y="60" width="60" height="60" fill="#886DFF" />
      <rect x="180" y="60" width="60" height="60" fill="#4700C9" />
      <rect x="120" y="60" width="60" height="60" fill="#150241" />
      <rect x="180" y="180" width="60" height="60" fill="#150241" />
      <rect x="240" y="180" width="60" height="60" fill="#150241" />
      <rect x="60" width="60" height="60" fill="#150241" />
      <rect x="180" y="300" width="60" height="60" fill="#482D9E" />
      <circle cx="210" cy="330" r="30" fill="#1B0255" />
      <circle cx="210" cy="330" r="13.3333" fill="#886DFF" />
      <rect width="60" height="60" transform="matrix(-1 0 0 1 240 240)" fill="#1B0255" />
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="180"
        y="240"
        width="60"
        height="60"
      >
        <rect width="60" height="60" transform="matrix(-1 0 0 1 240 240)" fill="#1B0255" />
      </mask>
      <g mask="url(#mask0)">
        <circle r="60" transform="matrix(-1 0 0 1 240 300)" fill="#886DFF" />
      </g>
      <rect width="60" height="60" transform="matrix(1 0 0 -1 0 120)" fill="#150241" />
      <mask
        id="mask1"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="60"
        width="60"
        height="60"
      >
        <rect width="60" height="60" transform="matrix(1 0 0 -1 0 120)" fill="#1B0255" />
      </mask>
      <g mask="url(#mask1)">
        <circle r="60" transform="matrix(1 0 0 -1 0 60)" fill="#1E035B" />
      </g>
      <rect width="60" height="60" transform="matrix(1 0 0 -1 0 60)" fill="#4700C9" />
      <rect width="30" height="30" transform="matrix(1 0 0 -1 0 30)" fill="#1B0255" />
      <rect width="60" height="60" transform="matrix(-1 0 0 1 300 240)" fill="#482D9E" />
      <rect width="30" height="30" transform="matrix(-1 0 0 1 300 270)" fill="#1B0255" />
    </svg>
  );
}
