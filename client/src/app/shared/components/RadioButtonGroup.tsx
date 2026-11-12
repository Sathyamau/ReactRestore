
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

type Props = {
  sortOptions: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedValue: string;
};

const RadioButtonGroup = ({ sortOptions, onChange, selectedValue }: Props) => {
  return (
    <div>
      <FormControl>
                <RadioGroup value={selectedValue} onChange={onChange} sx={{my:0}}>
                {sortOptions.map(({ value, label }) => (
                   <FormControlLabel
                       key={value}
                       value={value}
                       control={<Radio color="secondary" sx={{py:0.7}} />}
                       label={label}
                       checked={selectedValue === value}
                   />
                ))}
                </RadioGroup>                
            </FormControl>
    </div>
  );
};

export default RadioButtonGroup;