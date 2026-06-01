import { parseSlang, getSlangForScore, getAllSlang } from '@/utils/slang'
import { computed } from 'vue'

export function useSlang() {
  const slangDictionary = computed(() => getAllSlang())

  return {
    parseSlang,
    getSlangForScore,
    slangDictionary
  }
}
