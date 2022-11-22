import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const Search = ({ setSearchField }) => {
  return (
    <FormControl margin="normal" required={true}>
      <TextField
        label="Email"
        variant="outlined"
        onChange={(e) => {
          setSearchField(e.target.value);
        }}
      />
    </FormControl>
  )
}

export default Search
