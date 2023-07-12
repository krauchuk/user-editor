export type Props = {
  text: string
  type?: 'regular' | 'outline'
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
  onClick: () => void
}
