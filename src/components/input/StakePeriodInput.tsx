import React from "react"
import { useDispatch } from "react-redux"
import PercentageSlider from "./PercentageSlider"
import { changeLockupPeriod } from "../../redux/store"

const stakePeriodInput = (props: { neuronId: string; lockupPeriod: number; dissolveDelay: number }) => {
  const dispatch = useDispatch()

  const setLockupPeriod = (x: number) => {
    dispatch(changeLockupPeriod({ id: props.neuronId, number: x }))
  }

  // duplicate refactor two components into one
  const postFix = (nrOfMonths: number): string => {
    const years: number = Math.floor(nrOfMonths / 12)
    const months = nrOfMonths % 12
    let postFix = ""
    if (years > 0) {
      postFix += years + " year"
      if (years > 1) {
        postFix += "s"
      }
    }
    if (months > 0) {
      if (years > 0) {
        postFix += " and "
      }
      postFix += months + " month"
      if (months > 1) {
        postFix += "s"
      }
    }
    return postFix
  }

  return (
    <PercentageSlider
      title={"质押时长:"}
      percentage={props.lockupPeriod}
      setPerc={setLockupPeriod}
      valueDisplayTransformer={postFix}
      min={6}
      max={240}
      step={1}
      defaultValue={60}
    />
  )
}

export default stakePeriodInput
