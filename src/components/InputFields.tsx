import React, { useState, useEffect } from "react"
import { TextField, Slider, Collapse, Button } from "@material-ui/core"
import DateFnsUtils from "@date-io/date-fns"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import ExpandMore from "@material-ui/icons/ExpandMore"
import ExpandLess from "@material-ui/icons/ExpandLess"
import InputAdornment from "@material-ui/core/InputAdornment"
import PercentageSlider from "./inputFields/PercentageSlider"

const InputFields = (props: { calculate: (x: CalculatorParameters) => void }) => {
  // standard fields
  const [stakeSize, setStake]: [string, Function] = useState("100")
  const [selectedDate, setSelectedDate]: [Date, Function] = useState(new Date("2021-03-31"))
  const [lockupPeriod, setPeriod]: [number, Function] = useState(5.0)
  const [votingPerc, setVotingPerc]: [number, Function] = useState(100)
  const [stakePerc, setStakePerc]: [number, Function] = useState(90)
  const [totalSupply, setTotalSupply]: [string, Function] = useState("476190476")

  // advanced settings collapse
  const [open, setOpen] = useState(false)
  const handleExpand = () => {
    setOpen(!open)
  }

  const handleDateChange = date => {
    setSelectedDate(date)
  }

  useEffect(() => {
    handleCalculate()
  }, [])

  const handleCalculate = () => {
    props.calculate({
      stakeSize: parseInt(stakeSize),
      startDate: selectedDate,
      lockupPeriod: lockupPeriod,
      stakedPerc: stakePerc / 100,
      votingPerc: votingPerc / 100,
      totalSupply: parseInt(totalSupply),
    })
  }

  return (
    <form className="flex flex-col space-y-4 max-w-sm m-8 p-5">
      <div className="">If you deposit this many ICP tokens in your neuron:</div>
      <TextField
        required={true}
        id="ICP_Amount"
        label="stake size"
        value={stakeSize}
        variant="outlined"
        placeholder="99"
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">ICP</InputAdornment>,
        }}
        onChange={e => setStake(e.target.value)}
        aria-labelledby="stake-size"
      ></TextField>
      <div>neuron start date (min = 31 march 2021)</div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <PercentageSlider
        title={"With a dissolve period of:"}
        percentage={lockupPeriod}
        setPerc={setPeriod}
        postfix={lockupPeriod > 1 ? "years" : "year"}
        max={8}
        step={0.1}
        defaulValue={5}
      />
      {/** 
      <div>
        <div className="flex">
          <span className="flex-1">With a dissolve period of:</span>
          <span className="flex">
            {lockupPeriod} year{lockupPeriod != 1 ? "s" : ""}
          </span>
        </div>
      </div>
      <div>
        <Slider
          id="lockup_period"
          defaultValue={5}
          min={0}
          max={8}
          step={0.1}
          value={lockupPeriod}
          onChange={(e, value) => setPeriod(value)}
          aria-labelledby="lockup-period"
        />
      </div>
      */}
      <div className="flex w-full" onClick={handleExpand}>
        Advanced settings
        <div className="ml-2">{open ? <ExpandLess /> : <ExpandMore />}</div>
      </div>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className="flex flex-col w-full space-y-4">
          <PercentageSlider
            title="percentage of votes participated in:"
            percentage={votingPerc}
            setPerc={setVotingPerc}
            postfix="%"
            max={100}
            step={1}
            defaulValue={100}
          />
          <PercentageSlider
            title="percentage of total supply staked:"
            percentage={stakePerc}
            setPerc={setStakePerc}
            postfix="%"
            defaulValue={90}
            max={100}
            step={1}
          />
          <div>for now assumed constant total supply:</div>
          <TextField
            required={true}
            id="total supply"
            label="total supply"
            value={totalSupply}
            variant="outlined"
            placeholder="total number of tokens"
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">ICP</InputAdornment>,
            }}
            onChange={e => setTotalSupply(e.target.value)}
            aria-labelledby="stake-size"
          ></TextField>
        </div>
      </Collapse>
      {/** 
        <div className="flex flex-col space-y-3 pb-11">
          <div className="flex justify-center text-xl font-light">You can earn a daily return of up to</div>
          <div className="flex justify-center text-2xl">Some tokens</div>
        </div>

        <div className="">
          Neurons on the Internet Computer are active participants in the network's governance system, with votes placed
          on proposals or delegated to others. The more you participate, the higher your rewards.
        </div>
        */}
      <Button variant="contained" color="primary" onClick={handleCalculate}>
        Calculate
      </Button>
    </form>
  )
}

export default InputFields
