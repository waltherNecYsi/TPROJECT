import PropTypes from "prop-types";
import {
  Stack,
  InputAdornment,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";

import FormProvider from "../../../../components/hook-form";
// components
import Iconify from "../../../../components/iconify";

// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

EstilistasTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onResetFilter: PropTypes.func,
  // filterService: PropTypes.string,
  onFilterEndDate: PropTypes.func,
  // onFilterService: PropTypes.func,
  onFilterStartDate: PropTypes.func,
  filterEndDate: PropTypes.instanceOf(Date),
  filterStartDate: PropTypes.instanceOf(Date),
  // optionsService: PropTypes.arrayOf(PropTypes.string),
};

export default function EstilistasTableToolbar({
  isFiltered,
  filterName,
  onFilterName,
  filterEndDate,
  // filterService,
  onResetFilter,
  // optionsService,
  filterStartDate,
  // onFilterService,
  onFilterEndDate,
  onFilterStartDate,
}) {
  const defaultValues = {
    cliente: "",
  };

  const methods = useForm({ defaultValues });


  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  return (
    <FormProvider methods={methods}>
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: "column",
        md: "row",
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      {/* <TextField
        fullWidth
        select
        label="Service type"
        value={filterService}
        onChange={onFilterService}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: { maxHeight: 220 },
            },
          },
        }}
        sx={{
          maxWidth: { md: INPUT_WIDTH },
          textTransform: 'capitalize',
        }}
      >
        {optionsService.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField> */}

      <Controller
        name="fecha_inicio"
        control={control}
        size="small"
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            name="fecha_inicio"
            label="Fecha Inicio"
            inputFormat="dd/MM/yyyy"
            size="small"
            slotProps={{ textField: { size: "small" } }}
            renderInput={(params) => (
              <TextField
                size="small"
                fullWidth
                sx={{ m: 1, width: "-webkit-fill-available" }}
                {...params}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}
      />

      <Controller
        name="fecha_fin"
        control={control}
        size="small"
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            name="fecha_fin"
            label="Fecha Fin"
            inputFormat="dd/MM/yyyy"
            size="small"
            slotProps={{ textField: { size: "small" } }}
            renderInput={(params) => (
              <TextField
                size="small"
                fullWidth
                sx={{ m: 1, width: "-webkit-fill-available" }}
                {...params}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}
      />

      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder="Busca por Nombre o Direccion..."
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: "text.disabled" }} />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
    </Stack>
    </FormProvider>
  );
}
