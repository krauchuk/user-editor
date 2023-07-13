import { IconProps } from './types'

const MinusIcon = ({ size = 15 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
    style={{
      width: `${size}px`,
      height: `${size}px`,
    }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
  </svg>
)

export default MinusIcon
