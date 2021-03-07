import Card from "@material-ui/core/Card"
import { Link } from "gatsby"
import React from "react"
import NumberFormat from "react-number-format"

const CalculationOutcome = (props: { calcParams: CalculatorParameters | null; reward: string; neuronName: string }) => {
  return (
    <>
      {props.calcParams ? (
        <Card className="p-7">
          <h1 className="font-bold text-xl">Result</h1>
          <br /> After <span className="font-bold">{props.calcParams?.lockupPeriod} years</span>, with a stake of
          <span className="font-bold">
            {" "}
            <NumberFormat value={props.calcParams?.stakeSize} thousandSeparator displayType={"text"}></NumberFormat> ICP
          </span>
          , your total return for {props.neuronName} would be
          <span className="font-bold">
            {" "}
            <NumberFormat value={props.reward} thousandSeparator displayType={"text"}></NumberFormat> ICP
          </span>{" "}
          <br></br>
          <br></br>
          <span className="text-sm text-gray-500">
            Your actual return may differ, to see why check out the{" "}
            <Link className="text-blue-500 no-underline hover:underline" to="/FAQ/">
              FAQ
            </Link>
          </span>
        </Card>
      ) : null}
    </>
  )
}

export default CalculationOutcome