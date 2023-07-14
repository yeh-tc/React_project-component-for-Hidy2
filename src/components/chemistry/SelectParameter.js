import { Box, Checkbox, FormControlLabel, Typography, Grid } from '@mui/material'
export default function SelectParameter({value,setFunction}){

    const handleParameters = (event) => {
        if (event.target.checked) {
            setFunction([...value, event.target.name]);
          } else {
            setFunction(value.filter(item => item !== event.target.name));

          }
      }
    const varList = {
        'Sal': {
          name: 'Salinity',
          code: 'Salinity',
          unit: '(psu)'
        },
        'DO': {
          name: 'Dissolved Oxygen',
          code: 'D.O.',
          unit: '(\u00B5M)'
        },
        'NO3': {
          name: 'Nitrate (NO\u2083\u207B)',
          code: 'NO3',
          unit: '(\u00B5M)'
        },
        'NO2': {
          name: 'Nitrite (NO\u2082\u207B)',
          code: 'NO2',
          unit: '(\u00B5M)'
        },
        'PO4': {
          name: 'Phosphate (PO\u2084\u00B3\u207B)',
          code: 'PO4',
          unit: '(\u00B5M)'
        },
        'SiOx': {
          name: 'Silicate',
          code: 'Silicate',
          unit: '(\u00B5M)'
        },
        'NH4': {
          name: 'Ammonium (NH\u2084\u207A)',
          code: 'NH4',
          unit: '(\u00B5M)'
        },
        'Chl': {
          name: 'Chlorophyll a',
          code: 'Chlorophyll a',
          unit: '(\u00B5g/l)'
        },
        'POC': {
          name: 'Particulate Organic Carbon (POC)',
          code: 'POC',
          unit: '(\u00B5g/l)'
        },
        'PON': {
          name: 'Particulate Organic Nitrogen (PON)',
          code: 'PON',
          unit: '(\u00B5g/l)'
        },
        'DOC': {
          name: 'Dissolved Organic Carbon (DOC)',
          code: 'DOC',
          unit: '(\u00B5g/l)'
        },
        'DIC': {
          name: 'Dissolved Inorganic Carbon (DIC)',
          code: 'DIC',
          unit: '(\u00B5mol/kg)'
        },
        'pH_total': {
          name: 'pH (total)',
          code: 'pH(total)',
          unit: ''
        },
        'Alk': {
          name: 'Total Alkalinity',
          code: 'Total alkalinity',
          unit: '(\u00B5mol/kg)'
        },
      }
    return(
        <Box sx={{ px: 2, py: 1 }}>
             <Typography variant="subtitle2" gutterBottom>
             Parameters
        </Typography>
        <Grid container columns={12} sx={{ width: 340}}>
          {Object.keys(varList).map((key, id) => {
            const item = varList[key];
            return (
              <Grid item sm={6} key={id}>
                <FormControlLabel
                  key={id}
                  control={
                    <Checkbox size='small' onChange={handleParameters} name={item.code} />
                  }
                  label={<Typography variant='caption' sx={{ width: 135 }}>{item.name} {item.unit}</Typography>}
                />
              </Grid>
            )
          })}
        </Grid>
        </Box>
    );
}