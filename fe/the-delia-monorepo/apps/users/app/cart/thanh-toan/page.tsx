import { Metadata } from 'next'
import CheckoutPageClient from './CheckoutPageClient'

export const metadata: Metadata = {
  title: 'Thanh toán | The Delia Couture',
  description: 'Thanh toán đơn hàng của bạn tại The Delia Couture',
}

export default function CheckoutPage() {
  return <CheckoutPageClient />
} 