import React, { useEffect, useState } from "react"
import FormattedTextInput from "./FormattedTextInput"
import { changeStakeSize } from "../../redux/store"
import { useDispatch } from "react-redux"

const StakeSizeInput = (props: { neuronId: string; stakeSize: number }) => {
  const [value, setValue] = useState<string>(props.stakeSize.toString())
  const dispatch = useDispatch()
  const parsedStakeSize = parseFloat(value.replace(/,/g, ""))
  const isValid = !isNaN(parsedStakeSize) && parsedStakeSize >= 1
  let helperText = ""
  if (!isValid) {
    if (isNaN(parsedStakeSize)) {
      helperText = "输入有问题"
    } else {
      helperText = "最小质押为1个ICP"
    }
  }

  // small delay to prevent recalculate on every number change
  useEffect(() => {
    const timeOutId = setTimeout(() => handleStakeUpdate(), 500)
    return () => clearTimeout(timeOutId)
  }, [value])

  const handleStakeUpdate = () => {
    if (isValid) {
      if (props.stakeSize !== parsedStakeSize) {
        dispatch(changeStakeSize({ id: props.neuronId, number: parsedStakeSize }))
      }
    }
  }

  return (
    <FormattedTextInput
      id="ICP_Amount"
      label="质押数量"
      variant="outlined"
      value={value}
      type="number"
      placeholder="请输入要质押的ICP数量"
      onChange={e => setValue(e.target.value)}
      isValid={!isValid}
      endAdornment={"ICP"}
      helperText={helperText}
    />
  )
}

export default StakeSizeInput
