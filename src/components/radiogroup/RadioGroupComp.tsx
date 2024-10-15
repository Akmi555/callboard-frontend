import { FormControl } from "@mui/material"
import { RadioGroupProps } from "components/radiogroup/types"
import { StyledRadioGroup } from "components/radiogroup/Styles"

function RadioGroupComp({ row, name, defaultValue, onCange, children }: RadioGroupProps) {
  return (
    <>
      <FormControl>
        <StyledRadioGroup
          row={row}
          name={name}
          defaultValue={defaultValue}
          onCange={onCange}
        >{children}
            {/* //Here will be placed <FormControlLabel/> with all needed props
            example <FormControlLable value="NEED HELP" 
            control={<Radio/>} lable="Need Help" size="large"/> */}
        </StyledRadioGroup>
      </FormControl>
    </>
  )
}

export default RadioGroupComp