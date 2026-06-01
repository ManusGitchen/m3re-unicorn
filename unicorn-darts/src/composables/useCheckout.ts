import { getCheckoutSuggestions, isBogey } from '@/utils/checkout'

export function useCheckout() {
  return {
    getCheckoutSuggestions,
    isBogey
  }
}
