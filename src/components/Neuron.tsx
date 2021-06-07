import { Collapse } from "@material-ui/core"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import React from "react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../redux/hooks"
import { changeExpanded, deleteNeuron } from "../redux/store"
import { GlobalParameters, NeuronType } from "../types"
import StakePeriodInput from "./input/StakePeriodInput"
import StakeSizeInput from "./input/StakeSizeInput"
import StartDateInput from "./input/StartDateInput"
import longArrow from "../../static/longArrow.svg"
import { Divider } from "material-ui"
import DissolveDelayInput from "./input/DissolveDelayInput"

const Neuron = (props: { neuron: NeuronType; globalParameters: GlobalParameters; index: number }) => {
  const currentNeuronId: string = useAppSelector(state => state.currenNeuronId)
  const exchangeRate: number = useAppSelector(state => state.exchangeRate)
  const dispatch = useDispatch()
  const dataLength: number = props.neuron.data.length
  const finalReward: number =
    dataLength > 0
      ? props.neuron.data.reduce((acc, dataPoint) => {
          return acc + dataPoint.y
        }, 0)
      : 0
  const finalRewardString: string = finalReward.toFixed(2)

  const ResultCard = (props: {
    initialStake: number
    finalReward: number
    exchangeRate: number
    stakePeriod: number
  }) => {
    const finalICP = props.initialStake + props.finalReward

    return (
      <div className="bg-ligthGrey p-4">
        <div className="flex flex-row mb-5">
          <div className="mr-5">
            <div className="font-bold text-xl">{props.initialStake.toFixed(2)}</div>
            {/* <div className="text-darkGrey font-light italic">
              ${(props.initialStake * props.exchangeRate).toFixed(2)}
            </div> */}
          </div>
          <img src={longArrow} className="w-16 mx-auto" />
          <div className="ml-5">
            <div className="font-bold text-xl text-blue">{finalICP.toFixed(2)}</div>
            {/* <div className="text-darkGrey font-light italic text-right">
              ${(finalICP * props.exchangeRate).toFixed(2)}
            </div> */}
          </div>
        </div>
        <div className="text-darkGrey">
          假设初始 ICP 数量为 {props.initialStake} , {postFix(props.stakePeriod, true)}之后,你获得的总 ICP 将是{" "}
          {finalICP.toFixed(2)} .
          {/* Given an initial ICP stake of {props.initialStake} your total ICP would be {finalICP.toFixed(2)} after{" "}
          {postFix(props.stakePeriod, true)}. */}
          {/* Given an ICP price of ${props.exchangeRate.toFixed(2)} USD, the value of your original stake would be worth $
          {(finalICP * props.exchangeRate).toFixed(2)} after {props.stakePeriod} years. */}
        </div>
      </div>
    )
  }

  //duplicate refactor
  const postFix = (nrOfMonths: number, full: boolean): string => {
    const years: number = Math.floor(nrOfMonths / 12)
    const months = nrOfMonths % 12
    const yearString = full ? "year" : "yr"
    const monthString = full ? "month" : "mo"
    const seperator = full ? " and " : ", "
    let postFix = ""
    if (years > 0) {
      postFix += years + " " + yearString
      if (years > 1) {
        postFix += "s"
      }
    }
    if (months > 0) {
      if (years > 0) {
        postFix += seperator
      }
      postFix += months + " " + monthString
      if (months > 1) {
        postFix += "s"
      }
    }
    return postFix
  }

  return (
    <div className="bg-white mt-5 w-neuron max-w-screen bottom-0 rounded-lg shadow-lg lg:m-5 ">
      <div
        className="flex flex-row items-baseline p-4 cursor-pointer"
        onClick={() => dispatch(changeExpanded({ id: props.neuron.id }))}
      >
        <div className="font-medium text-lg ">NNS神经元方案 {props.index + 1}</div>
        <div className="flex-1 text-left ml-5 text-mediumGrey">
          {props.neuron.stakeSize + " ICP / " + postFix(props.neuron.lockupPeriod, false)}
        </div>
        <div>{props.neuron.id === currentNeuronId ? <ExpandLess /> : <ExpandMore />}</div>
      </div>
      <Collapse in={props.neuron.id === currentNeuronId} unmountOnExit timeout="auto">
        <div className="w-auto h-auto m-2 p-4 flex flex-col space-y-5 max-w-lg">
          <StakeSizeInput neuronId={props.neuron.id} stakeSize={props.neuron.stakeSize} />
          <StartDateInput neuronId={props.neuron.id} startDate={props.neuron.startDate} />
          <StakePeriodInput
            neuronId={props.neuron.id}
            lockupPeriod={props.neuron.lockupPeriod}
            dissolveDelay={props.neuron.dissolveDelay}
          />
          <DissolveDelayInput
            neuronId={props.neuron.id}
            lockupPeriod={props.neuron.lockupPeriod}
            dissolveDelay={props.neuron.dissolveDelay}
          />
          <ResultCard
            initialStake={props.neuron.stakeSize}
            finalReward={finalReward}
            exchangeRate={exchangeRate}
            stakePeriod={props.neuron.lockupPeriod}
          ></ResultCard>
          <div
            className="font-medium text-delete ml-auto pt-2 cursor-pointer"
            onClick={() => dispatch(deleteNeuron({ id: props.neuron.id }))}
          >
            删除神经元
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default Neuron
