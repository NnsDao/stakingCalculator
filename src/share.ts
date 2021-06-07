import { getTotalCheckedReturn } from "./calcdatapoints"
import { NeuronType } from "./types"

const getShareMessage = (neurons: Array<NeuronType>): string => {
  const checkedNeuronSize = neurons.reduce((acc, neuron) => {
    return neuron.checked ? acc + 1 : acc
  }, 0)
  if (checkedNeuronSize === 0) {
    return "查看此站点以计算您的潜在 ICP 回报！"
  } else {
    return `My neuron${checkedNeuronSize > 1 ? "s" : ""} will earn me ${getTotalCheckedReturn(neurons).toFixed(
      2
    )}, how much will yours earn you?`
  }
}

export const shareSite = (neurons: Array<NeuronType>) => {
  const shareData = {
    title: "Network nervous system  Calculator",
    text: getShareMessage(neurons),
    url: "https://nns.icpscan.co",
  }
  if (typeof window !== "undefined" && window.navigator.share !== undefined) {
    try {
      window.navigator.share(shareData)
    } catch {}
  }
}

export const shareTwitter = (neurons: Array<NeuronType>) => {
  if (typeof window !== "undefined") {
    window.open(`https://twitter.com/intent/tweet?text=${getShareMessage(neurons)}&url=https://nns.icpscan.co`)
  }
}

export const shareTelegram = (neurons: Array<NeuronType>) => {
  if (typeof window !== "undefined") {
    window.open(`https://t.me/share/url?text=${getShareMessage(neurons)}&url=https://nns.icpscan.co`)
  }
}
