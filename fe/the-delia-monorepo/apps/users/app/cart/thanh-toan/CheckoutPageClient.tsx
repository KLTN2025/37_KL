'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'
import styles from './Checkout.module.css'
import Image from 'next/image'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import FloatingIcons from '@/app/components/FloatingIcons'
import { toast } from 'react-toastify'

interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
}

export default function CheckoutPageClient() {
  const router = useRouter()
  const { cartItems } = useCart()
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'Việt Nam',
    city: '',
    district: '',
    street: '',
    postalCode: '',
    note: '',
  })
  const [promoCode, setPromoCode] = useState('')
  const [savedAddress, setSavedAddress] = useState<ShippingAddress | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('cash')

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast.error('Nhập mã khuyến mãi')
      return
    }
    // Add promo code validation logic here
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fullAddress = `${formData.street}, ${formData.district}, ${formData.city}, ${formData.country}`
    setSavedAddress({
      name: formData.name,
      phone: formData.phone,
      address: fullAddress
    })
  }

  const handleUseOtherAddress = () => {
    setSavedAddress(null)
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Chưa có sản phẩm để thanh toán')
      return
    }

    // Check if address is saved or form is filled
    if (!savedAddress && (!formData.name || !formData.phone || !formData.street || !formData.district || !formData.city)) {
      toast.error('Bạn chưa nhập địa chỉ giao hàng')
      return
    }

    // Add your checkout logic here
  }

  return (
    <>
      <Header />
      <div className={styles.pageContainer}>
        <div className={styles.checkoutContainer}>
          <div className={styles.leftColumn}>
            <h1>Thủ tục thanh toán</h1>
            
            {savedAddress ? (
              <div className={styles.savedAddress}>
                <div className={styles.addressHeader}>
                  <h2>Địa chỉ vận chuyển</h2>
                  <button className={styles.editButton}>Chỉnh sửa</button>
                </div>
                <div className={styles.addressInfo}>
                  <p className={styles.recipientName}>{savedAddress.name}</p>
                  <p className={styles.addressDetail}>Địa chỉ: {savedAddress.address}</p>
                  <p className={styles.phoneNumber}>Số điện thoại: {savedAddress.phone}</p>
                  <button 
                    className={styles.useOtherAddressButton}
                    onClick={handleUseOtherAddress}
                  >
                    Sử dụng địa chỉ khác
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>
                    Họ và tên
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>
                    Địa chỉ Email
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>
                      Quốc gia
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>
                      Số điện thoại
                      <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>
                    Thành phố/tỉnh
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Quận</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>
                    Đường
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Mã bưu điện</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.buttonGroup}>
                  <button type="button" className={styles.cancelButton}>
                    HỦY
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    LƯU
                  </button>
                </div>
              </form>
            )}

            <div className={styles.shippingMethod}>
              <h2>Phương thức vận chuyển</h2>
              <div className={styles.shippingSelect}>
                <select>
                  <option value="">Chọn phương thức vận chuyển</option>
                </select>
              </div>
              <div className={styles.shippingInfo}>
                <p className={styles.freeShipping}>
                  <span className={styles.freeIcon}>🎉</span>
                  <span className={styles.freeText}>Miễn phí</span> vận chuyển nội địa thông qua ViettelPost
                </p>
                <p className={styles.shippingNote}>
                  *Các đơn đặt hàng Đặc biệt/may đo có thể mất thời gian lâu hơn.{' '}
                  <a href="/chinh-sach-van-chuyen" className={styles.policyLink}>
                    Xem thêm ở chính sách vận chuyển
                  </a>
                </p>
              </div>
            </div>

            <div className={styles.cartSection}>
              <h2>Giỏ hàng</h2>
              <div className={styles.cartItems}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.productImageWrapper}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className={styles.productImage}
                      />
                      <span className={styles.lockIcon}>🔒</span>
                    </div>
                    <div className={styles.itemDetails}>
                      <h3>{item.name}</h3>
                      <p>Vải: Light Gray</p>
                      <p>Size: {item.size}</p>
                      <div className={styles.itemQuantity}>
                        <span>x{item.quantity}</span>
                        <span className={styles.itemPrice}>{item.price.toLocaleString()}đ</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.promoSection}>
              <h2>Yaly khuyến mãi</h2>
              <div className={styles.promoCode}>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Nhập mã khuyến mãi"
                />
                <button 
                  className={styles.applyButton}
                  onClick={handleApplyPromo}
                >
                  Áp dụng
                </button>
              </div>
            </div>

            <div className={styles.orderSummary}>
              <h2>Thanh toán</h2>
              <div className={styles.summaryRow}>
                <span>Tạm tính</span>
                <span>{total.toLocaleString()}đ</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Phí vận chuyển</span>
                <span>0đ</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Tổng cộng</span>
                <span>{total.toLocaleString()}đ</span>
              </div>
            </div>

            <textarea
              className={styles.orderNote}
              placeholder="Để lại ghi chú cho đơn hàng"
            />

            <div className={styles.paymentSection}>
              <h3 className={styles.paymentTitle}>Chọn phương thức thanh toán</h3>
              
              <div className={styles.paymentMethods}>
                <label className={styles.paymentMethod}>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className={styles.radioCustom}></span>
                  <div className={styles.methodIcon}>💵</div>
                  <span className={styles.methodName}>Thanh toán bằng tiền mặt</span>
                </label>

                <label className={styles.paymentMethod}>
                  <input
                    type="radio"
                    name="payment"
                    value="vnpay"
                    checked={paymentMethod === 'vnpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className={styles.radioCustom}></span>
                  <div className={styles.methodIcon}>
                    <Image src="/images/payment/vnpay.png" alt="VNPay" width={25} height={25} />
                  </div>
                  <span className={styles.methodName}>Thanh toán bằng VNPay</span>
                </label>

                <label className={styles.paymentMethod}>
                  <input
                    type="radio"
                    name="payment"
                    value="visa"
                    checked={paymentMethod === 'visa'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className={styles.radioCustom}></span>
                  <div className={styles.methodIcon}>
                    <Image src="/images/payment/visa.png" alt="Visa" width={40} height={25} />
                  </div>
                  <span className={styles.methodName}>Thẻ Visa/Master Card</span>
                </label>

                <label className={styles.paymentMethod}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className={styles.radioCustom}></span>
                  <div className={styles.methodIcon}>🚚</div>
                  <span className={styles.methodName}>Thanh toán khi nhận hàng</span>
                </label>
              </div>

              <button 
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
      <FloatingIcons />
      <Footer />
    </>
  )
} 